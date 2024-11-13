import { Accessibility, ImageIcon, Type, Zap } from 'lucide-react'
import React from 'react'

function FeaturesSection() {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
				<div className="container px-4 md:px-6">
					<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
						<div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
							<div className="p-3 bg-black bg-opacity-70 text-white rounded-full">
								<Zap size={24} />
							</div>
							<h2 className="text-xl font-bold">Instant Descriptions</h2>
							<p className="text-center text-gray-500 dark:text-gray-400">
								Get accurate descriptions for your images in seconds.
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
							<div className="p-3 bg-black bg-opacity-70 text-white rounded-full">
								<Type size={24} />
							</div>
							<h2 className="text-xl font-bold">SEO Friendly</h2>
							<p className="text-center text-gray-500 dark:text-gray-400">
								Boost your content&apos;s searchability with keyword-rich
								descriptions.
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
							<div className="p-3 bg-black bg-opacity-70 text-white rounded-full">
								<ImageIcon size={24} />
							</div>
							<h2 className="text-xl font-bold">Bulk Processing</h2>
							<p className="text-center text-gray-500 dark:text-gray-400">
								Upload multiple images and get descriptions for all of them at
								once.
							</p>
						</div>
						<div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
							<div className="p-3 bg-black bg-opacity-70 text-white rounded-full">
								<Accessibility size={24} />
							</div>
							<h2 className="text-xl font-bold">Improved Accessibility</h2>
							<p className="text-center text-gray-500 dark:text-gray-400">
								Enhance web accessibility with accurate alt text for images.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default FeaturesSection
