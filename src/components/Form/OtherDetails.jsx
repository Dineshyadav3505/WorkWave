"use client";

import React from "react";
import Heading from "@/components/Form/Heading";
import AddDeleteButton from "./AddDeleteButton";
import Input from "./Input";

const OtherDetails = ({
  informationSections,
  handleSubmit,
  addInformationSection,
  deleteInformationSection,
  handleInputChange,
  handleValueChange,
  addInformationField,
  deleteInformationField,
  addValueField,
  deleteValueField,
  addStringValue,
  deleteStringValue,
}) => {
  const addInformation = () => {
    addInformationSection();
  };

  const deleteInformation = () => {
    deleteInformationSection();
  };

  return (
    <div className="mt-6">
      <div className="relative mb-4">
        <Heading label="Information Section" />
        <AddDeleteButton
          handleAdd={addInformation}
          handleRemove={deleteInformation}
        />
      </div>

      {informationSections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm bg-white"
        >
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Information Name
            </label>
            <input
              type="text"
              name="informationName"
              value={section.informationName.type}
              onChange={(e) => handleInputChange(sectionIndex, e)}
              placeholder="Information Name (Category Wise Vacancy Details, Vacancy Details Total post)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {section.Information.map((info, infoIndex) => (
            <div key={infoIndex} className="mb-4 relative  ">
              <label className="block text-sm font-medium text-gray-700 ">
                Row {infoIndex + 1}
              </label>

              <AddDeleteButton
                handleAdd={() => addValueField(sectionIndex, infoIndex)}
                handleRemove={() => deleteValueField(sectionIndex, infoIndex)}
              />  

              <div className="flex gap-2 relative">
              {info.values.map((valueArray, arrayIndex) => (
                <div key={arrayIndex} className="mb-2">
                  <div className="flex gap-2 flex-col items-center mb-2 relative pt-10">
                    {valueArray.map((value, valueIndex) => (
                      <input
                        key={valueIndex}
                        type="text"
                        value={value}
                        placeholder="Value"
                        onChange={(e) =>
                          handleValueChange(
                            sectionIndex,
                            infoIndex,
                            arrayIndex,
                            valueIndex,
                            e
                          )
                        }
                        className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ))}
                    <AddDeleteButton
                      handleAdd={() =>
                        addStringValue(sectionIndex, infoIndex, arrayIndex)
                      }
                      handleRemove={() =>
                        deleteStringValue(sectionIndex, infoIndex, arrayIndex)
                      }
                    />
                  </div>
                </div>
              ))}
 
              </div>
            </div>
          ))}
          <div className="flex gap-2 justify-between">
            <button
              type="button"
              onClick={() => addInformationField(sectionIndex)}
              className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Information Field
            </button>
            <button
              type="button"
              onClick={() => deleteInformationField(sectionIndex)}
              className="px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Section
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default OtherDetails;