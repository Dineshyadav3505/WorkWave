import { dbConnect } from "@/lib/dbConfig";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import { generateToken } from "@/lib/gernateToken";
import { options } from "@/lib/gernateToken";
import bcrypt from "bcryptjs";

export async function POST(req, res) {
    dbConnect();

    try {

        const {email, password} = await req.json();

        if (!email || !password) {
            return NextResponse.json({message: "Please provide Email & Password"}, {status: 400});
        }

        const databaseUser  = await User.findOne({email})

        if (!databaseUser) {
            return NextResponse.json({message: "Please provide a valid Email & Password"}, {status: 404});
        }

        const hashPassword = await bcrypt.compare(password, databaseUser.password);

        if(!hashPassword) {
            return NextResponse.json({message: "Please provide a valid Email & Password"}, {status: 400});
        }
   
        const token = generateToken(databaseUser._id);

        const response = NextResponse.json({
            message: "User logged in successfully",
            user: {
                email: databaseUser.email,
                name: databaseUser.name,
                _id: databaseUser._id,
                role: databaseUser.role
            },
            token
        }, {status: 200});

        response.cookies.set("accessToken", token, options);

        return response;


        
    } catch (error) {
        console.log("Error while try to login user",error);
        return NextResponse.json({message: "Error while try to login user"}, {status: 500});
    }
}