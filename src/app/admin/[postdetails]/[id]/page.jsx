"use client";
import React, { useEffect, useState, memo } from "react";
import Image from "next/image";
import axios from "axios";
import Loader from "@/components/Loader";
import Information from "@/components/AdminPostDetails/Information";
import ImportantDates from "@/components/AdminPostDetails/ImportantDates";
import ApplicationFee from "@/components/AdminPostDetails/ApplicationFee";
import AgeLimit from "@/components/AdminPostDetails/AgeLimit";
import ApplyLink from "@/components/AdminPostDetails/ApplyLink";
import Description from "@/components/AdminPostDetails/Description";
import { CldImage } from "next-cloudinary";
import Input from "@/components/Form/Input";
import { format } from "date-fns";
import AdmitCardLink from "@/components/AdminPostDetails/AdmitCardLink";
import AdmissionLink from "@/components/AdminPostDetails/AdmissionLink";
import AnswerKeyLink from "@/components/AdminPostDetails/AnswerKeyLink";
import ResultLink from "@/components/AdminPostDetails/ResultLink";

const Post = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { pathname } = new URL(location.href);
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);

    const fetchData = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`/api/post/details?id=${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState(false);
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

  const handleValueChange = (
    sectionIndex,
    infoIndex,
    arrayIndex,
    valueIndex,
    e
  ) => {
    const { value } = e.target;
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information[infoIndex].values[arrayIndex][
      valueIndex
    ] = value;
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
    if (
      updatedSections[sectionIndex].Information[infoIndex].values.length < 10
    ) {
      // Limit to 10 arrays
      updatedSections[sectionIndex].Information[infoIndex].values.push([""]); // Add a new array of strings
      setInformationSections(updatedSections);
    }
  };

  const deleteValueField = (sectionIndex, infoIndex, arrayIndex) => {
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information[infoIndex].values.splice(
      arrayIndex,
      1
    ); // Delete specific array
    setInformationSections(updatedSections);
  };

  const addStringValue = (sectionIndex, infoIndex, arrayIndex) => {
    const updatedSections = [...informationSections];
    if (
      updatedSections[sectionIndex].Information[infoIndex].values[arrayIndex]
        .length < 10
    ) {
      // Limit to 10 strings in each array
      updatedSections[sectionIndex].Information[infoIndex].values[
        arrayIndex
      ].push(""); // Add a new string to the nested array
      setInformationSections(updatedSections);
    }
  };

  const deleteStringValue = (
    sectionIndex,
    infoIndex,
    arrayIndex,
    valueIndex
  ) => {
    const updatedSections = [...informationSections];
    updatedSections[sectionIndex].Information[infoIndex].values[
      arrayIndex
    ].splice(valueIndex, 1); // Delete specific string from the nested array
    setInformationSections(updatedSections);
  };

  useEffect(() => {
    const { pathname } = new URL(location.href);
    const id = pathname.substring(pathname.lastIndexOf("/") + 1);

    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await axios.get(`/api/post/details?id=${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      console.log(
        postName,
        description,
        image,
        notificationLink,
        importantDates,
        applicationFees,
        ageLimits,
        applyLinks,
        resultLink,
        admitCardLink,
        answerKeyLink,
        admissionLink,
        state,
        beginDate,
        lastDate,
        totalPost,
        informationSections
      );

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
      formData.append(
        "informationSections",
        JSON.stringify(informationSections)
      );

      // Send the FormData directly without wrapping it in an object
      const response = await axios.put("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type for FormData
        },
      });
      setLoading(false);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error while creating job post:", error);
      setLoading(false);
      alert(`Error while creating job post: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  return (
    <div className="h-full relative ">
      {error ? (
        <div>Error: {error.message}</div>
      ) : !data ? (
        <Loader />
      ) : (
        <>
          <div className=" mb-10 relative">
            <div className="w-full h-full absolute -z-10 md:h-96  flex justify-center items-center py-1">
              <div className="w-[70%] lg:w-[52%] h-full  relative flex justify-center items-center">
                <Image
                  src="http://res.cloudinary.com/kodingmonk/image/upload/v1727506934/NaukriVacancy/bwuqdzdatwetl2yhhz1n.png"
                  alt="Post cover image"
                  fill // This allows the image to fill its parent container
                  priority // Prioritizes loading this image for performance
                  sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
                  style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
                  className="absolute"
                />
              </div>
            </div>

            <div className="h-full w-full px-4 md:10 lg:px-16 pt-48 md:pt-60 space-y-4">
              {/* Image Section */}
              <div className="p-7 w-full dark:bg-[#000000] bg-[#FFFFFF] rounded-md md:flex gap-5 justify-center items-center ">
                <div className="h-20 w-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto relative p-1 relative">
                  <CldImage
                    src={data.image}
                    alt="post"
                    fill
                    sizes="50vw" // Adjust size as needed
                    style={{ objectFit: "fit" }}
                    className="h-10 w-10 p-3"
                    crop={{
                      type: "auto",
                      source: true,
                      background: "#f0eeee",
                    }}
                    quality="auto"
                  />
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    label="Upload Image"
                    onChange={handleImageChange}
                    required={true}
                    inputClass={" absolute top-0 left-0 opacity-0"}
                  />
                </div>
                <div className="mx-auto md:w-[90%]">
                  <Input
                    type="text"
                    name="postName"
                    id="postName"
                    label="Post Name"
                    value={postName}
                    onChange={handlePostNameChange}
                    required={true}
                    placeholder={data.postName}
                  />
                  <hr />
                  <div className="mt-5 md:mt-2 flex flex-col items-center md:flex-row gap-2">
                    <Input
                      type="date"
                      name="beginDate"
                      id="beginDate"
                      label={`Begin Date (${formattedDate(data.beginDate)})`}
                      value={beginDate}
                      onChange={handleBeginDateChange}
                      placeholder={data.beginDate}
                    />

                    <Input
                      type="date"
                      name="lastDate"
                      id="lastDate"
                      label={`Last Date (${formattedDate(data.lastDate)})`}
                      value={lastDate}
                      onChange={handleLastDateChange}
                    />
                    <Input
                      type="text"
                      name="totalPost"
                      id="totalPost"
                      label="Total Post"
                      value={totalPost}
                      onChange={handlePostChange}
                      placeholder={data.totalPost}
                    />
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      label="State Name"
                      value={state}
                      onChange={handleStateChange}
                      placeholder={data.state}
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  label="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required={true}
                  placeholder={data.description}
                />
              </div>

              {/* ImportantDates */}
              <ImportantDates
                Limits={importantDates}
                handleChange={handleImportantDateChange}
                handleAdd={handleAddImportantDate}
                handleRemove={handleRemoveImportantDate}
                data={data.importantDates}
              />

              {/* ApplicationFee */}
              <ApplicationFee
                Limits={applicationFees}
                handleChange={handleApplicationFeeChange}
                handleAdd={handleAddApplicationFee}
                handleRemove={handleRemoveApplicationFee}
                data={data.applicationFee}
              />

              <AgeLimit
                Limits={ageLimits}
                handleChange={handleAgeLimitChange}
                handleAdd={handleAddAgeLimit}
                handleRemove={handleRemoveAgeLimit}
                data={data.ageLimit}
              />

              <AdmitCardLink
                links={admitCardLink}
                handleChange={handleAdmitCardLinkChange}
                handleAdd={handleAddAdmitCardLink}
                handleRemove={handleRemoveAdmitCardLink}
                data={data.admitCardLink}
              />

              <AdmissionLink 
                links={admissionLink}
                handleChange={handleAdmissionLinkChange}
                handleAdd={handleAddAdmissionLink}
                handleRemove={handleRemoveAdmissionLink}
                data={data.admissionLink}
              />

              <AnswerKeyLink
                links={answerKeyLink}
                handleChange={handleAnswerKeyLinkChange}
                handleAdd={handleAddAnswerKeyLink}
                handleRemove={handleRemoveAnswerKeyLink}
                data={data.answerKeyLink}
              />

              <ResultLink
                links={resultLink}
                handleChange={handleResultLinkChange}
                handleAdd={handleAddResultLink}
                handleRemove={handleRemoveResultLink}
                data={data.resultLink}
              />

              <ApplyLink
                links={applyLinks}
                handleChange={handleApplyLinkChange}
                handleAdd={handleAddApplyLink}
                handleRemove={handleRemoveApplyLink}
                data={data.applyLink}
              />


              <Information data={data.informationSections} />

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
