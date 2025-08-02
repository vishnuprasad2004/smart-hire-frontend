import Navbar from "@/Components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar/>
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Ratings</h1>
        </div>
      </section>
    </main>
  );
}
