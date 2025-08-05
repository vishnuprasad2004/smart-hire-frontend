"use client";
import Link from "next/link"


const Navbar = () => {
    return (
        <nav className="navbar border-b border-gray-200 z-50">
            <Link href="/"><p className="text-2xl font-bold">SMARTHIRE</p></Link>
            <div className="flex flex-row gap-4">
                <Link href="/about" className="text-gray-600 font-semibold hover:text-gray-900">About</Link>
                <Link href="/documentation" className="text-gray-600 font-semibold hover:text-gray-900">Documentation</Link>
                <Link href="#contact" className="text-gray-600 font-semibold hover:text-gray-900">Contact</Link>
            </div>
            <Link href="/get-started" className="primary-button w-fit">Get Started</Link>
        </nav>
    )
}
export default Navbar