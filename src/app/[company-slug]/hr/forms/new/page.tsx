"use client";

import { Jura } from "next/font/google";
import Image from "next/image";
import { useState } from "react";


const jura = Jura({
    variable: "--font-jura",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});




interface Field {
    name: string;
    label: string;
    type: string;
    required: boolean;
}

export default function FormBuilder() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fields, setFields] = useState<Field[]>([]);
    const [newField, setNewField] = useState<Field>({
        name: "",
        label: "",
        type: "text",
        required: false,
    });

    const addField = () => {
        if (!newField.label) return;
        const fieldId = newField.label.toLowerCase().replace(/\s+/g, '_');
        const fieldWithId = { ...newField, name: fieldId };
        const isDuplicate = fields.some(f => f.name === fieldWithId.name);
        if (isDuplicate) {
            alert("Field name must be unique");
            return;
        }

        setFields([...fields, fieldWithId]);
        setNewField({ name: "", label: "", type: "text", required: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formStructure = { title, fields };

        await fetch("/api/forms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formStructure),
        });

        console.log("Form Structure:", formStructure);
        

        alert("Form saved ✅");
        setTitle("");
        setFields([]);
    };

    if (!jura || !fields) return <div>Loading...</div>;

    return (
        <div className="">
            <nav className="flex flex-row justify-center gap-1.5 items-center w-full font-bold border-gray-200 z-50 bg-white/50 p-2 fixed top-0 border-b-[1px]">
                <Image src="/logo-b.png" alt="Logo" width={10} height={10} />
                <p className={jura.className + " font-bold"}>SMARTHIRE</p>
            </nav>
            <div className="h-screen fixed left-0 top-0 w-[10%] hidden lg:block">
                <div className="bg-[#FF967C] w-full h-[80vh] flex items-end">
                    <div className="rounded-full w-full aspect-square bg-[#5D8DE3]"></div>
                </div>
                <div className="bg-[#091037] w-full h-[20vh]"></div>
            </div>
            <div className="max-w-2xl mt-16 mx-auto p-6 bg-white rounded-xl">
                <p className={jura.className + " text-5xl font-bold mb-2"}>Create New Form</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Title */}
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Form Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="e.g. Software Engineer Application"
                            required
                        />
                        <label className="text-sm font-medium">Form Description</label>
                        <textarea
                            // type="text"
                            value={description}
                            rows={10}
                            onChange={(e) => setDescription(e.target.value)}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-1 text-sm 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="e.g. We are hiring a Software Engineer to work on backend systems (Node.js, PostgreSQL, AI pipelines)."
                            required
                        />
                    </div>

                    {/* Add Field Section */}
                    <div className="p-4 border rounded-lg space-y-4">
                        <h3 className="text-lg font-medium">Add Field</h3>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Field Label</label>
                            <input
                                type="text"
                                value={newField.label}
                                onChange={(e) =>
                                    setNewField({ ...newField, label: e.target.value })
                                }
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Full Name"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Type</label>
                            <select
                                value={newField.type}
                                onChange={(e) =>
                                    setNewField({ ...newField, type: e.target.value })
                                }
                                // className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="number">Number</option>
                                <option value="url">URL</option>
                                <option value="file">File Upload</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={newField.required}
                                onChange={(e) =>
                                    setNewField({ ...newField, required: e.target.checked })
                                }
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <label className="text-sm font-medium">Required</label>
                        </div>

                        <button
                            type="button"
                            onClick={addField}
                            className="px-10 py-1 rounded-md bg-[#091236] text-white text-sm"
                        >
                            Add Field
                        </button>
                    </div>

                    {/* Preview */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Preview</h3>
                        {fields.length === 0 && (
                            <p className="text-muted-foreground text-sm">No fields yet</p>
                        )}
                        <ul className="space-y-2">
                            {fields.map((f, i) => (
                                <li key={i} className="flex justify-between text-sm border-b pb-1">
                                    <span>
                                        {f.label} ({f.type}) {f.required && "*"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-[#091236] text-white rounded-md "
                    >
                        Save Form
                    </button>
                </form>
            </div>
            <footer>
                <p className={"text-center text-sm text-gray-500 mb-4 " + jura.className}>© {new Date().getFullYear()} SmartHire Inc. All rights reserved.</p>
            </footer>
        </div>
    );
}
