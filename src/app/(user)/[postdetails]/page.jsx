"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import ImageComponent from "@/components/postDetails/ImageComponent";

const Post = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "/api/post/details?id=66efd88a1324f42b81c37d63"
        );
        console.log(res.data.data); 
        setData(res.data.data); 
      } catch (err) {
        console.error(err); 
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>; // Display error if it exists
  }

  if (!data) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }



  return (
    <div className="min-h-screen relative">
      <div className="w-full h-96 bg-red-100 relative">
        <Image
          src="https://res.cloudinary.com/kodingmonk/image/upload/v1726928078/NaukriVacancy/s8kafnj1f8stxdzcjtth.png"
          alt="hero"
          fill
          priority // Add this if the image is above the fold
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes based on your layout
          style={{ objectFit: "cover" }} // Optional: to cover the area without distortion
        />
      </div>
      <ImageComponent data={data} />



 
    </div>
  );
};

export default Post;
