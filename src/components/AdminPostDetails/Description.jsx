import React from "react";

const Description = ({ data }) => {
  return (
    <>
      {data && (
        <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
          <h1 className="text-base font-bold py-2">Post Information</h1>
          <div className="flex text-sx capitalize">{data}</div>
        </div>
      )}
    </>
  );
};

export default Description;
