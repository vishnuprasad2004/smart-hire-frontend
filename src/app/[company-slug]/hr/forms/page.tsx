"use client";

import FormCard from "@/Components/FormCard";
import { Jura } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { CirclePlus } from "lucide-react";

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function AllForms() {
  const param = useParams();
  const companySlug = param["company-slug"];

	const [forms, setForms] = React.useState<any[]>([]);

	const fetchForms = useCallback( async () => {
		// Fetch forms from API if needed
		try {
			const response = await fetch(`/api/forms?company=${companySlug}`);
			if (!response.ok) {
				console.error("API Error:", response.status, await response.text());
				return;
			}
			const data = await response.json();
			setForms(data);
		} catch (error) {
			console.error("Error fetching forms:", error);
		}
	}, [companySlug]);

	useEffect(() => {
		fetchForms();
	},[companySlug]);

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
            {forms.map((item) => (
              <FormCard
								key={item.id}
                id={item.id}
                name={item.title}
                last_edited={item.updatedAt}
                total_responses={item.totalResponses}
                team={item.team}
                company_slug={companySlug as string}
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
