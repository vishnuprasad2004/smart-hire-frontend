import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { form, jobFields, companies } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { companySlug, title, description, fields,  } = await req.json();

    const company = await db.select().from(companies).where(eq(companies.slug, companySlug)).limit(1);
    const newFormId = db.insert(form).values({
      companyId: company[0].id,
      title,
      description,
      totalResponses: 0,
    }).returning({ });
  } catch (error) {
    console.error("Error creating form:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  } 
}