import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "forms.json");

export async function GET(req, { params }) {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(null, { status: 404 });
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const forms = data ? JSON.parse(data) : {};
    const form = forms[params.id] || null;

    if (!form) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch form" }, { status: 500 });
  }
}
