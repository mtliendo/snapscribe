import { captionPicsUploadTrigger } from './functions/uploadTrigger/resource'
import { storage } from './storage/resource'
import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import {
	CfnApi,
	CfnChannelNamespace,
	AuthorizationType,
} from 'aws-cdk-lib/aws-appsync'
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam'

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
	auth,
	storage,
	captionPicsUploadTrigger,
})

const customResources = backend.createStack('custom-resources-snapscribe')

const cfnEventAPI = new CfnApi(customResources, 'cfnEventAPI', {
	name: 'snapscribe-api',
	eventConfig: {
		authProviders: [
			{ authType: AuthorizationType.IAM },
			{
				authType: AuthorizationType.USER_POOL,
				cognitoConfig: {
					awsRegion: customResources.region,
					userPoolId: backend.auth.resources.userPool.userPoolId,
				},
			},
		],
		connectionAuthModes: [{ authType: AuthorizationType.USER_POOL }],
		defaultPublishAuthModes: [{ authType: AuthorizationType.IAM }],
		defaultSubscribeAuthModes: [{ authType: AuthorizationType.USER_POOL }],
	},
})

const namespace = new CfnChannelNamespace(
	customResources,
	'cfnEventAPINamespace',
	{
		apiId: cfnEventAPI.attrApiId,
		name: 'snapscribe',
	}
)

//--------Policies----------

//grant signed in users access to invoke the Event API
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
	new Policy(customResources, 'AppSyncEventPolicy', {
		statements: [
			new PolicyStatement({
				actions: ['appsync:EventConnect', 'appsync:EventSubscribe'],
				resources: [`${cfnEventAPI.attrApiArn}/*`, `${cfnEventAPI.attrApiArn}`],
			}),
		],
	})
)

//grand the function access to publish an event

//grant the function access to invoke:model
backend.captionPicsUploadTrigger.resources.lambda.addToRolePolicy(
	new PolicyStatement({
		actions: ['appsync:EventPublish'],
		resources: [`${cfnEventAPI.attrApiArn}/*`, `${cfnEventAPI.attrApiArn}`],
	})
)

backend.captionPicsUploadTrigger.resources.lambda.addToRolePolicy(
	new PolicyStatement({
		actions: ['bedrock:InvokeModel'],
		resources: ['*'],
	})
)

// ---------Lambda Env Vars---------
backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_URL',
	`https://${cfnEventAPI.getAtt('Dns.Http').toString()}/event`
)

backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_REGION',
	customResources.region
)
backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_NAMESPACE',
	namespace.name
)

backend.addOutput({
	custom: {
		events: {
			url: `https://${cfnEventAPI.getAtt('Dns.Http').toString()}/event`,
			aws_region: customResources.region,
			default_authorization_type: AuthorizationType.USER_POOL,
		},
	},
})
