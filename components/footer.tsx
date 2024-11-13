import Link from 'next/link'
import React from 'react'

function Footer() {
	return (
		<>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2023 SnapScribe. All rights reserved. Made with ❤️ by{' '}
					<Link
						href="https://focusotter.com"
						className="underline hover:text-gray-700 dark:hover:text-gray-200"
					>
						Focus Otter
					</Link>
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</a>
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</a>
				</nav>
			</footer>
		</>
	)
}

export default Footer
