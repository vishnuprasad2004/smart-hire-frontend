"use client";
import Link from "next/link"


const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <p className="text-2xl font-bold text-gradient">SMARTHIRE</p>
            </Link>
            <Link href="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar