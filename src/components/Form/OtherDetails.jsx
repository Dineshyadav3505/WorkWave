import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";

const OtherDetails = ({
  informationSection,
  handleChange,
  handleAdd,
  handleRemove,
  handleAddSection,
  handleRemoveSection,
}) => {
  return (
    <div className="mt-6">
      <div className="relative">
        <Heading label="Other Details" />
        <button 
          type="button" 
          onClick={handleAddSection} 
          className="mb-4 bg-blue-500 text-white py-1 px-3 rounded"
        >
          Add Section
        </button>
      </div>
      
      {informationSection.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4 border p-4 rounded shadow">
          <Input
            type="text"
            name={`informationName${sectionIndex}`}
            id={`informationName${sectionIndex}`}
            label="Information Name"
            value={section.informationName.label} // Assuming you want to edit this field
            onChange={(e) =>
              handleChange(sectionIndex, undefined, "informationName", { type: e.target.value })
            }
          />
          
          {section.Information.map((info, infoIndex) => (
            <div key={infoIndex} className="flex gap-3 mb-2">
              <Input
                type="text"
                name={`itemType${infoIndex}`}
                id={`itemType${infoIndex}`}
                label="Item Type"
                value={info.value.item} // Assuming this is what you want to edit
                onChange={(e) =>
                  handleChange(sectionIndex, infoIndex, "item", { type: e.target.value })
                }
              />
              <button 
                type="button" 
                onClick={() => handleRemove(sectionIndex, infoIndex)} 
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Remove Info
              </button>
            </div>
          ))}
          
          <button 
            type="button" 
            onClick={() => handleAdd(sectionIndex)} 
            className="mt-2 bg-green-500 text-white py-1 px-3 rounded"
          >
            Add Information
          </button>
          
          <button 
            type="button" 
            onClick={() => handleRemoveSection(sectionIndex)} 
            className="mt-2 bg-red-600 text-white py-1 px-3 rounded"
          >
            Remove Section
          </button>
        </div>
      ))}
    </div>
  );
};

export default OtherDetails;