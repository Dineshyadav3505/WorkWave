"use client";
import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`h-screen w-full bg-transparent top-0  left-0 z-20 flex justify-center items-center ${className}`}>
      <p className="text-lg font-semibold">Loading...</p>
    </div>
  );
};

export default Loader;