"use client";

import FormCard from "@/Components/FormCard";
import { Jura } from "next/font/google";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const jura = Jura({
	variable: "--font-jura",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

function AllForms() {
	const param = useParams();
	const companySlug = param['company-slug']; 
	
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
					<div className="w-[175px] h-[175px] text-neutral-700 bg-neutral-200 rounded-2xl flex flex-col justify-center items-center gap-2">
						<FaPlusCircle className="text-2xl"/>
						<p>Add a new form</p>
					</div>
					<div className="">
						<FormCard/>
					</div>
				</div>
			
			</main>
			<footer>

			</footer>
		</>
	);
}

export default AllForms;
