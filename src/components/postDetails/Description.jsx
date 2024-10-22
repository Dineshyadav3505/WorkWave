import React from "react";

const Description = ({ data }) => {
  return (
    <>
      {data && (
        <div className="w-full dark:bg-[#000000] text-sm overflow-hidden md:text-sm lg:text-base bg-[#FFFFFF] rounded-md mt-5">
          <h1 className="text-base font-bold py-2 mb-3 text-center dark:bg-[#1D1D1D] bg-[#ECECEC]">Post Information</h1>
          <div className="flex text-sx capitalize px-3 pb-3">{data}</div>
        </div>
      )}
    </>
  );
};

export default Description;
