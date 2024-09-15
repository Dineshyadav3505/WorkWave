import React from "react";
import Heading from "@/components/Form/Heading";
import Input from "@/components/Form/Input";
import AddDeleteButton from "./AddDeleteButton";

const InformationSection = ({
}) => {
  
  return (
    <div className="w-full">
      <Heading title="Other Details" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Notification Link"
          type="text"
          name="notificationLink"
          placeholder="Enter Notification Link"
        />
        <AddDeleteButton />
      </div>
    </div>
  );
};

export default InformationSection;
