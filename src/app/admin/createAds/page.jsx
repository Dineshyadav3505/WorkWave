"use client";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import Loader from "@/components/Loader";
import React, { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);
  const [expireDate, setExpireDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      alert("Please upload an image or video before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData
    formData.append("expireDate", expireDate);

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setLoading(false);
      alert("File uploaded successfully!");
      resetForm(); // Reset form only on successful upload
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert(`There was an error uploading the file: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFile(null);
    setExpireDate("");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]); // Set the first selected file
    }
  };

  const handleDateChange = (e) => {
    setExpireDate(e.target.value);
  };

  return (
    <div className="min-h-screen w-full py-44 dark:bg-bg-dark bg-bg-light">
      <div className="mx-auto px-5 lg:w-1/2">
        {loading && (
          <Loader/>
        )}

        <form onSubmit={handleSubmit}>
          <Heading label="Ads Information" />

          <div className={`w-full py-3 dark:text-text-dark text-text-light`}>
            <label
              className={`text-sm py-2 flex capitalize items-center gap-1 dark:text-text-dark text-text-light font-bold`}
            >
              <span className="text-red-600">*</span>
              Upload Image/Video
            </label>
            <div className="border-[1px] border-zinc-600/45 px-2 py-1">
              <input
                type="file"
                name="videoUpload"
                id="videoUpload"
                accept="image/*,video/*" // Allow both images and videos
                onChange={handleFileChange}
                aria-label="Upload Image or Video"
              />
            </div>
          </div>

          <Input
            label="Expire Date"
            type="date"
            name="expireDate"
            required={true}
            onChange={handleDateChange}
            value={expireDate}
          />

          <button
            type="submit"
            className="mt-4 w-full dark:bg-bg-button-dark bg-bg-button-light dark:text-text-button-dark text-text-button-light py-1 text-sm md:text-base rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
