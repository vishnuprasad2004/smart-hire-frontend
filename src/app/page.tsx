"use client";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import { Jura } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const jura = Jura({
	variable: "--font-jura",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function Home() {
	return (
		<main className="m-0 p-0 overflow-hidden">
			<Navbar />
			<section className="flex w-full h-full lg:flex-row flex-col items-center lg:justify-between justify-center">
				<Image
					src={"/hero page.svg"}
					alt="Hero Image"
					width={1920}
					height={1080}
					className="h-[101vh] w-auto object-cover -translate-y-[10px] hidden lg:block"
				/>
				<div className="w-full h-screen text-center lg:px-36 flex flex-col justify-center items-center gap-6 px-8">
					<p className={jura.className + " font-black text-xl lg:text-6xl"}>Smarter Hiring, Fairer Decisions.</p>
					<p className={jura.className + " font-bold "}>SmartHIRE uses AI to match resumes with job descriptions - ensuring faster, unbiased, and explainable candidate screening.</p>
					<div className="flex flex-row justify-center items-center gap-4 mt-4">
						<Link href="/get-started" className="rounded-full bg-[#091236] text-white px-6 p-2 w-fit">Get Started</Link>
						<Link href="#learn-more" className="secondary-button w-fit">Learn More</Link>
					</div>
				</div>
			</section>
			{/* <Footer/> */}
		</main>
	);
}
