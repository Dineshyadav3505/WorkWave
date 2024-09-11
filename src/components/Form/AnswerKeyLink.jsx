import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "./AddDeleteButton";

const AnswerKeyLink = ({
  links,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  

  const Add = () => {
    handleAdd()
  }

  const Remover = () => {
    handleRemove()
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <Heading label="Answer Key Link" />
        <AddDeleteButton
          handleAdd={Add}
          handleRemove={Remover}
        />
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
          />
          <Input
            type="text"
            name={`answerKeyLink${index}`}
            id={`answerKeyLink${index}`}
            label="Link"
            value={link.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default AnswerKeyLink;