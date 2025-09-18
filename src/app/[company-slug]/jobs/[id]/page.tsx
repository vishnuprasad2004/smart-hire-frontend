"use client";

import { useState, useEffect } from "react";
import jobForm from "../../../../../constants/jobForm";
import { useParams } from "next/navigation";
import { Jura } from "next/font/google";

const jura = Jura({
    variable: "--font-jura",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function DynamicForm() {

    const param = useParams();
    console.log("Params:", param);
    const formId = param.id;
    console.log("Form ID:", formId);
    const [form, setForm] = useState<any>(null);
    const [values, setValues] = useState<{ [key: string]: any }>({});

    useEffect(() => {
        // fetch JSON form structure from API

        setForm(jobForm);
    }, [formId]);

    const handleChange = (name: string, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/api/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, data: values })
        });
        alert("Response submitted ✅");
    };

        if (!form) return (
            <div className="place-items-center h-screen">
                <p>Loading form...</p>
            </div>
        );

    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="flex flex-row justify-center items-center w-full font-bold border-b border-gray-200 z-50 bg-white/50 p-2 fixed top-0 border-1">
                {form.company_name && (
                <p className={jura.className + " font-bold"}>{form.company_name}</p>
                )}
            </nav>
            <br /><br />
            <form onSubmit={handleSubmit} className="space-y-4 p-4 flex flex-col">
                <h2 className="text-2xl font-bold text-black">{form.title}</h2>
                <p className="text-gray-600 font-semibold mb-4 lg:w-[60ch]">{form.description}</p>

                {form.fields.map((field: any) => (
                    <div key={field.name} className="flex flex-col">
                    <label className="font-medium mb-1">{field.label}</label>
                    {field.type === "text" || field.type === "email" || field.type === "number" || field.type === "url" ? (
                        <input
                        type={field.type}
                        required={field.required}
                        className="border rounded-md lg:active:outline-neutral-500 lg:active:outline-4  w-full border-input bg-background px-2 py-1 text-sm 
                                    placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                                    disabled:opacity-50"
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    ) : field.type === "file" ? (
                        <input
                        type="file"
                        required={field.required}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                            file:border-0 file:bg-transparent file:text-sm file:font-medium 
                            file:text-primary focus-visible:outline-none focus-visible:ring-2 
                            focus-visible:ring-ring focus-visible:ring-offset-2"
                        onChange={(e) => handleChange(field.name, e.target.files?.[0])}
                        />
                    ) : null}
                    </div>
                ))}

                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    Submit
                </button>
            </form>
            <footer>
                <p className={"text-center text-sm text-gray-500 mb-4 " + jura.className}>© {new Date().getFullYear()} SmartHire Inc. All rights reserved.</p>
            </footer>
        </div>
  );
}
