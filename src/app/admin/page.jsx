"use client";
import React, { useState } from "react";
import OtherDetails from "@/components/Form/OtherDetails";
import Heading from "@/components/Form/Heading";

const Page = () => {
  const [informationSection, setInformationSection] = useState([
    {
      informationName: {
        label: "String",
      },
      Information: [
        {
          value: [
            {
            item: "String",
          }
        ],
        },
      ],
    },
  ]);

  // Function to add a new Information entry
  const addInformation = (sectionIndex) => {
    const newInformationSection = [...informationSection];
    newInformationSection[sectionIndex].Information.push({
      value: {
        item: {
          type: "String",
        },
      },
    });
    setInformationSection(newInformationSection);
  };

  // Function to remove an Information entry
  const removeInformation = (sectionIndex, infoIndex) => {
    const newInformationSection = [...informationSection];
    if (newInformationSection[sectionIndex].Information.length > 1) {
      newInformationSection[sectionIndex].Information.splice(infoIndex, 1);
      setInformationSection(newInformationSection);
    }
  };

  // Function to add a new section
  const addInformationSection = () => {
    setInformationSection([
      ...informationSection,
      {
        informationName: {
          type: "String",
        },
        Information: [
          {
            value: {
              item: {
                type: "String",
              },
            },
          },
        ],
      },
    ]);
  };

  // Function to remove a section
  const removeInformationSection = (index) => {
    const newInformationSection = [...informationSection];
    if (newInformationSection.length > 1) {
      newInformationSection.splice(index, 1);
      setInformationSection(newInformationSection);
    }
  };

  // Handle input changes
  const handleChange = (sectionIndex, infoIndex, key, value) => {
    const newInformationSection = [...informationSection];
    if (infoIndex !== undefined) {
      newInformationSection[sectionIndex].Information[infoIndex].value[key] = value;
    } else {
      newInformationSection[sectionIndex][key] = value;
    }
    setInformationSection(newInformationSection);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(informationSection);
      const formData = new FormData();
      formData.append("informationSection", JSON.stringify(informationSection));

      const response = await fetch("/api/post/chach", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error while creating job post", error);
      alert("Error while creating job post: " + error.message);
    }
  };

  return (
    <div className="min-h-screen w-full py-44 dark:bg-bg-dark bg-bg-light">
      <div className="mx-auto px-5 lg:w-1/2">
        <form onSubmit={handleSubmit}>
          <Heading label="Post Information" />
          <OtherDetails 
            informationSection={informationSection}
            handleChange={handleChange}
            handleAdd={addInformation}
            handleRemove={removeInformation}
            handleAddSection={addInformationSection}
            handleRemoveSection={removeInformationSection}
          />
          <button
            type="submit"
            className="mt-4 w-full dark:bg-bg-button-dark bg-bg-button-light dark:text-text-button-dark text-text-button-light py-1 text-sm md:text-base rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;