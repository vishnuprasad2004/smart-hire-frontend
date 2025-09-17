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
        <nav className={jura.className + " flex flex-row justify-between items-center w-full lg:px-10 fixed top-0 font-bold border-b border-gray-200 z-50 bg-white/50 p-2"}>
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo-b.png" alt="Logo" width={20} height={20} />
                <p className={"text-2xl font-bold " + jura.className}>SMARTHIRE</p>
            </Link>
            <div className="flex-row gap-4 lg:flex hidden">
                <Link href="/about" className="text-gray-900 font-semibold hover:text-gray-900">About</Link>
                <Link href="/docs" className="text-gray-900 font-semibold hover:text-gray-900">Docs</Link>
                <Link href="#contact" className="text-gray-900 font-semibold hover:text-gray-900">Contact</Link>
            </div>
            <Link href="/get-started" className="primary-button py-1 w-fit">Get Started</Link>
        </nav>
    )
}
export default Navbar