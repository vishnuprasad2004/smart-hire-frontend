"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Jura } from "next/font/google";
import { useDropzone } from "react-dropzone";

const jura = Jura({
    variable: "--font-jura",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

interface Field {
    id: string;
    formId: string;
    name: string;
    label: string;
    type: string;
    required: boolean;
}

export default function DynamicForm() {

    const param = useParams();

    const formId = param["id"]; // Fallback to a default ID if not present
    const companySlug = param["company-slug"]; // Fallback to a default ID if not present
    // console.log("Form ID:", formId);
    const [form, setForm] = useState<any>(null);
    const [values, setValues] = useState<{ [key: string]: any }>({});
    const [notFound, setNotFound] = useState(false);
    const [companyName, setCompanyName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const fetchForm = useCallback( async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/form?company=${companySlug as string}&id=${formId as string}`);
            if (response.status === 404) {
                setNotFound(true);
                return;
            }
            const data = await response.json();
            setForm(data.data); // Ensure fields is always an array
            setCompanyName(data.data.companyName as string);
            console.log("Fetched form:", data);
        } catch (error) {
            console.error("Error fetching form:", error);
            setNotFound(true);
            return;
        } finally {
            setLoading(false);
        }
    }, [formId, companySlug]);


    useEffect(() => {
        // fetch JSON form structure from API
        fetchForm();
    }, [fetchForm]);

    const onDrop = useCallback((acceptedFiles:any) => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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

    if(!param.id) return (
        <div className="place-items-center h-screen">
            <p>No form ID provided in the URL.</p>
        </div>
    );

    if(notFound) {
        <div className="flex justify-center items-center h-full w-full">
            <p>Job Not Found</p>
        </div>
    }

    if (!form) return (
        <div className="flex justify-center items-center h-screen">
            <p>Loading form...</p>
        </div>
    );



    return (
        <div className="flex flex-col items-center justify-center">
            <nav className="flex flex-row justify-center items-center w-full font-bold border-b border-gray-200 z-50 bg-white/50 p-2 fixed top-0 border-1">
                {companyName && (
                <p className={jura.className + " font-bold"}>{companyName || "lol"}</p>
                )}
            </nav>

            <div className="h-screen fixed left-0 top-0 w-[2%] hidden lg:block">
                <div className="bg-[#FF967C] w-full h-[70vh] flex items-end"></div>
                <div className="bg-[#5D8DE3] w-full h-[20vh] flex items-end"></div>
                <div className="bg-[#091037] w-full h-[10vh]"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6 flex flex-1 flex-col lg:w-[75ch] border border-[#b8b8b8] box-shadow rounded-lg mt-24">
                <h2 className={jura.className + " text-2xl font-bold text-black"}>{form?.title}</h2>
                {!loading && <div className="flex flex-row gap-2">
                    <p className={jura.className + " font-bold text-md mb-6 px-2 py-1 bg-neutral-200 inline-block rounded"}>
                    {form?.location}
                    </p>
                    <p className={jura.className + " font-bold text-md mb-6 px-2 py-1 bg-neutral-200 inline-block rounded"}>
                    {form?.employmentType}
                    </p>
                </div>}

                {form && form?.fields?.map((field: Field) => (
                    <div key={field.name} className="flex flex-col">
                    <label className={jura.className + " font-bold text-sm mb-1"}>{field.label}</label>
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
                        <div {...getRootProps()} className="h-18 bg-[#5D8DE3]/10 flex justify-center items-center rounded-md border border-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium ">
                            <input {...getInputProps()} required={field.required} />
                            {
                                isDragActive ?
                                <p className={jura.className + ""}>Drop the files here ...</p> :
                                <p className={jura.className + "  font-bold"}>Drag &apos;n&apos; drop some files here, or click to select files</p>
                            }
                        </div>
                        // <input
                        // type="file"
                        // required={field.required}
                        // className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                        //     file:border-0 file:bg-transparent file:text-sm file:font-medium 
                        //     file:text-primary focus-visible:outline-none focus-visible:ring-2 
                        //     focus-visible:ring-ring focus-visible:ring-offset-2"
                        // onChange={(e) => handleChange(field.name, e.target.files?.[0])}
                        // />
                    ) : field.type === "textarea" ? (
                        <textarea
                        required={field.required}
                        className="border rounded-md lg:active:outline-neutral-500 lg:active:outline-4  w-full border-input bg-background px-2 py-1 text-sm 
                                    placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                                    disabled:opacity-50"
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        ></textarea>
                    ) : null}
                    </div>
                ))}

                <button type="submit" className="px-4 py-1 bg-[#091236] text-white rounded-md">
                    Submit
                </button>
            </form>
            <footer>
                <p className={"text-center text-sm text-gray-500 mb-4 mt-10 " + jura.className}>© {new Date().getFullYear()} SmartHire Inc. All rights reserved.</p>
            </footer>
        </div>
  );
}
