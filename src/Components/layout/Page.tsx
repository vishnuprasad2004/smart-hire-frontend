import React, { ReactNode } from 'react'
import Navbar from '../NavBar'
import Footer from '../Footer'


interface PageProps {
  children: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <Navbar/>
      <div className='w-full pt-16'>
        {children}
      </div>
      <Footer/>
    </>
  )
}

export default Page