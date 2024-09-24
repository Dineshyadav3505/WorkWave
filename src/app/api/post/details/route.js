import JobPost from "@/model/JobPost.Model";
import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect(); // Ensure the database is connected
  const query = req.url;
  const url = new URL(query, `http://${req.headers.host}`);

  try {
    const id = url.searchParams.get("id");

    const singlePost = await JobPost.findById(id);

    if (!singlePost) {
      return NextResponse.json(
        { message: "Job post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Job post found",
      data: singlePost,
    });
  } catch (error) {
    console.error("Error while fetching job posts", error);
    return NextResponse.json(
      { message: "Error while fetching job posts" },
      { status: 500 }
    );
  }
}
