'use client'
import { FileUploader } from '@aws-amplify/ui-react-storage'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { events } from 'aws-amplify/api'
import ThinkingIndicator from '@/components/thinkingIndicator'
import Footer from '@/components/footer'
import AuthNavbar from '@/components/authNavbar'
import {
	withAuthenticator,
	WithAuthenticatorProps,
} from '@aws-amplify/ui-react'

const CaptionPage = ({ signOut }: WithAuthenticatorProps) => {
	const [description, setDescription] = useState('')
	const [isThinking, setIsThinking] = useState(false)

	const addDescriptionToTextarea = (newDescription: string) => {
		setIsThinking(false)
		setDescription(newDescription)
	}

	useEffect(() => {
		const setupSubscription = async () => {
			const channel = await events.connect('snapscribe/caption')

			channel.subscribe({
				next: (data) => {
					addDescriptionToTextarea(data.event.caption)
				},
				error: (err) => {
					console.error(err)
				},
			})

			return channel
		}

		const sub = setupSubscription()

		return () => {
			Promise.resolve(sub).then((channel) => {
				channel.close()
			})
		}
	}, [])

	return (
		<div className="flex flex-col min-h-screen">
			<AuthNavbar handleSignout={signOut} />
			<main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Image Upload and Description
				</h1>
				<div className="space-y-6">
					<FileUploader
						path={'captionPics/'}
						maxFileCount={1}
						onUploadSuccess={() => {
							setIsThinking(true)
						}}
					/>
					<Textarea
						placeholder="Image description will appear here..."
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={10}
						className="w-full"
					/>
					<div className="flex justify-end"></div>
				</div>
			</main>

			<Footer />
			{isThinking && <ThinkingIndicator />}
		</div>
	)
}

export default withAuthenticator(CaptionPage)
