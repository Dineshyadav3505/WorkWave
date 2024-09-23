import JobPost from "@/model/JobPost.Model";
import { dbConnect } from "@/lib/dbConfig";
import auth from "@/lib/auth";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import {uploadOnCloudinary} from "@/lib/cloudnery";

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
      answerKeyLink,
      admissionLink,
      informationSections,
      state,
      beginDate,
      lastDate,
      totalPost,
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
      answerKeyLink: JSON.parse(formData.get("answerKeyLink")),
      admissionLink: JSON.parse(formData.get("admissionLink")),
      informationSections: JSON.parse(formData.get("informationSections")), // Ensure it's parsed correctly
      state: formData.get("state"),
      beginDate: new Date(formData.get("beginDate")),
      lastDate: new Date(formData.get("lastDate")),
      totalPost: formData.get("totalPost"),
    };

    // Validate required fields
    if (!postName || !description || !image || !notificationLink || !beginDate) {
      return NextResponse.json(
        { message: "Please fill all the required fields" },
        { status: 400 }
      );
    }

    console.log("applicationFee", applicationFee);

    console.log("Information Sections", informationSections);
    console.log("Total Post", totalPost);

    const img = await uploadOnCloudinary(image, "NaukriVacancy");

    if (!img) {
      return NextResponse.json(
        { message: "There was an error uploading the file." },
        { status: 500 }
      );
    }

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
      answerKeyLink,
      admissionLink,
      informationSections, // Ensure this is being saved correctly
      state,
      beginDate,
      lastDate,
      totalPost,
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
  await dbConnect(); // Ensure the database is connected
  const query = req.url;
  const url = new URL(query, `http://${req.headers.host}`);
  
  // Get searchResult, page, limit, and link parameters from query parameters
  const searchResult = url.searchParams.get('searchResult');
  const page = parseInt(url.searchParams.get('page')) || 1; // Default to page 1 if not provided
  const limit = parseInt(url.searchParams.get('limit')) || 18; // Default to 18 if not provided
  const sortDirection = url.searchParams.get('sortDirection') === 'asc' ? 1 : -1; // Ascending or descending
  const linkType = url.searchParams.get('link');
  const upComingJob = url.searchParams.get('upComingJob') || false;
  const state = url.searchParams.get('state') || false;

  try {
    let queryOptions = {};
    
    if (searchResult) {
      queryOptions.postName = { $regex: searchResult, $options: 'i' };
    }

    if(upComingJob === "true"){
      queryOptions["applyLink"] = {
        $elemMatch: {
          link: { $eq: "" },
          label: { $eq: "" }
        }
      };
    }

    if(state === "true"){
      queryOptions.state = { $ne: '' };
    }

    if(linkType && linkType !== 'all' && upComingJob !== "true"){
      queryOptions[linkType] = { $exists: true, $elemMatch: { link: { $ne: '' } } };
    }

    // Fetch job posts with pagination and sorting
    const jobPosts = await JobPost.find(queryOptions)
      .sort({ updatedAt: sortDirection }) // Sort by updatedAt
      .skip((page - 1) * limit) // Skip posts for pagination
      .limit(limit); // Limit the number of posts returned

    const totalPosts = await JobPost.countDocuments(queryOptions); // Total number of filtered posts
    const totalPages = Math.ceil(totalPosts / limit); // Total number of pages

    return NextResponse.json({
      totalPosts,
      totalPages,
      currentPage: page,
      posts: jobPosts,
    });
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
        "answerKeyLink",
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

    const query = req.url;
    const url = new URL(query, `http://${req.headers.host}`);
    const jobPostId = url.searchParams.get('id');
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