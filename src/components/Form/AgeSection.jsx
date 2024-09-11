import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "./AddDeleteButton"; // Adjust the import path as necessary

const AgeSection = ({ Limits, handleChange, handleAdd, handleRemove }) => {
  return (
    <div className="mt-6">
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
          />
          <Input
            type="text"
            name={`ageLimitValue${index}`} // Changed name for clarity
            id={`ageLimitValue${index}`} // Changed id for clarity
            label="Age"
            value={limit.age} // Ensure this is the correct field
            onChange={(e) => handleChange(index, "age", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default AgeSection;