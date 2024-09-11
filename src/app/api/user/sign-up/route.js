import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/gernateToken";
import { options } from "@/lib/gernateToken";

export async function POST(req, res) {
  await dbConnect();

  try {

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.error("Please provide all the fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already have a account with this email" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 4);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    user.save();

    const token = generateToken(user._id);
    console.log(token);

    const response =  NextResponse.json(
      {
        message: "User created successfully",
        user: {
          email: user.email,
          name: user.name,
          _id: user._id,
          role: user.role,
        },
        token,
      },
      { status: 201 }
    );
    response.cookies.set("accessToken", token , options);

    return response;    

  } catch (error) {
    return NextResponse.error("Error while creating user", error);
  }
}
