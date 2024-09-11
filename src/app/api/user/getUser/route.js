import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import auth from "@/lib/auth";

export async function POST(req) {
  const id = await auth(req);
  await dbConnect();

  try {
    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    // Fetch user from the database
    const databaseUser = await User.findById(id);
    if (!databaseUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (databaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 403 } // 403 Forbidden if the user is found but not authorized
      );
    }

    // Prepare the response
    return NextResponse.json({
      message: "User logged in successfully",
      user: {
        email: databaseUser.email,
        name: databaseUser.name,
        _id: databaseUser._id,
        role: databaseUser.role,
      },
    }, { status: 200 });

  } catch (error) {
    console.log("Error while trying to login user", error);
    return NextResponse.json(
      { message: "Error while trying to login user" },
      { status: 500 }
    );
  }
}