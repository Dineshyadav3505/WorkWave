import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "./AddDeleteButton";

const InformationSection = ({
  informationSection,
  setInformationSection,
  handleAddInformationSection,
  handleRemoveInformationSection,
  handleAddInformationArray,
  handleRemoveInformationArray,
  handleAddInformationDetail,
  handleRemoveInformationDetail,
}) => {
  const handleInformationChange = (index, field, value) => {
    const newInformation = [...informationSection];
    newInformation[index][field] = value;
    setInformationSection(newInformation);
  };

  const handleLabelChange = (sectionIndex, arrayIndex, labelValue) => {
    const newInformation = [...informationSection];
    newInformation[sectionIndex].informationArray[arrayIndex].informationLabel =
      labelValue;
    setInformationSection(newInformation);
  };

  const handleDetailChange = (sectionIndex, arrayIndex, detailIndex, value) => {
    const newInformation = [...informationSection];
    newInformation[sectionIndex].informationArray[
      arrayIndex
    ].informationDetails[detailIndex] = value;
    setInformationSection(newInformation);
  };

  return (
    <div className="mt-6">
      <div className="relative mb-3">
        <Heading label="Information Section" />
        <AddDeleteButton
          handleAdd={handleAddInformationSection} // Add new section
          handleRemove={() =>
            handleRemoveInformationSection(informationSection.length - 1)
          }
        />
      </div>
      {informationSection.map((section, sectionIndex) => (
        <div key={sectionIndex} className="flex flex-col gap-3 mb-2 relative  border-[.1px] border-gray-600 p-2 ">
          <div className="w-full relative">
            {/* Information Name Input */}
            <Input
              type="text"
              name={`sectionTitle${sectionIndex}`}
              id={`sectionTitle${sectionIndex}`}
              label="Information Name"
              value={section.informationName}
              onChange={(e) =>
                handleInformationChange(
                  sectionIndex,
                  "informationName",
                  e.target.value
                )
              }
            />
          </div>
          {section.informationArray.map((infoArray, arrayIndex) => (
            <div key={arrayIndex} className="relative">
              {/* Information Label Input */}
              <Input
                type="text"
                name={`informationLabel${sectionIndex}-${arrayIndex}`}
                id={`informationLabel${sectionIndex}-${arrayIndex}`}
                label="Information Label"
                value={infoArray.informationLabel || ""}
                onChange={(e) =>
                  handleLabelChange(sectionIndex, arrayIndex, e.target.value)
                }
              />
              <AddDeleteButton
                handleAdd={() => handleAddInformationArray(sectionIndex)} // Add new information array
                handleRemove={() => handleRemoveInformationArray(sectionIndex)} // Remove information array
              />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative pt-6">
                {/* Information Details Inputs */}
                {infoArray.informationDetails.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex gap-2">
                    <Input
                      type="text"
                      name={`informationDetail${sectionIndex}-${arrayIndex}-${detailIndex}`}
                      id={`informationDetail${sectionIndex}-${arrayIndex}-${detailIndex}`}
                      label={`Detail ${detailIndex + 1}`}
                      value={detail}
                      onChange={(e) =>
                        handleDetailChange(
                          sectionIndex,
                          arrayIndex,
                          detailIndex,
                          e.target.value
                        )
                      }
                    />
                    <AddDeleteButton
                      handleAdd={() =>
                        handleAddInformationDetail(sectionIndex, arrayIndex)
                      } // Add detail
                      handleRemove={
                        () =>
                          handleRemoveInformationDetail(
                            sectionIndex,
                            arrayIndex,
                            detailIndex
                          ) // Remove detail
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* <AddDeleteButton
          handleAdd={handleAddInformationSection} // Add new section
          handleRemove={() =>
            handleRemoveInformationSection(informationSection.length - 1)
          } 
        /> */}
        </div>
      ))}
    </div>
  );
};

export default InformationSection;
