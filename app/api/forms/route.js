// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// // JSON file ka path
// const filePath = path.join(process.cwd(), "forms.json");

// export async function POST(req) {
//   try {
//     const formData = await req.json();
//     const id = Date.now().toString(); // simple unique id
//     formData.id = id;

//     // Read existing data
//     let forms = {};
//     if (fs.existsSync(filePath)) {
//       const data = fs.readFileSync(filePath, "utf-8");
//       forms = data ? JSON.parse(data) : {};
//     }

//     // Save new form
//     forms[id] = formData;
//     fs.writeFileSync(filePath, JSON.stringify(forms, null, 2));

//     return NextResponse.json({ id });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to save form" }, { status: 500 });
//   }
// }
