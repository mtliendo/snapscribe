import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import {
	BedrockRuntimeClient,
	ContentBlock,
	ConversationRole,
	ConverseCommand,
	ImageBlock,
	ImageFormat,
} from '@aws-sdk/client-bedrock-runtime'
import { events } from 'aws-amplify/data'
import { Amplify } from 'aws-amplify'
import { env } from '$amplify/env/captionPicsUploadTrigger'
import type { Handler } from 'aws-lambda'
const client = new BedrockRuntimeClient()

Amplify.configure({
	API: {
		Events: {
			endpoint: env.EVENT_API_URL,
			region: env.EVENT_API_REGION,
			defaultAuthMode: 'apiKey',
			apiKey: env.EVENT_API_KEY,
		},
	},
})

export const handler: Handler = async (event) => {
	// get the imgKey key from the event
	const imgKey = event.Records[0].s3.object.key

	const s3 = new S3Client()
	const s3Command = new GetObjectCommand({
		Bucket: env.CAPTION_PICS_BUCKET_NAME,
		Key: imgKey,
	})

	const s3Response = await s3.send(s3Command)
	const image = await s3Response.Body?.transformToByteArray()

	const input = {
		modelId: env.MODEL_ID,
		messages: [
			{
				role: 'user' as ConversationRole,
				content: [
					{
						text: 'You are a helpful assistant that captions images. Describe the image in detail.',
					} as ContentBlock.TextMember,
					{
						image: {
							format: imgKey.split('.').pop() as ImageFormat,
							source: {
								bytes: image,
							},
						} as ImageBlock,
					},
				],
			},
		],
	}

	try {
		const command = new ConverseCommand(input)
		const response = await client.send(command)
		await events.post('default/caption', {
			caption: 'creating',
		})
		if (response.output?.message?.content) {
			const caption = response.output.message.content[0].text
			await events.post('default/caption', {
				caption: caption || 'sorry, problem creating caption.',
			})
		}
	} catch (error) {
		console.error('Error:', error)
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ message: 'Function executed successfully!' }),
	}
}
