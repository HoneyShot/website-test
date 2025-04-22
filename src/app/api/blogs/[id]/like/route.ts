// src/app/api/blogs/[id]/like/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { db } = await connectToDatabase();
    
    const result = await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error liking blog post:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}