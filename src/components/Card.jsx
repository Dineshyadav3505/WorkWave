"use client";
import React, { useState } from "react";
import { shortenText } from "@/utils/StringShort";
import Image from "next/image";
import daysLeft from "@/utils/DaysLeft";
import isNewUpdate, { removeSpace } from "@/utils/NewUpdate";
import Share from "@/utils/Share";
import Link from "next/link";
import axios from "axios";
import { CldImage } from "next-cloudinary";


const Card = ({ data, admin }) => {
  const leftDays = daysLeft(data.lastDate);
  const newUpdateStatus = isNewUpdate(data.updatedAt);
  const link = removeSpace(data.postName);
  const location = window.location.href;
  const id = data._id;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const share = async () => {
    Share({ link, location, id });
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    try {
      const response = await axios.delete("/api/post", {
        params: {
          id,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Post deleted successfully:", response.data);
        window.location.reload();
      } else {
        throw new Error("Failed to delete the post."); // Handle unexpected status codes
      }
    } catch (error) {
      setError(error.message); // Set the error message to state
    }
  };

  return (
    <div className="w-full overflow-hidden pb-7 relative">
      {/* New Update Indicator */}
      {newUpdateStatus && (
        <div className="absolute top-0 right-0 z-10 w-7 h-7 flex justify-center items-center">
          <h1 className="text-[11px] rotate-45 bg-red-600 leading-none px-10 py-1 font-bold uppercase">
            New
          </h1>
        </div>
      )}

      {/* Image, PostName and Share button */}
      <div className="rounded-[21.86px] dark:bg-black bg-white p-2 shadow-md flex flex-col relative">
        <div className="border-b-[1px] pb-3 flex items-center p-2 gap-4 w-full  ">
          <div className="relative w-[58.3px] flex items-center justify-center p-4 overflow-hidden">
            <CldImage
              loading="lazy"
              src={data.image}
              alt="post"
              fill
              sizes="50vw" // Adjust size as needed
              style={{ objectFit: "fit" }}
              className="h-10 w-10 px-1"
              crop={{
                type: "auto",
                source: true,
                background: "#f0eeee",
              }}
              quality="auto"
            />
          </div>
          <h1 className="text-sm w-[73%]  flex flex-wrap font-bold h-10 dark:text-white text-[#023E8A] overflow-hidden">
            {shortenText(data.postName, 10)}
          </h1>

          {/* Share Button && Delete Button */}
          {admin ? (
            <button onClick={deletePost} className="text-[#64C8FA]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={share}
              className="text-[#64C8FA]"
              aria-label="Share"
            >
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Begin Date and Last Date */}
        <div className="my-3 py-1 dark:bg-[#bcbbbb] text-[12px] bg-[#f0eeee] rounded-full flex justify-around items-center px-1 text-text-light capitalize font-bold ">
          <h2>Begin: {new Date(data.beginDate).toISOString().split("T")[0]}</h2>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5l7.5 7.5-7.5 7.5m6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <h2>
            Last date:{" "}
            <span className="text-green-800">
              {new Date(data.lastDate).toISOString().split("T")[0]}
            </span>
          </h2>
        </div>

        {/* Days Left */}
        <p className="text-[#C62828] text-[12px] font-bold mx-auto mb-4 capitalize">
          {leftDays}
        </p>

        {/* Link */}
        <div className="absolute -bottom-3 w-full flex justify-center">
          <Link
            {...(admin
              ? { href: `/admin/${link}/${id}` }
              : { href: `/${link}/${id}` })}
            className="flex gap-1 bg-[#023E8A] text-[12px] font-bold text-white px-5 rounded-full text-base justify-center items-center leading-7"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </span>
            Quick Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;