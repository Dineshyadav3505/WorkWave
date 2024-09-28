import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "@/components/Form/AddDeleteButton";

const AgeLimit = ({ data, Limits, handleChange, handleAdd, handleRemove }) => {

  return (
    <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
      <div className="relative">
        <Heading label="Age Limit" />
        <AddDeleteButton
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
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
            placeholder={data[index]?.label || "Label"} 
          />
          <Input
            type="text"
            name={`ageLimitValue${index}`} // Changed name for clarity
            id={`ageLimitValue${index}`} // Changed id for clarity
            label="Age"
            value={limit.age} // Ensure this is the correct field
            onChange={(e) => handleChange(index, "age", e.target.value)}
            placeholder={data[index]?.age || "Age"}
          />
        </div>
      ))}
    </div>
  );
};

export default AgeLimit;
