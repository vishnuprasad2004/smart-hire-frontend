import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { form, jobFields, companies } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

interface Field {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { companySlug, title, description, fields, location, employmentType, team } = await req.json();
		console.log(companySlug, title, description, fields, location, employmentType, team);
		
    await db.transaction(async (tx) => {	
			const selectedCompany = await tx.select().from(companies).where(eq(companies.slug, companySlug)).limit(1);
			if (selectedCompany.length === 0) {
      	throw new Error("Company not found");
      }
			const newFormId = (await tx.insert(form).values({
				companyId: selectedCompany[0].id,
				title,
				description,
				totalResponses: 0,
				location,
				employmentType,
				team,
			}).returning({ id: form.id }))[0].id;
			
			// const formId = newFormId[0].id;
	
			const jobFieldsData: Field[] = JSON.parse(fields);
			for (const field of jobFieldsData) {
				await tx.insert(jobFields).values({
					formId: newFormId,
					name: field.name,
					label: field.label,
					type: field.type,
					required: field.required,
				});
			}

    });

    return NextResponse.json({ message: "Form created successfully",  });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } 
}