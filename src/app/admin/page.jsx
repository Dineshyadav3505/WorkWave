"use client";
import React, { useState } from "react";

const InformationForm = () => {
  const [informationSections, setInformationSections] = useState([
    {
      informationName: {
        type: "",
      },
      Information: [
        {
          values: [[""]], // Initializing with an array of arrays
        },
      ],
    },
  ]);

  const addInformationSection = () => {
    setInformationSections((prevSections) => [
      ...prevSections,
      {
        informationName: {
          type: "",
        },
        Information: [
          {
            values: [[""]], // Initialize new section with an array of arrays
          },
        ],
      },
    ]);
  };

  const deleteInformationSection = (index) => {
    setInformationSections((prevSections) =>
      prevSections.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (sectionIndex, e) => {
    const { name, value } = e.target;
    const updatedSections = [...informationSections];
    if (name === "informationName") {
      updatedSections[sectionIndex].informationName.type = value;
    }
    setInformationSections(updatedSections);
  };

  const handleValueChange = (sectionIndex, infoIndex, arrayIndex, valueIndex, e) => {
    const { value } = e.target;
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information[infoIndex].values[arrayIndex][valueIndex] = value;
    setInformationSections(updatedSections);
  };

  const addInformationField = (sectionIndex) => {
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information.push({ values: [[""]] }); // New field with an array of arrays
    setInformationSections(updatedSections);
  };

  const deleteInformationField = (sectionIndex, infoIndex) => {
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information.splice(infoIndex, 1); // Delete the entire information field
    setInformationSections(updatedSections);
  };

  const addValueField = (sectionIndex, infoIndex) => {
    const updatedSections = [...informationSections];
    if (updatedSections[sectionIndex].Information[infoIndex].values.length < 10) { // Limit to 10 arrays
      updatedSections[sectionIndex].Information[infoIndex].values.push([""]); // Add a new array of strings
      setInformationSections(updatedSections);
    }
  };

  const deleteValueField = (sectionIndex, infoIndex, arrayIndex) => {
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information[infoIndex].values.splice(arrayIndex, 1); // Delete specific array
    setInformationSections(updatedSections);
  };

  const addStringValue = (sectionIndex, infoIndex, arrayIndex) => {
    const updatedSections = [...informationSections];
    if (updatedSections[sectionIndex].Information[infoIndex].values[arrayIndex].length < 10) { // Limit to 10 strings in each array
      updatedSections[sectionIndex].Information[infoIndex].values[arrayIndex].push(""); // Add a new string to the nested array
      setInformationSections(updatedSections);
    }
  };

  const deleteStringValue = (sectionIndex, infoIndex, arrayIndex, valueIndex) => {
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information[infoIndex].values[arrayIndex].splice(valueIndex, 1); // Delete specific string from the nested array
    setInformationSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(informationSections); // Log the current state for verification
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        {informationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm bg-white">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Information Name</label>
              <input
                type="text"
                name="informationName"
                value={section.informationName.type}
                onChange={(e) => handleInputChange(sectionIndex, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {section.Information.map((info, infoIndex) => (
              <div key={infoIndex} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Information {infoIndex + 1}</label>
                {info.values.map((valueArray, arrayIndex) => (
                  <div key={arrayIndex} className="mb-2">
                    <div className="flex items-center mb-2">
                      {valueArray.map((value, valueIndex) => (
                        <input
                          key={valueIndex}
                          type="text"
                          value={value}
                          onChange={(e) =>
                            handleValueChange(sectionIndex, infoIndex, arrayIndex, valueIndex, e)
                          }
                          className="w-full px-3 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          deleteStringValue(sectionIndex, infoIndex, arrayIndex)
                        }
                        className="px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete Array
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => addStringValue(sectionIndex, infoIndex, arrayIndex)}
                      className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add String Value
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addValueField(sectionIndex, infoIndex)}
                  className="px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Value Array
                </button>
              </div>
            ))}

            <div className="flex justify-between">
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

      <button
        type="button"
        onClick={addInformationSection}
        className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Section
      </button>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo600 rounded-md shadow-sm hover:bg-indigo700 focus:outline-none focus:ring=2 focus:ring-offset=2 focus:ring-indigo500"
      >
        Submit
      </button>
    </form>
  );
};

export default InformationForm;