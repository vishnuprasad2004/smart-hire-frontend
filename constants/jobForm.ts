const sampleJobForms = [{
    company_name: "KPMG India Services LLP",
    company_slug: "kpmg",
    public_id: "1",
    title: "Software Engineer Application",
    description: `

**Location:** Hyderabad, India
**Employment Type:** Full-time

---

### **About the Role**

We are looking for a passionate and motivated Associate Software Development Engineer (ASDE) to join our engineering team. In this role, you will work alongside senior engineers to design, develop, and maintain high-quality software solutions. You will gain hands-on experience with the full software development lifecycle, contribute to solving real-world problems, and help deliver scalable, reliable, and efficient applications.

---

### **Key Responsibilities**

* Collaborate with senior engineers and product managers to design, develop, test, and deploy software solutions.
* Write clean, efficient, and maintainable code following best practices.
* Participate in code reviews and contribute to improving coding standards.
* Debug and troubleshoot issues across different environments.
* Assist in the design and development of scalable system architectures.
* Stay updated with emerging technologies and contribute to innovation within the team.
* Write unit tests and ensure software quality through automated testing.

---

### **Qualifications**

* Bachelor’s degree in Computer Science, Engineering, or a related field (or equivalent practical experience).
* Strong knowledge of at least one programming language (Java, Python, C++, JavaScript, or similar).
* Solid understanding of data structures, algorithms, and object-oriented programming concepts.
* Familiarity with databases (SQL/NoSQL) and web technologies (HTML, CSS, REST APIs).
* Good problem-solving skills and an eagerness to learn.
* Strong communication and teamwork abilities.

---

### **Preferred Skills (Good to Have)**

* Experience with cloud platforms (AWS, Azure, GCP).
* Knowledge of version control systems (Git).
* Familiarity with Agile development methodologies.
* Internship or project experience in software development.

---

### **What We Offer**

* Mentorship and guidance from experienced engineers.
* Opportunity to work on impactful, real-world projects.
* A collaborative and inclusive work culture.
* Professional growth and learning opportunities.

---
`,
    fields: [
        { name: "first_name", label: "First Name", type: "text", required: true },
        { name: "last_name", label: "Last Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "resume", label: "Upload Resume", type: "file", required: true },
        {
            name: "experience",
            label: "Years of Experience",
            type: "number",
            required: false,
        },
        { name: "portfolio", label: "Portfolio URL", type: "url", required: false },
    ],
},
{
    company_name: "ServiceNow India Pvt Ltd",
    company_slug: "servicenow",
    public_id: "2",
    title: "Software Engineer Intern",
    description: `

**Location:** Bangalore, India  
**Employment Type:** Internship (Full-time, 6 months)  

---

### **About the Role**

We are seeking a motivated and curious Software Engineer Intern to join our engineering team. As an intern at ServiceNow, you will work closely with experienced engineers to build and enhance enterprise-grade applications. This internship offers the opportunity to learn industry best practices, work on real-world projects, and contribute to the development of cutting-edge solutions that impact millions of users worldwide.  

---

### **Key Responsibilities**

* Collaborate with mentors and team members on software design, development, and testing.  
* Write clean, efficient, and well-documented code.  
* Debug and fix software defects in development and testing environments.  
* Participate in team meetings and contribute to discussions with fresh ideas.  
* Learn and apply Agile methodologies in day-to-day work.  
* Gain exposure to ServiceNow’s cloud platform and tools.  

---

### **Qualifications**

* Currently pursuing a Bachelor’s/Master’s degree in Computer Science, Information Technology, or related field.  
* Strong foundation in at least one programming language (Java, Python, JavaScript, C++).  
* Understanding of data structures, algorithms, and object-oriented programming.  
* Basic knowledge of databases and web technologies (REST APIs, HTML, CSS, SQL).  
* Strong problem-solving mindset and eagerness to learn new technologies.  

---

### **Preferred Skills (Good to Have)**

* Exposure to cloud technologies or SaaS applications.  
* Experience with version control (Git/GitHub).  
* Familiarity with test automation or scripting.  
* Previous internship, project work, or hackathon participation.  

---

### **What We Offer**

* Hands-on experience with real-world projects and scalable applications.  
* Guidance and mentorship from experienced engineers.  
* A supportive, collaborative, and innovative work environment.  
* Opportunity to explore full-time opportunities upon successful internship completion.  

---
`,
    fields: [
        { name: "first_name", label: "First Name", type: "text", required: true },
        { name: "last_name", label: "Last Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "resume", label: "Upload Resume", type: "file", required: true },
        { name: "linkedin", label: "LinkedIn Profile", type: "url", required: false },
        {
            name: "grad_year",
            label: "Expected Graduation Year",
            type: "number",
            required: true,
        },
        {
            name: "cover_letter",
            label: "Cover Letter (Optional)",
            type: "textarea",
            required: false,
        },
    ],
}];

export default sampleJobForms;
