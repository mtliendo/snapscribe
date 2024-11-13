import { defineFunction } from '@aws-amplify/backend'

export const captionPicsUploadTrigger = defineFunction({
	name: 'captionPicsUploadTrigger',
	entry: './main.ts',
	memoryMB: 1024,
	timeoutSeconds: 30,
	environment: {
		MODEL_ID: 'anthropic.claude-3-sonnet-20240229-v1:0',
	},
})
