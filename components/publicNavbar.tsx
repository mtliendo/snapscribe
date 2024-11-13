import { Image as ImageIcon } from 'lucide-react'
import React from 'react'

function PublicNavbar() {
	return (
		<>
			<header className="px-4 lg:px-6 h-14 flex items-center">
				<a className="flex items-center justify-center" href="#">
					<ImageIcon className="h-6 w-6" />
					<span className="ml-2 text-2xl font-bold">SnapScribe</span>
				</a>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					<a
						className="text-sm font-medium hover:underline underline-offset-4"
						href="#"
					>
						Features
					</a>

					<a
						className="text-sm font-medium hover:underline underline-offset-4"
						href="#"
					>
						About
					</a>
				</nav>
			</header>
		</>
	)
}

export default PublicNavbar
