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
    const formsList = await db
      .select({
        companyId: form.companyId,
        id: form.id,
        title: form.title,
        location: form.location,
        employmentType: form.employmentType,
        totalResponses: form.totalResponses,
        companyName: companies.name,
        team: form.team,
        updatedAt: form.updatedAt,
      })
      .from(form)
      .innerJoin(companies, eq(form.companyId, companies.id))
      .where(eq(form.companyId, companyId));


    return NextResponse.json(formsList);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}
