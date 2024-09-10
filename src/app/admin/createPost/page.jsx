"use client";
import AdmitCardLink from "@/components/Form/AdmitCardLink";
import ApplyLink from "@/components/Form/ApplyLink";
import AdmissionLink from "@/components/Form/AdmissionLink";
import AnswerKeyLink from "@/components/Form/AnswerKeyLink";
import ResultLink from "@/components/Form/ResultLink";
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
  const [state, setState] = useState("");
  const [totalPost, setTotalPost] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [importantDates, setImportantDates] = useState([
    { label: "", date: "" },
  ]);
  const [applicationFees, setApplicationFees] = useState([
    { label: "", fee: "" },
  ]);
  const [ageLimits, setAgeLimits] = useState([{ label: "", age: "" }]);
  const [applyLinks, setApplyLinks] = useState([{ label: "", link: "" }]);
  const [resultLink, setResultLink] = useState([{ label: "", link: "" }]);
  const [admitCardLink, setAdmitCardLink] = useState([{ label: "", link: "" }]);
  const [answerKeyLink, setAnswerKeyLink] = useState([{ label: "", link: "" }]);
  const [admissionLink, setAdmissionLink] = useState([{ label: "", link: "" }]);
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

  const handleNotificationStateChange = (e) => {
    setState(e.target.value);
  };

  const handleNotificationPostChange = (e) => {
    setTotalPost(e.target.value);
  };

  const handleBeginDateChange = (e) => {
    setBeginDate(e.target.value);
  };

  const handleLastDateChange = (e) => {
    setLastDate(e.target.value);
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
    setApplicationFees([...applicationFees, { label: "", fee: "" }]);
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
    setAgeLimits([...ageLimits, { label: "", age: "" }]);
  };

  const handleRemoveAgeLimit = () => {
    if (ageLimits.length > 1) {
      setAgeLimits(ageLimits.slice(0, -1));
    }
  };

  // Handlers for admit card links
  const handleAdmitCardLink = (index, field, value) => {
    const newLinks = [...admitCardLink];
    newLinks[index][field] = value;
    setAdmitCardLink(newLinks);
  };

  const handleRemoveAdmitCardLink = () => {
    if (admitCardLink.length > 1) {
      setAdmitCardLink(admitCardLink.slice(0, -1));
    }
  };

  const handleAdmissionLink = (index, field, value) => {
    const newLinks = [...admissionLink];
    newLinks[index][field] = value;
    setAdmissionLink(newLinks);
  };

  const handleRemoveAdmissionLink = () => {
    if (admissionLink.length > 1) {
      setAdmissionLink(admissionLink.slice(0, -1));
    }
  };

  const handleAnswerKeyLink = (index, field, value) => {
    const newLinks = [...answerKeyLink];
    newLinks[index][field] = value;
    setAnswerKeyLink(newLinks);
  };

  const handleRemoveAnswerKeyLink = () => {
    if (answerKeyLink.length > 1) {
      setAnswerKeyLink(answerKeyLink.slice(0, -1));
    }
  };

  const handleResultLink = (index, field, value) => {
    const newLinks = [...resultLink];
    newLinks[index][field] = value;
    setResultLink(newLinks);
  };

  const handleRemoveResultLink = () => {
    if (resultLink.length > 1) {
      setResultLink(resultLink.slice(0, -1));
    }
  };

  const handleApplyLink = (index, field, value) => {
    const newLinks = [...applyLinks];
    newLinks[index][field] = value;
    setApplyLinks(newLinks);
  };

  const handleRemoveApplyLink = () => {
    if (applyLinks.length > 1) {
      setApplyLinks(applyLinks.slice(0, -1));
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Image:", image);
    console.log("Post Name:", postName);
    console.log("Notification Link:", notificationLink);
    console.log("State:", state);
    console.log("Total Post:", totalPost);
    console.log("Begin Date:", beginDate);
    console.log("Last Date:", lastDate);
    console.log("Description:", description);
    console.log("Important Dates:", importantDates);
    console.log("Application Fees:", applicationFees);
    console.log("Age Limits:", ageLimits);
    console.log("Admit Card Links:", admitCardLink);
    console.log("Admission Links:", admissionLink);
    console.log("Answer Key Links:", answerKeyLink);
    console.log("Result Links:", resultLink);
    console.log("Apply Links:", applyLinks);
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

          <div className="flex items-center gap-3">
            <Input
              type="text"
              name="state"
              id="state"
              label="State Name"
              value={state}
              onChange={handleNotificationStateChange}
            />
            <Input
              type="text"
              name="totalPost"
              id="totalPost"
              label="Total Post"
              value={totalPost}
              onChange={handleNotificationPostChange}
              required={true}
            />
          </div>

          <div className="flex items-center gap-3">
            <Input
              type="date"
              name="beginDate"
              id="beginDate"
              label="State Name"
              value={beginDate}
              onChange={handleBeginDateChange}
              required={true}
            />

            <Input
              type="date"
              name="lastDate"
              id="lastDate"
              label="Last Date"
              value={lastDate}
              onChange={handleLastDateChange}

            />
          </div>

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

          <AdmitCardLink
            Limits={admitCardLink}
            handleChange={handleAdmitCardLink}
            handleAdd={handleAdmitCardLink}
            handleRemove={handleRemoveAdmitCardLink}
          />

          <AdmissionLink
            Limits={admissionLink}
            handleChange={handleAdmissionLink}
            handleAdd={handleAdmissionLink}
            handleRemove={handleRemoveAdmissionLink}
          />

          <AnswerKeyLink
            Limits={answerKeyLink}
            handleChange={handleAnswerKeyLink}
            handleAdd={handleAnswerKeyLink}
            handleRemove={handleRemoveAnswerKeyLink}
          />

          <ResultLink
            Limits={resultLink}
            handleChange={handleResultLink}
            handleAdd={handleResultLink}
            handleRemove={handleRemoveResultLink}
          />

          <ApplyLink
            Limits={applyLinks}
            handleChange={handleApplyLink}
            handleAdd={handleApplyLink}
            handleRemove={handleRemoveApplyLink}
          />

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
