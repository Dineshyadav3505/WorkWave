import React from "react";

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
  return (
    <div className="w-full dark:bg-[#000000] text-sm md:text-sm lg:text-base bg-[#FFFFFF] rounded-md">
      {data.map((info, index) => (
        <div
          key={index}
          className="p-5 dark:bg-[#000000] bg-[#FFFFFF] rounded-md mt-2"
        >
          <h1 className="text-center font-bold border border-b-0 py-2 text-sm md:text-base lg:text-lg">
            {info.informationName.type}
          </h1>
          <div className="overflow-y-auto">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                {info.Information.map((detail, detailIndex) => (
                  <tr key={detailIndex}>
                    {detail.values.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-gray-300 px-4 py-2 text-start"
                      >
                        {Array.isArray(value) && value.length > 1 ? (
                          value.map((val, valIndex) => (
                            <div key={valIndex} className="min-w-52">
                              <span>○ </span>
                              {val}
                            </div>
                          ))
                        ) : (
                          <span>{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Information;
