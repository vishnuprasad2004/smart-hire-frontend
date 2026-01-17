"use client";

import axios from "axios";
import { Info } from "lucide-react";
import { Jura } from "next/font/google";
import Image from "next/image";
import { redirect, RedirectType, useParams } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";

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

  const param = useParams();

  // console.log(param["company-slug"]);

  const [title, setTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [team, setTeam] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [newField, setNewField] = useState<Field>({
    name: "",
    label: "",
    type: "text",
    required: false,
  });
  const [loading, setLoading] = useState(false);
  


  const addField = () => {
    if (!newField.label) return;
    const fieldId = newField.label.toLowerCase().replace(/\s+/g, "_");
    const fieldWithId = { ...newField, name: fieldId };
    const isDuplicate = fields.some((f) => f.name === fieldWithId.name);
    if (isDuplicate) {
      alert("Field name must be unique");
      return;
    }

    setFields([...fields, fieldWithId]);
    setNewField({ name: "", label: "", type: "text", required: false });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/create", { companySlug: param["company-slug"], title, description, fields: JSON.stringify(fields), location, employmentType, team },
      { headers: {"Content-Type": "application/json"} }
      );
      alert("Form saved ✅");
      setTitle("");
      setFields([]);
      setDescription("");
      setLocation("");
      setEmploymentType("");
      setTeam("");
      redirect(`/${param["company-slug"]}/hr/forms`);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    } finally {
      setLoading(false);
    }

    
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
      <div className="max-w-2xl mt-16 mx-auto p-6 bg-white rounded-xl border border-neutral-500/40 box-shadow">
        <p className={jura.className + " text-5xl font-bold mb-2"}>
          Create New Form
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Title */}
          <div className="grid gap-2">
            <label className={jura.className + " text-sm font-bold"}>Form Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="e.g. Software Engineer Application"
              required
            />
            {/* Employment Type */}
            <label className={jura.className + " text-sm font-bold"}>Employment Type</label>
            <select
                value={employmentType}
                onChange={(e) =>
                  setEmploymentType(e.target.value)
                }
                // className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                className={jura.className + " border border-input rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            {/* Team */}
            <label className={jura.className + " text-sm font-bold"}>Team</label>
            <input
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="e.g. IT and Infrastructure Team"
              required
            />
            {/* Location */}
            <label className={jura.className + " text-sm font-bold"}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm 
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="e.g. Hyderabad, Telangana, India"
              required
            />
            {/* Description */}
            <label className={jura.className + " text-sm font-bold"}>{"Form Description (Markdown)"}</label>
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
                className={jura.className + " border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="url">URL</option>
                <option value="file">File Upload</option>
                <option value="textarea">Paragraph</option>
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
            <h3 className={jura.className + " text-3xl font-medium mb-2"}>{title || "Preview"}</h3>
            <Markdown disallowedElements={[""]}>
              {description || "Form description will appear here..."}
            </Markdown>
            {fields.length === 0 && (
              <p className="text-muted-foreground text-sm">No fields yet</p>
            )}
            <ul className="space-y-2">
              {fields.map((f, i) => (
                <li
                  key={i}
                  className="flex justify-between text-sm border-b pb-1"
                >
                  <span>
                    {f.label} ({f.type}) {f.required && "*"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className={jura.className + " w-full px-4 py-2 bg-[#091236] text-white rounded-md "}
          >
            Create Form
          </button>
          <div className="flex flex-row items-center gap-2"> <Info size={20}/><p className="text-sm font-medium text-neutral-700">As of now Smarthire doesn&apos;t support upadation of Application forms, hence these fields can&apos;t be edited later</p></div>
        </form>
      </div>
      <footer>
        <p
          className={"text-center text-sm text-gray-500 mt-4 mb-4 " + jura.className}
        >
          © {new Date().getFullYear()} SmartHire Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
