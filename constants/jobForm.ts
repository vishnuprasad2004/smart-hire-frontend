
const jobForm = {
    company_name: "SmartHire Inc.",
    company_slug: "smarthire",
    public_id:"1",
    title: "Software Engineer Application",
    description: "We are hiring a Software Engineer to work on backend systems (Node.js, PostgreSQL, AI pipelines).",
    fields: [
        { name: "first_name", label: "First Name", type: "text", required: true },
        { name: "last_name", label: "Last Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "resume", label: "Upload Resume", type: "file", required: true },
        { name: "experience", label: "Years of Experience", type: "number", required: false },
        { name: "portfolio", label: "Portfolio URL", type: "url", required: false }
    ]
};

export default jobForm;
