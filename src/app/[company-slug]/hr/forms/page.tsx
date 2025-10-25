"use client";

import FormCard from "@/Components/FormCard";
import { Jura } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import sampleJobForms from "../../../../../constants/jobForm";
import { CirclePlus } from "lucide-react";

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function AllForms() {
  const param = useParams();
  const companySlug = param["company-slug"];

  return (
    <>
      <nav className="flex flex-row justify-center items-center w-full font-bold border-b border-gray-200 z-50 bg-white/50 p-2 fixed top-0 border-1">
        <p className={jura.className + " font-bold"}>{companySlug}</p>
      </nav>
      <main className="mt-15 ml-12">
        <div className="h-screen fixed left-0 top-0 w-[2%] hidden lg:block">
          <div className="bg-[#FF967C] w-full h-[70vh] flex items-end"></div>
          <div className="bg-[#5D8DE3] w-full h-[20vh] flex items-end"></div>
          <div className="bg-[#091037] w-full h-[10vh]"></div>
        </div>

        <div className="">
          <Link href={`/${companySlug}/hr/forms/new`}>
            <div className="w-[95%] h-40 m-auto text-neutral-700 bg-neutral-100 rounded-2xl flex flex-col justify-center items-center gap-2 cursor-pointer">
              <CirclePlus size={28} />
              <p>Add a new form</p>
            </div>
          </Link>
          <div className="border-b m-3 border-neutral-300"></div>
          <div className="grid grid-cols-2 gap-5 mt-4 pr-4 w-3/4 m-auto">
            {sampleJobForms.map((item) => (
              <FormCard
								key={item.public_id}
                id={item.public_id}
                name={item.title}
                last_edited={item.updated_at}
                total_responses={item.total_responses}
                team={item.team}
                company_slug={item.company_slug}
              />
            ))}
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default AllForms;
