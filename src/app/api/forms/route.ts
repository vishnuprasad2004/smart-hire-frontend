// src/app/api/forms/route.ts
import { db } from "@/lib/db";
import { form, jobFields, companies } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companySlug = searchParams.get("company");

    if (!companySlug) {
      console.error("Missing company slug");
      return;
    }

    // Get the company ID
    const company = await db.select().from(companies).where(eq(companies.slug, companySlug));
    if (!company.length) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const companyId = company[0].id;

    // Get all forms for this company
    const formsList = await db.select().from(form).where(eq(form.companyId, companyId));

    // Fetch fields for each form
    const formsWithFields = await Promise.all(
      formsList.map(async (f) => {
        const fields = await db.select().from(jobFields).where(eq(jobFields.formId, f.id));
        return { ...f, fields };
      })
    );

    return NextResponse.json(formsWithFields);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}
