"use client";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" bg-cover">
      <Navbar/>
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Supercharge Hiring using SmartHire</h1>
          <h2>See how you can achieve faster, smarter hiring; whether it's corporate, high-volume, or anything in between.</h2>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
