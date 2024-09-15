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
import OtherDetails from "@/components/Form/OtherDetails";

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
  const [informationSection, setInformationSection] = useState([
    {
      Information: [{ value: "" }],
    },
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

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handlePostChange = (e) => {
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

  const handleAdmitCardLinkChange = (index, field, value) => {
    const newLinks = [...admitCardLink];
    newLinks[index][field] = value;
    setAdmitCardLink(newLinks);
  };

  const handleAdmissionLinkChange = (index, field, value) => {
    const newLinks = [...admissionLink];
    newLinks[index][field] = value;
    setAdmissionLink(newLinks);
  };

  const handleAddAdmitCardLink = () => {
    setAdmitCardLink([...admitCardLink, { label: "", link: "" }]);
  };

  const handleRemoveAdmitCardLink = () => {
    if (admitCardLink.length > 1) {
      setAdmitCardLink(admitCardLink.slice(0, -1));
    }
  };

  const handleAnswerKeyLinkChange = (index, field, value) => {
    const newLinks = [...answerKeyLink];
    newLinks[index][field] = value;
    setAnswerKeyLink(newLinks);
  };

  const handleAddAdmissionLink = () => {
    setAdmissionLink([...admissionLink, { label: "", link: "" }]);
  };

  const handleRemoveAdmissionLink = () => {
    if (admissionLink.length > 1) {
      setAdmissionLink(admissionLink.slice(0, -1));
    }
  };

  const handleAddAnswerKeyLink = (index, field, value) => {
    setAnswerKeyLink([...answerKeyLink, { label: "", link: "" }]);
  };

  const handleRemoveAnswerKeyLink = () => {
    if (answerKeyLink.length > 1) {
      setAnswerKeyLink(answerKeyLink.slice(0, -1));
    }
  };

  const handleResultLinkChange = (index, field, value) => {
    const newLinks = [...resultLink];
    newLinks[index][field] = value;
    setResultLink(newLinks);
  };

  const handleAddResultLink = (index, field, value) => {
    setResultLink([...resultLink, { label: "", link: "" }]);
  };

  const handleRemoveResultLink = () => {
    if (resultLink.length > 1) {
      setResultLink(resultLink.slice(0, -1));
    }
  };

  const handleApplyLinkChange = (index, field, value) => {
    const newLinks = [...applyLinks];
    newLinks[index][field] = value;
    setApplyLinks(newLinks);
  };

  const handleAddApplyLink = (index, field, value) => {
    setApplyLinks([...applyLinks, { label: "", link: "" }]);
  };

  const handleRemoveApplyLink = () => {
    if (applyLinks.length > 1) {
      setApplyLinks(applyLinks.slice(0, -1));
    }
  };




  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {

      console.log(postName, description, image, notificationLink, importantDates, applicationFees, ageLimits, applyLinks, resultLink, admitCardLink, answerKeyLink, admissionLink, state, beginDate, lastDate, totalPost, informationSection);
      const formData = new FormData();
      formData.append("postName", postName);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("notificationLink", notificationLink);
      formData.append("importantDates", JSON.stringify(importantDates));
      formData.append("applicationFee", JSON.stringify(applicationFees));
      formData.append("ageLimit", JSON.stringify(ageLimits));
      formData.append("applyLink", JSON.stringify(applyLinks));
      formData.append("resultLink", JSON.stringify(resultLink));
      formData.append("admitCardLink", JSON.stringify(admitCardLink));
      formData.append("answerKeyLink", JSON.stringify(answerKeyLink));
      formData.append("admissionLink", JSON.stringify(admissionLink));
      formData.append("state", state);
      formData.append("beginDate", beginDate);
      formData.append("lastDate", lastDate);
      formData.append("totalPost", totalPost);
      formData.append("informationSection", JSON.stringify(informationSection));
  
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      alert("File uploaded successfully!");
      
    } catch (error) {
      console.error("Error while creating job post", error);
      alert("Error while creating job post", error);
    }
  };

  return (
    <div className="min-h-screen w-full py-44 dark:bg-bg-dark bg-bg-light">
      <div className="mx-auto px-5 lg:w-1/2">
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
            type="textarea"
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
              onChange={handleStateChange}
            />
            <Input
              type="text"
              name="totalPost"
              id="totalPost"
              label="Total Post"
              value={totalPost}
              onChange={handlePostChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <Input
              type="date"
              name="beginDate"
              id="beginDate"
              label="Begin Date"
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
            links={admitCardLink}
            handleChange={handleAdmitCardLinkChange}
            handleAdd={handleAddAdmitCardLink}
            handleRemove={handleRemoveAdmitCardLink}
          />

          <AdmissionLink
            links={admissionLink}
            handleChange={handleAdmissionLinkChange}
            handleAdd={handleAddAdmissionLink}
            handleRemove={handleRemoveAdmissionLink}
          />

          <AnswerKeyLink
            links={answerKeyLink}
            handleChange={handleAnswerKeyLinkChange}
            handleAdd={handleAddAnswerKeyLink}
            handleRemove={handleRemoveAnswerKeyLink}
          />

          <ResultLink
            links={resultLink}
            handleChange={handleResultLinkChange}
            handleAdd={handleAddResultLink}
            handleRemove={handleRemoveResultLink}
          />

          <ApplyLink
            links={applyLinks}
            handleChange={handleApplyLinkChange}
            handleAdd={handleAddApplyLink}
            handleRemove={handleRemoveApplyLink}
          />

          <OtherDetails
          
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