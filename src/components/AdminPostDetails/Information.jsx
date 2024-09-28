import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "@/components/Form/AddDeleteButton";

const Information = ({
  data,
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
    <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
      <div className="relative">
        <Heading label="Information Section" />
        <AddDeleteButton
          handleAdd={addInformation}
          handleRemove={deleteInformation}
        />
      </div>
      {informationSections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm "
        >
          <div className="mb-4">
            <Input
              type="text"
              label={"Information Name"}
              name="informationName"
              value={section.informationName.type}
              onChange={(e) => handleInputChange(sectionIndex, e)}
              placeholder={data[sectionIndex]?.informationName.type || "Name"}
            />
          </div>

          {section.Information.map((info, infoIndex) => (
            <div key={infoIndex} className="mb-4 relative ">
              <label className="block text-sm font-medium text-black dark:text-white ">
                Row {infoIndex + 1}
              </label>

              <AddDeleteButton
                handleAdd={() => addValueField(sectionIndex, infoIndex)}
                handleRemove={() => deleteValueField(sectionIndex, infoIndex)}
              />

              <div className="flex gap-2 relative overflow-auto">
                {info.values.map((valueArray, arrayIndex) => (
                  <div key={arrayIndex} className="mb-2">
                    <div className="flex gap-2 flex-col items-center mb-2 relative pt-10">
                      {valueArray.map((value, valueIndex) => (
                        <Input
                          key={valueIndex}
                          label={"value " + (valueIndex + 1)}
                          type="text"
                          placeholder={
                            data[sectionIndex]?.Information?.[infoIndex]
                              ?.values?.[arrayIndex]?.[valueIndex] || "Value"
                          }
                          onChange={(e) =>
                            handleValueChange(
                              sectionIndex,
                              infoIndex,
                              arrayIndex,
                              valueIndex,
                              e
                            )
                          }
                          inputClass="border-gray-300 w-56 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              Add Row
            </button>
            <button
              type="button"
              onClick={() => deleteInformationField(sectionIndex)}
              className="px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Row
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Information;
