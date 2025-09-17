"use client";
import { Jura } from "next/font/google";
import Image from "next/image";
import Link from "next/link";



const jura = Jura({
    variable: "--font-jura",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
    return (
        <nav className="navbar border-b border-gray-200 z-50 bg-white/50">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo-b.png" alt="Logo" width={20} height={20} />
                <p className={"text-2xl font-bold " + jura.className}>SMARTHIRE</p>
            </Link>
            <div className="flex flex-row gap-4">
                <Link href="/about" className="text-gray-900 font-semibold hover:text-gray-900">About</Link>
                <Link href="/documentation" className="text-gray-900 font-semibold hover:text-gray-900">Docs</Link>
                <Link href="#contact" className="text-gray-900 font-semibold hover:text-gray-900">Contact</Link>
            </div>
            <Link href="/get-started" className="primary-button w-fit">Get Started</Link>
        </nav>
    )
}
export default Navbar