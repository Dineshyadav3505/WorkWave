import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "@/components/Form/AddDeleteButton";

const ApplicationFee = ({
  data,
  Limits,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  const Add = () => {
    handleAdd();
  };

  const Remove = () => {
    handleRemove();
  };

  return (
    <>
      <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
        <div className="relative">
          <Heading label="Application Fee" />
          <AddDeleteButton handleAdd={Add} handleRemove={Remove} />
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
              placeholder={data[index]?.label || "Label"} // Safe access with optional chaining
            />
            <Input
              type="text"
              name={`applicationFeeValue${index}`} // Changed name for clarity
              id={`applicationFeeValue${index}`} // Changed id for clarity
              label="Fee"
              value={fee.fee} // Ensure this is the correct field
              onChange={(e) => handleChange(index, "fee", e.target.value)}
              placeholder={data[index]?.fee || "Fee"} // Safe access with optional chaining
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ApplicationFee;
