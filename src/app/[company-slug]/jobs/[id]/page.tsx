"use client";

import { useState, useEffect } from "react";
import sampleJobForm from "../../../../../constants/jobForm";
import { useParams } from "next/navigation";
import { Jura } from "next/font/google";
import Markdown from "react-markdown";
import Link from "next/link";

const jura = Jura({
    variable: "--font-jura",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});



export default function DynamicForm() {

    const param = useParams();

    const formId = param.id || "default-form-id"; // Fallback to a default ID if not present
    const companySlug = param['company-slug'] || "default-form-id"; // Fallback to a default ID if not present

    const [companyName, setCompanyName] = useState<string | null>(null);
    const [jobTitle, setJobTitle] = useState<string | null>(null);
    const [jobDescription, setJobDescription] = useState<string | null>(null);

    useEffect(() => {
        // fetch JSON form structure from API
        // For now, using static import
        const jobForm = sampleJobForm.find(job => job.company_slug === companySlug && job.public_id === formId) ?? null;
        if (jobForm) {
            setCompanyName(jobForm.company_name);
            setJobTitle(jobForm.title);
            setJobDescription(jobForm.description);
        } else {
            setCompanyName(null);
            setJobTitle("");
            setJobDescription("");
        }

    }, [formId]);

    
    
    if (!formId) return (
        <div className="place-items-center h-screen">
            <p>Loading job...</p>
        </div>
    );
    
    if (!companyName) return (
        <div className="place-items-center h-screen">
            <p>Job not found</p>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="flex flex-row justify-center items-center w-full font-bold border-b border-gray-200 z-50 bg-white/50 p-2 fixed top-0 border-1">
                {companyName && (
                <p className={jura.className + " font-bold"}>{companyName}</p>
                )}
            </nav>
            <br /><br />

            <div className="h-screen fixed left-0 top-0 w-[2%] hidden lg:block">
                <div className="bg-[#FF967C] w-full h-[70vh] flex items-end"></div>
                <div className="bg-[#5D8DE3] w-full h-[20vh] flex items-end"></div>
                <div className="bg-[#091037] w-full h-[10vh]"></div>
            </div>

            <main className="mb-10 mt-20">
                <div className="lg:w-[70ch]">
                    <p className={jura.className +  " font-bold text-4xl mb-6"}>{jobTitle}</p>
                    <Markdown skipHtml disallowedElements={["a", "button", "style", "script", "html", "link"]}>{jobDescription}</Markdown>
                    <Link href={window!.location + "/form"}>
                        <button type="submit" className=" mt-5 px-16 py-1 bg-[#091236] text-white rounded-md">Apply Now</button>
                    </Link>
                </div>
            </main>


            <footer>
                <p className={"text-center text-sm text-gray-500 mb-4 " + jura.className}>© {new Date().getFullYear()} SmartHire Inc. All rights reserved.</p>
            </footer>
        </div>
  );
}
