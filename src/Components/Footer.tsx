import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className='bottom-0 w-full bg-[#0f2333] text-white'>
        <Image src={"/images/curved-line-1.svg"} className='select-none w-[140%] overflow-hidden' alt='svg' width={200} height={100}/>
        <div className="footer-content flex flex-row justify-between items-center p-12">
          <div className="footer-logo">
            <Link href="/">
              <p className="text-2xl font-bold">SMARTHIRE</p>
            </Link>
          </div>
          <div className='flex flex-row gap-4 text-gray-300'>
            <Link href="https://www.linkedin.com" className='flex items-center gap-1'><FaLinkedin/> LinkedIn</Link>
            <Link href="mail:vishnuprasadkorada@gmail.com" className='flex items-center gap-1'><MdEmail/> Mail Us</Link>
            
          </div>
          <p>© {new Date().getFullYear()} SmartHire, Inc.</p>
        </div>
      </footer>
  )
}

export default Footer