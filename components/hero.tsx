import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function Hero() {
	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-purple-500 via-purple-600 to-green-500">
				<div className="container  px-4">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white text-center">
								Turn Images into Words with SnapScribe
							</h1>
							<p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
								Upload an image, get an instant description. Perfect for content
								creators, marketers, and accessibility enthusiasts.
							</p>
						</div>
						<div className="space-x-4">
							<Button className="bg-white text-purple-600 hover:bg-gray-100">
								<Link href={'/caption'}>Get Started</Link>
							</Button>
							<Button
								variant="outline"
								className="text-gray-600 border-white hover:bg-white hover:text-purple-600"
							>
								Learn More
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Hero
