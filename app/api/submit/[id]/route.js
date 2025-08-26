import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data", "forms.json");

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // forms.json read karo
    const data = await fs.readFile(filePath, "utf-8");
    const forms = JSON.parse(data);

    if (!forms[id]) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const newResponse = {
      id: Date.now().toString(),
      formId: id,
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // responses array agar nahi hai to banado
    if (!forms[id].responses) forms[id].responses = [];
    forms[id].responses.push(newResponse);

    // file update karo
    await fs.writeFile(filePath, JSON.stringify(forms, null, 2));

    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit response", details: error.message },
      { status: 500 }
    );
  }
}
