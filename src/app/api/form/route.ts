// src/app/api/form/route.ts
import { db } from "@/lib/db";
import { form, jobFields, companies } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companySlug = searchParams.get("company");
    const formId = searchParams.get("id");

    if (!companySlug) {
      console.error("Missing company slug");
      return;
    }

    if (!formId) {
      console.error("Missing form id");
      return;
    }

    // Get the company ID
    const company = await db.select().from(companies).where(eq(companies.slug, companySlug));
    if (!company.length) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const companyId = company[0].id;

    // Get all forms for this company
    const jobForm = await db.select().from(form).where(eq(form.companyId, companyId) && eq(form.id, formId));

    // Fetch fields for each form
    const formsWithFields = await Promise.all(
      jobForm.map(async (f) => {
        const fields = await db.select().from(jobFields).where(eq(jobFields.formId, f.id));
        return { ...f, fields };
      })
    );

    return NextResponse.json({message: "Successfully fetched the data", data: formsWithFields[0]});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch forms", data: null }, { status: 500 });
  }
}
