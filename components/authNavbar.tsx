'use client'
import { ImageIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

type AuthNavbarProps = {
	handleSignout: () => void
}
function AuthNavbar({ handleSignout }: AuthNavbarProps) {
	return (
		<header className="px-4 lg:px-6 h-14 flex items-center border-b">
			<Link href="/" className="flex items-center justify-center">
				<ImageIcon className="h-6 w-6" />
				<span className="ml-2 text-2xl font-bold">SnapScribe</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<Button
					className="text-sm font-medium hover:underline underline-offset-4"
					onClick={() => {
						handleSignout()
					}}
				>
					Sign Out
				</Button>
			</nav>
		</header>
	)
}

export default AuthNavbar
