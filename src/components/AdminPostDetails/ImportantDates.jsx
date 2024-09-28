"use client";
import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "@/components/Form/AddDeleteButton";

const ImportantDates = ({
  data,
  Limits,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  const Add = () => {
    handleAdd();
  };

  const Remover = () => {
    handleRemove();
  };

  return (
    <>
      <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
        <div className="relative">
          <Heading label="Important Dates" />
          <AddDeleteButton handleAdd={Add} handleRemove={Remover} />
        </div>
        {Limits.map((limit, index) => (
          <div key={index} className="flex gap-3 mb-2">
            <Input
              type="text"
              name={`ageLimitLabel${index}`}
              id={`ageLimitLabel${index}`}
              label="Label"
              value={limit.label}
              onChange={(e) => handleChange(index, "label", e.target.value)}
              placeholder={data[index]?.label || "Label"} // Safe access with optional chaining
            />
            <Input
              type="text"
              name={`ageLimitDate${index}`}
              id={`ageLimitDate${index}`}
              label="Date"
              value={limit.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              placeholder={data[index]?.date || "DD/MM/YYYY"} // Safe access with optional chaining
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImportantDates;