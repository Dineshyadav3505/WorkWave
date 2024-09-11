import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "./AddDeleteButton"; 

const ApplicationFee = ({
  Limits,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  return (
    <div className="mt-6">
      <div className="relative">
        <Heading label="Application Fee" />
        <AddDeleteButton
          handleAdd={handleAdd}
          handleRemove={handleRemove}
        />
      </div>
      {Limits.map((fee, index) => (
        <div key={index} className="flex gap-3 mb-2">
          <Input
            type="text"
            name={`applicationFeeLabel${index}`}
            id={`applicationFeeLabel${index}`}
            label="Label"
            value={fee.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
          />
          <Input
            type="text"
            name={`applicationFeeValue${index}`} // Changed name for clarity
            id={`applicationFeeValue${index}`} // Changed id for clarity
            label="Fee"
            value={fee.fee} // Ensure this is the correct field
            onChange={(e) => handleChange(index, "fee", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default ApplicationFee;