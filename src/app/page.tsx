"use client";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import { Jura } from "next/font/google";
import Image from "next/image";

const jura = Jura({
	variable: "--font-jura",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function Home() {
	return (
		<main className="m-0 p-0 overflow-x-hidden">
			<Navbar />
			<section className="flex w-full h-full lg:flex-row flex-col items-center lg:justify-between justify-center">
				<Image
					src={"/hero page.svg"}
					alt="Hero Image"
					width={1920}
					height={1080}
					className="h-[101vh] w-auto object-cover -translate-y-[10px] hidden lg:block"
				/>
				<div className="w-full h-screen text-center lg:px-40 flex flex-col justify-center items-center gap-6 px-8">
					<p className="text-xl">Smarter Hiring, Fairer Decisions.</p>
					<p>SmartHIRE uses AI to match resumes with job descriptions - ensuring faster, unbiased, and explainable candidate screening.</p>
					<div className="flex flex-row justify-center items-center gap-4 mt-4">
						<a href="/get-started" className="primary-button w-fit">Get Started</a>
						<a href="#learn-more" className="secondary-button w-fit">Learn More</a>
					</div>
				</div>
			</section>
			{/* <Footer/> */}
		</main>
	);
}
