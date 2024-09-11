import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "./AddDeleteButton";

const ImportantDate = ({ Limits, handleChange, handleAdd, handleRemove }) => {


  const Add = () => {
    handleAdd()
  }

  const Remover = () => {
    handleRemove()
  }

  return (
    <div className="mt-6">
      <div className=" relative">
        <Heading label="Important Dates" />
        <AddDeleteButton
          handleAdd={Add}
          handleRemove={Remover}
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
            onChange={(e) =>
                handleChange(index, "label", e.target.value)
            }
          />
          <Input
            type="text" 
            name={`ageLimitDate${index}`}
            id={`ageLimitDate${index}`}
            label="Date"
            value={limit.date}
            onChange={(e) =>
                handleChange(index, "date", e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ImportantDate;
