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
import Description from "@/components/postDetails/Description";
import Loader from "@/components/Loader";
import BackGround from "@/components/BackGround";

const Post = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { pathname } = new URL(location.href);
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);

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
    <div className="h-full relative ">
      {error ? (
        <div>Error: {error.message}</div>
      ) : !data ? (
        <Loader />
      ) : (
        <>
          <div className=" relative">
            <BackGround />

            <div className="h-full w-full px-4 md:10 lg:px-16 pt-48 md:pt-60 lg:pt-64 space-y-4">
              <ImageComponent data={data} />
              <Description data={data.description} />
              <ImportantDates data={data.importantDates} />
              <ApplicationFee data={data.applicationFee} />
              <AgeLimit data={data.ageLimit} />
              <Information data={data.informationSections} />
              <ApplyLink
                applyLink={data.applyLink}
                answerKeyLink={data.answerKeyLink}
                resultLink={data.resultLink}
                admissionLink={data.admissionLink}
                admitCardLink={data.admitCardLink}
                notificationLink={data.notificationLink}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
