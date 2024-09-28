"use client";
import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "@/components/Form/AddDeleteButton";

const AdmissionLink = ({
  data,
  links,
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
    <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
      <div className="relative">
        <Heading label="Admission Link" />
        <AddDeleteButton handleAdd={Add} handleRemove={Remover} />
      </div>
      {links.map((link, index) => (
        <div key={index} className="flex gap-3 mb-2">
          <Input
            type="text"
            name={`answerKeyLabel${index}`}
            id={`answerKeyLabel${index}`}
            label="Label"
            value={link.label}
            onChange={(e) => handleChange(index, "label", e.target.value)}
            placeholder={data[index]?.label || "Label"}
          />
          <Input
            type="text"
            name={`answerKeyLink${index}`}
            id={`answerKeyLink${index}`}
            label="Link"
            value={link.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
            placeholder={data[index]?.link || "Link"}
          />
        </div>
      ))}
    </div>
  );
};

export default AdmissionLink