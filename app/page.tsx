import FeaturesSection from '@/components/featuresSection'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import PublicNavbar from '@/components/publicNavbar'

const LandingPage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<PublicNavbar />
			<main className="flex-1">
				<Hero />
				<FeaturesSection />
			</main>
			<Footer />
		</div>
	)
}

export default LandingPage
