"use client";
import React, { useEffect, useState, memo } from "react";
import Image from "next/image";
import axios from "axios";
import ImageComponent from "@/components/postDetails/ImageComponent";
import Information from "@/components/postDetails/Information";
import ImportantDates from "@/components/postDetails/ImportantDates";
import ApplicationFee from "@/components/postDetails/ApplicationFee";
import AgeLimit from "@/components/postDetails/AgeLimit";
import ApplyLink from "@/components/postDetails/ApplyLink";

const Post = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { pathname } = new URL(location.href);
    const id = pathname.substring(pathname.lastIndexOf('/') + 1);

    const fetchData = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`/api/post/details?id=${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[5000px] relative">
      {error ? (
        <div>Error: {error.message}</div>
      ) : !data ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-full h-96 bg-red-100 relative">
            <Image
              src="https://res.cloudinary.com/kodingmonk/image/upload/v1726928078/NaukriVacancy/s8kafnj1f8stxdzcjtth.png"
              alt="Post cover image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="h-full w-full absolute top-0 right-0 z-10 px-4 md:10 lg:px-16 pt-48 md:pt-60 space-y-4">
            <ImageComponent data={data} />
            <ImportantDates data={data.importantDates} />
            <ApplicationFee data={data.applicationFee} />
            <AgeLimit data={data.ageLimit} />
            <Information data={data.informationSections} />
            <ApplyLink data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Post;