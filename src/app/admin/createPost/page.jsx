"use client";
import AgeSection from "@/components/Form/AgeSection";
import ApplicationFee from "@/components/Form/ApplicationFee";
import Heading from "@/components/Form/Heading";
import ImportantDate from "@/components/Form/ImportantDate";
import Input from "@/components/Form/Input";
import React, { useState } from "react";

const Page = () => {
  const [image, setImage] = useState(null);
  const [postName, setPostName] = useState("");
  const [notificationLink, setNotificationLink] = useState("");
  const [description, setDescription] = useState("");
  const [importantDates, setImportantDates] = useState([
    { label: "", date: "" },
  ]);
  const [applicationFees, setApplicationFees] = useState([
    { label: "", date: "" },
  ]);
  const [ageLimits, setAgeLimits] = useState([{ label: "", date: "" }]);
  const [multiGrandChild, setMultiGrandChild] = useState([
    { title: "", titleChild: [{ titleChildName: "", titleGrandChild: [""] }] },
  ]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePostNameChange = (e) => {
    setPostName(e.target.value);
  };

  const handleNotificationLinkChange = (e) => {
    setNotificationLink(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handlers for important dates
  const handleImportantDateChange = (index, field, value) => {
    const newDates = [...importantDates];
    newDates[index][field] = value;
    setImportantDates(newDates);
  };

  const handleAddImportantDate = () => {
    setImportantDates([...importantDates, { label: "", date: "" }]);
  };

  const handleRemoveImportantDate = () => {
    if (importantDates.length > 1) {
      setImportantDates(importantDates.slice(0, -1));
    }
  };

  // Handlers for application fees
  const handleApplicationFeeChange = (index, field, value) => {
    const newFees = [...applicationFees];
    newFees[index][field] = value;
    setApplicationFees(newFees);
  };

  const handleAddApplicationFee = () => {
    setApplicationFees([...applicationFees, { label: "", date: "" }]);
  };

  const handleRemoveApplicationFee = () => {
    if (applicationFees.length > 1) {
      setApplicationFees(applicationFees.slice(0, -1));
    }
  };

  // Handlers for age limits
  const handleAgeLimitChange = (index, field, value) => {
    const newLimits = [...ageLimits];
    newLimits[index][field] = value;
    setAgeLimits(newLimits);
  };

  const handleAddAgeLimit = () => {
    setAgeLimits([...ageLimits, { label: "", date: "" }]);
  };

  const handleRemoveAgeLimit = () => {
    if (ageLimits.length > 1) {
      setAgeLimits(ageLimits.slice(0, -1));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Image:", image);
    console.log("Post Name:", postName);
    console.log("Notification Link:", notificationLink);
    console.log("Description:", description);
    console.log("Important Dates:", importantDates);
    console.log("Application Fees:", applicationFees);
    console.log("Age Limits:", ageLimits);
    console.log("Multi Grand Child:", multiGrandChild);
  };

  return (
    <div className="min-h-screen w-full py-44">
      <div className="mx-auto w-1/2">
        <form onSubmit={handleSubmit}>
          <Heading label="Post Information" />
          <div className="flex items-center gap-3">
            <Input
              type="text"
              name="postName"
              id="postName"
              label="Post Name"
              value={postName}
              onChange={handlePostNameChange}
              required={true}
            />
            <Input
              type="text"
              name="notificationLink"
              id="notificationLink"
              label="Notification Link"
              value={notificationLink}
              onChange={handleNotificationLinkChange}
              required={true}
            />
          </div>
          <Input
            type="text"
            name="description"
            id="description"
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            required={true}
          />
          <Input
            type="file"
            name="image"
            id="image"
            label="Upload Image"
            onChange={handleImageChange}
            required={true}
          />

          <ImportantDate
          Limits={importantDates}
          handleChange={handleImportantDateChange}
          handleAdd={handleAddImportantDate}
          handleRemove={handleRemoveImportantDate}
          />

          <ApplicationFee
          Limits={applicationFees}
          handleChange={handleApplicationFeeChange}
          handleAdd={handleAddApplicationFee}
          handleRemove={handleRemoveApplicationFee}
          />

          <AgeSection
            Limits={ageLimits}
            handleChange={handleAgeLimitChange}
            handleAdd={handleAddAgeLimit}
            handleRemove={handleRemoveAgeLimit}
          />

          

          {/* Multi Grand Child Section
          <div className="mt-6">
            <Heading label="Multi Grand Child" />
            {multiGrandChild.map((grandChild, grandChildIndex) => (
              <div key={grandChildIndex} className="mt-4">
                <Input
                  type="text"
                  name={`multiGrandChildTitle${grandChildIndex}`}
                  id={`multiGrandChildTitle${grandChildIndex}`}
                  label="Title"
                  value={grandChild.title}
                  onChange={(e) => {
                    const newMultiGrandChild = [...multiGrandChild];
                    newMultiGrandChild[grandChildIndex].title = e.target.value;
                    setMultiGrandChild(newMultiGrandChild);
                  }}
                  required={true}
                />
                {grandChild.titleChild.map((child, childIndex) => (
                  <div key={childIndex} className="mt-2">
                    <Input
                      type="text"
                      name={`titleChildName${grandChildIndex}-${childIndex}`}
                      id={`titleChildName${grandChildIndex}-${childIndex}`}
                      label="Title Child Name"
                      value={child.titleChildName}
                      onChange={(e) => handleTitleChildChange(grandChildIndex, childIndex, "titleChildName", e.target.value)}
                      required={true}
                    />
                    {child.titleGrandChild.map((grandChildName, grandChildIndex) => (
                      <Input
                        key={grandChildIndex}
                        type="text"
                        name={`titleGrandChild${grandChildIndex}`}
                        id={`titleGrandChild${grandChildIndex}`}
                        label="Title Grand Child"
                        value={grandChildName}
                        onChange={(e) => handleGrandChildChange(grandChildIndex, childIndex, grandChildIndex, e.target.value)}
                        required={true}
                      />
                    ))}
                    <button type="button" onClick={() => handleAddGrandChild(grandChildIndex, childIndex)} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                      Add Grand Child
                    </button>
                    <button type="button" onClick={() => handleRemoveGrandChild(grandChildIndex, childIndex)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                      Remove Last Grand Child
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddTitleChild(grandChildIndex)} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                  Add Title Child
                </button>
                <button type="button" onClick={() => handleRemoveTitleChild(grandChildIndex)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
                  Remove Last Title Child
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddMultiGrandChild} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
              Add Multi Grand Child
            </button>
            <button type="button" onClick={handleRemoveMultiGrandChild} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
              Remove Last Multi Grand Child
            </button>
          </div> */}

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
