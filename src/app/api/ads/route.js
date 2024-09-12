import ads from "@/model/Ads.Model";
import { dbConnect } from "@/lib/dbConfig";
import auth from "@/lib/auth";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import { uploadOnCloudinary } from "@/lib/cloudnery";

// Create a new job post
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

    const dataBaseUser = await User.findById(id);

    if (!dataBaseUser || dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const expireDate = formData.get("expireDate");
    const img = await uploadOnCloudinary(file, "Ads");

    if(!expireDate) {
      return NextResponse.json(
        { message: "Please provide an expiration date." },
        { status: 400 }
      );
    };
    console.log(expireDate)

    if (!img) {
      return NextResponse.json(
        { message: "There was an error uploading the file." },
        { status: 500 }
      );
    }

    const newAds = new ads({
      ads: img.secure_url,
      expireDate: expireDate, 
    });

    await newAds.save();
    return NextResponse.json(newAds, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "There was an error uploading the file." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const allAds = await ads.find();
    return NextResponse.json(allAds, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "There was an error fetching the data." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const id = await auth(req);

  await dbConnect();

  try {
    if (!id) {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const dataBaseUser = await User.findById(id);

    if (!dataBaseUser || dataBaseUser.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized to access this route" },
        { status: 401 }
      );
    }

    const { id: _id } = await req.json();
    const deletedAds = await ads.findByIdAndDelete(_id);

    if (!deletedAds) {
      return NextResponse.json(
        { message: "There was an error deleting the data." },
        { status: 500 }
      );
    }

    return NextResponse.json(deletedAds, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "There was an error deleting the data." },
      { status: 500 }
    );
  }
}