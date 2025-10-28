import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { companies } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const company = await db.select().from(companies).where(eq(companies.email, email)).limit(1);
  if (!company || company.length == 0) return NextResponse.json({ message: "Invalid Email" }, { status: 401 });
	console.log(company);
	
  const isValid = await bcrypt.compare(password, company[0].password);
  if (!isValid) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

  const token = jwt.sign(
    { id: company[0].id, email: company[0].email, slug: company[0].slug },
    process.env.JWT_SECRET!,
    { expiresIn: "10d" }
  );

  const response = NextResponse.json({ message: "Login successful", slug: company[0].slug });
  response.cookies.set("token", token, {
		httpOnly: true, 
		// secure: true,
		sameSite: "lax",
		path: "/",
	});
  return response;
}
