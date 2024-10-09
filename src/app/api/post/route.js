import JobPost from "@/model/JobPost.Model";
import { dbConnect } from "@/lib/dbConfig";
import auth from "@/lib/auth";
import { NextResponse } from "next/server";
import User from "@/model/user.model";
import { uploadOnCloudinary } from "@/lib/cloudnery";

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
    if (
      !postName ||
      !description ||
      !image ||
      !notificationLink ||
      !beginDate
    ) {
      return NextResponse.json(
        { message: "Please fill all the required fields" },
        { status: 400 }
      );
    }

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
  console.log(req)
  await dbConnect(); // Ensure the database is connected
  const query = req.url;
  const url = new URL(query, `http://${req.headers.host}`);

  // Get searchResult, page, limit, and link parameters from query parameters
  const searchResult = url.searchParams.get("searchResult");
  const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1 if not provided
  const limit = parseInt(url.searchParams.get("limit")) || 18; // Default to 18 if not provided
  const sortDirection =
    url.searchParams.get("sortDirection") === "asc" ? 1 : -1; // Ascending or descending
  const linkType = url.searchParams.get("link");
  const upComingJob = url.searchParams.get("upComingJob") || false;
  const state = url.searchParams.get("state") || false;
  const stateName = url.searchParams.get("stateName") || "All";

  console.log("GET request query params: ", stateName);

  try {
    let queryOptions = {};

    if (searchResult) {
      queryOptions.postName = { $regex: searchResult, $options: "i" };
    }

    if (upComingJob === "true") {
      queryOptions["applyLink"] = {
        $elemMatch: {
          link: { $eq: "" },
          label: { $eq: "" },
        },
      };
    }

    if (state === "true") {
      if(stateName !== "All") {
        queryOptions.state = { $ne: stateName };
        console.log("State name: ", stateName);
      }
      queryOptions.state = { $ne: "" };
    }

    if (linkType && linkType !== "all" && upComingJob !== "true") {
      queryOptions[linkType] = {
        $exists: true,
        $elemMatch: { link: { $ne: "" } },
      };
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
    // Check if the user is authorized
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

    // Retrieve the job post ID from form data
    const jobPostId = formData.get("id");

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

    // Define fields to check for updates
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
      "admissionLink",
      "informationSections",
      "state",
      "beginDate",
      "lastDate",
      "totalPost",
    ];

    // Iterate over each field and check for changes
    for (const field of fieldsToUpdate) {
      const newValue = formData.get(field);

      // If newValue is null or undefined, keep existing value; if it's empty string, replace with existing value
      if (newValue === null || newValue === undefined || newValue === "") {
        updateData[field] = existingJobPost[field];
      } else {
        let parsedValue;

        // Handle specific parsing for JSON fields and dates
        if (
          [
            "importantDates",
            "applicationFee",
            "ageLimit",
            "applyLink",
            "resultLink",
            "admitCardLink",
            "answerKeyLink",
            "admissionLink",
            "informationSections",
          ].includes(field)
        ) {
          parsedValue = newValue ? JSON.parse(newValue) : null; // Handle null case
        } else if (field === "beginDate" || field === "lastDate") {
          parsedValue = newValue ? new Date(newValue) : null; // Handle null case
        } else {
          parsedValue = newValue;
        }

        // Only add to updateData if the value has changed
        if (existingJobPost[field] !== parsedValue) {
          updateData[field] = parsedValue;
        }
      }
    }

    // Handle image upload separately if a new image is provided
    const imageFile = formData.get("image");

    if (imageFile !== "null" && imageFile !== undefined && imageFile !== null) {
      console.log("Uploading image...");
      const imgUploadResult = await uploadOnCloudinary(
        imageFile,
        "NaukriVacancy"
      );

      if (!imgUploadResult) {
        return NextResponse.json(
          { message: "There was an error uploading the file." },
          { status: 500 }
        );
      }

      updateData.image = imgUploadResult.secure_url; // Assuming imgUploadResult contains the new image URL
    } else {
      updateData.image = existingJobPost.image; // Keep existing image if no new image is uploaded
    }

    // Only proceed with the update if there are changes
    if (Object.keys(updateData).length > 0) {
      const updatedJobPost = await JobPost.findByIdAndUpdate(
        jobPostId,
        { $set: updateData },
        { new: true, runValidators: false } // Prevent validation errors for missing required fields
      );

      return NextResponse.json(updatedJobPost);
    } else {
      return NextResponse.json(
        { message: "No changes detected" },
        { status: 204 } // No Content
      );
    }
  } catch (error) {
    console.error("Error while updating job post", error);

    return NextResponse.json(
      { message: error.message || "Error while updating job post" },
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
    const jobPostId = url.searchParams.get("id");
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
