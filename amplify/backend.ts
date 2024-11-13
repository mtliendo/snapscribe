import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { storage } from './storage/resource'
import { captionPicsUploadTrigger } from './functions/uploadTrigger/resource'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import {
	CfnApi,
	CfnApiKey,
	CfnChannelNamespace,
	AuthorizationType,
} from 'aws-cdk-lib/aws-appsync'

const backend = defineBackend({
	auth,
	storage,
	captionPicsUploadTrigger,
})

//grant the function access to invoke:model
backend.captionPicsUploadTrigger.resources.lambda.addToRolePolicy(
	new PolicyStatement({
		actions: ['bedrock:InvokeModel'],
		resources: ['*'],
	})
)

const customResources = backend.createStack('custom-resources-snapscribe-test')

const cfnEventAPI = new CfnApi(customResources, 'cfnEventAPI', {
	name: 'cfnEventAPITest',
	eventConfig: {
		authProviders: [{ authType: AuthorizationType.API_KEY }],
		connectionAuthModes: [{ authType: AuthorizationType.API_KEY }],
		defaultPublishAuthModes: [{ authType: AuthorizationType.API_KEY }],
		defaultSubscribeAuthModes: [{ authType: AuthorizationType.API_KEY }],
	},
})

new CfnChannelNamespace(customResources, 'cfnEventAPINamespace', {
	apiId: cfnEventAPI.attrApiId,
	name: 'default',
})

const cfnApiKey = new CfnApiKey(customResources, 'cfnEventAPIKey', {
	apiId: cfnEventAPI.attrApiId,
	description: 'cfnEventAPIKeyTest',
})

backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_URL',
	`https://${cfnEventAPI.getAtt('Dns.Http').toString()}/event`
)

backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_KEY',
	cfnApiKey.attrApiKey
)
backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_REGION',
	customResources.region
)
backend.captionPicsUploadTrigger.addEnvironment(
	'EVENT_API_NAMESPACE',
	'default'
)

backend.addOutput({
	custom: {
		events: {
			url: `https://${cfnEventAPI.getAtt('Dns.Http').toString()}/event`,
			api_key: cfnApiKey.attrApiKey,
			aws_region: customResources.region,
			default_authorization_type: AuthorizationType.API_KEY,
		},
	},
})
