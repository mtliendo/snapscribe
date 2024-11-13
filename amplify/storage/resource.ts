import { defineStorage } from '@aws-amplify/backend'
import { captionPicsUploadTrigger } from '../functions/uploadTrigger/resource'

export const storage = defineStorage({
	name: 'captionPics',
	triggers: {
		onUpload: captionPicsUploadTrigger,
	},
	access: (allow) => ({
		'captionPics/*': [
			allow.authenticated.to(['write']),
			allow.resource(captionPicsUploadTrigger).to(['read']),
		],
	}),
})
