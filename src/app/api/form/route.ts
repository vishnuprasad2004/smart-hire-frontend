import { db } from "@/lib/db";
import { form, jobFields, companies } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companySlug = searchParams.get("company");
    const formId = searchParams.get("id");

    if (!companySlug) {
      return NextResponse.json({ error: "Missing company slug" }, { status: 400 });
    }

    if (!formId) {
      return NextResponse.json({ error: "Missing form id" }, { status: 400 });
    }

    // Join form and companies tables
    const joinedData = await db
      .select({
        id: form.id,
        title: form.title,
        description: form.description,
        location: form.location,
        employmentType: form.employmentType,
        companyName: companies.name,
        companyId: form.companyId,
      })
      .from(form)
      .innerJoin(companies, eq(form.companyId, companies.id))
      .where(and(eq(companies.slug, companySlug), eq(form.id, formId)));

    if (!joinedData.length) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const selectedForm = joinedData[0];

    // Fetch fields for this form
    const fields = await db.select().from(jobFields).where(eq(jobFields.formId, selectedForm.id));

    return NextResponse.json({
      message: "Successfully fetched the data",
      data: { ...selectedForm, fields },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch form", data: null }, { status: 500 });
  }
}
