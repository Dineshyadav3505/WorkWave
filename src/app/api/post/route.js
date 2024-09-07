import JobPost from "@/model/JobPost.Modele";
import { dbConnect } from "@/lib/dbConfig";
import auth from "@/lib/auth";
import { NextResponse } from "next/server";
import User from "@/model/user.model";

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
    const {
      postName,
      description,
      image,
      notificationLink,
      importantDates,
      applicationFee,
      ageLimit,
      applyLink,
      resultLink,
      admitCardLink,
      answerkeyLink,
      AdmissionLink,
      multiChild,
      multiGrandChild,
      multiGrandChild2,
      state,
      beginDate,
      lastDate,
    } = {
      postName: formData.get("postName"),
      description: formData.get("description"),
      image: formData.get("image"),
      notificationLink: formData.get("notificationLink"),
      importantDates: JSON.parse(formData.get("importantDates")),
      applicationFee: JSON.parse(formData.get("applicationFee")),
      ageLimit: JSON.parse(formData.get("ageLimit")),
      applyLink: JSON.parse(formData.get("applyLink")),
      resultLink: JSON.parse(formData.get("resultLink")),
      admitCardLink: JSON.parse(formData.get("admitCardLink")),
      answerkeyLink: JSON.parse(formData.get("answerkeyLink")),
      AdmissionLink: JSON.parse(formData.get("AdmissionLink")),
      multiChild: JSON.parse(formData.get("multiChild")),
      multiGrandChild: JSON.parse(formData.get("multiGrandChild")),
      multiGrandChild2: JSON.parse(formData.get("multiGrandChild2")),
      state: formData.get("state"),
      beginDate: new Date(formData.get("beginDate")),
      lastDate: new Date(formData.get("lastDate")),
    };

    // Validate required fields
    if (!postName || !description || !image || !notificationLink || !beginDate || !lastDate) {
      return NextResponse.json(
        { message: "Please fill all the required fields" },
        { status: 400 }
      );
    }

    const img = await uploadOnCloudinary(image, "PostImage");

    const jobPost = new JobPost({
      postName,
      description,
      image: img.secure_url,
      notificationLink,
      importantDates,
      applicationFee,
      ageLimit,
      applyLink,
      resultLink,
      admitCardLink,
      answerkeyLink,
      AdmissionLink,
      multiChild,
      multiGrandChild,
      multiGrandChild2,
      state,
      beginDate,
      lastDate,
    });

    await jobPost.save();
    return NextResponse.json(jobPost, { status: 201 });
  } catch (error) {
    console.error("Error while creating job post", error);
    return NextResponse.json(
      { message: "Error while creating job post" },
      { status: 500 }
    );
  }
}

// Get all job posts
export async function GET(req) {
  await dbConnect();

  try {
    const jobPosts = await JobPost.find();
    return NextResponse.json(jobPosts);
  } catch (error) {
    console.error("Error while fetching job posts", error);
    return NextResponse.json(
      { message: "Error while fetching job posts" },
      { status: 500 }
    );
  }
}

// Update a job post by ID
export async function PUT(req) {
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
      const jobPostId = formData.get("id"); // Assuming the ID is sent in the form data
  
      // Retrieve the existing job post
      const existingJobPost = await JobPost.findById(jobPostId);
      if (!existingJobPost) {
        return NextResponse.json(
          { message: "Job post not found" },
          { status: 404 }
        );
      }
  
      // Create an object to hold the updated fields
      const updateData = {};
  
      // Only update fields that have changed
      const fieldsToUpdate = [
        "postName",
        "description",
        "image",
        "notificationLink",
        "importantDates",
        "applicationFee",
        "ageLimit",
        "applyLink",
        "resultLink",
        "admitCardLink",
        "answerkeyLink",
        "AdmissionLink",
        "multiChild",
        "multiGrandChild",
        "multiGrandChild2",
        "state",
        "beginDate",
        "lastDate",
      ];
  
      fieldsToUpdate.forEach((field) => {
        const newValue = formData.get(field);
        if (newValue !== null && newValue !== "") {
          // If the new value is different from the existing one, update it
          if (Array.isArray(existingJobPost[field])) {
            // Handle array fields
            const parsedNewValue = JSON.parse(newValue);
            if (JSON.stringify(existingJobPost[field]) !== JSON.stringify(parsedNewValue)) {
              updateData[field] = parsedNewValue;
            }
          } else if (existingJobPost[field] !== newValue) {
            updateData[field] = newValue;
          }
        }
      });
  
      // Update the job post with the new values
      const updatedJobPost = await JobPost.findByIdAndUpdate(jobPostId, updateData, {
        new: true,
        runValidators: true,
      });
  
      return NextResponse.json(updatedJobPost);
    } catch (error) {
      console.error("Error while updating job post", error);
      return NextResponse.json(
        { message: "Error while updating job post" },
        { status: 500 }
      );
    }
  }

// Delete a job post by ID
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

    const jobPostId = req.query.id; // Assuming the ID is passed as a query parameter
    const deletedJobPost = await JobPost.findByIdAndDelete(jobPostId);

    if (!deletedJobPost) {
      return NextResponse.json(
        { message: "Job post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Job post deleted successfully" });
  } catch (error) {
    console.error("Error while deleting job post", error);
    return NextResponse.json(
      { message: "Error while deleting job post" },
      { status: 500 }
    );
  }
}