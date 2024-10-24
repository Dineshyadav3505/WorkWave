import React, { useState } from "react";
import Link from "next/link";

const ApplyLink = ({
  applyLink,
  answerKeyLink,
  resultLink,
  admissionLink,
  admitCardLink,
  notificationLink,
}) => {
  // Group links by type and ensure they are arrays
  const groupedLinks = {
    notification: Array.isArray(notificationLink)
     ? notificationLink
      : [notificationLink],
    apply: Array.isArray(applyLink)? applyLink : [applyLink],
    answerKey: Array.isArray(answerKeyLink)? answerKeyLink : [answerKeyLink],
    result: Array.isArray(resultLink)? resultLink : [resultLink],
    admission: Array.isArray(admissionLink)? admissionLink : [admissionLink],
    admitCard: Array.isArray(admitCardLink)? admitCardLink : [admitCardLink],
  };

  // Ensure each link has required properties
  const validatedLinks = Object.fromEntries(
    Object.entries(groupedLinks).map(([type, links]) => [
      type,
      links.filter((link) => link && link.label && link.link),
    ])
  );

  const [linkStates, setLinkStates] = useState(
    Object.keys(validatedLinks).reduce(
      (acc, key) => ({...acc, [key]: key === "notification"? true : false }),
      {}
    )
  );

  const toggleLink = (type) => {
    setLinkStates((prevStates) => ({...prevStates, [type]:!prevStates[type] }));
  };

  const [notification, setNotification] = useState(false);
  const notificationToggle = () => {
    setNotification(!notification);
  };

  return (
    <div className="w-full dark:bg-[#000000] text-sm overflow-hidden md:text-sm lg:text-base bg-[#FFFFFF] rounded-md mt-5">
      <h1 className="text-base font-bold py-2 mb-3 text-center dark:bg-[#1D1D1D] bg-[#ECECEC]">
        Important Links
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center mb-3">
        {/* Notification Link outside the loop */}
        <div className="w-full md:w-full lg:w-full px-4 py-1">
          <div
            onClick={notificationToggle}
            className="flex justify-between px-3 border rounded py-1 cursor-pointer"
          >
            <h1 className="text-sm capitalize">Notification</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          {notification && (
            <div className="flex flex-col gap-2 dark:bg-[#1D1D1D] bg-[#ECECEC] text-sm py-2 px-3 rounded-b mb-3">
              <Link
                href={notificationLink}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 transition duration-300"
              >
                Official Notification
              </Link>
            </div>
          )}
        </div>

        {/* Other links within the loop */}
        {Object.keys(validatedLinks)
         .filter((type) => type!== "notification")
         .map((type) => {
            const links = validatedLinks[type];
            if (links.length > 0) {
              return (
                <div key={type} className="w-full md:w-full lg:w-full px-4 py-1">
                  <div
                    onClick={() => toggleLink(type)}
                    className="flex justify-between px-3 border rounded py-1 cursor-pointer"
                  >
                    <h1 className="text-sm capitalize">
                      {type.replace(/([A-Z])/g, " $1").trim()}
                    </h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                  {linkStates[type] && (
                    <div className="flex flex-col gap-2 dark:bg-[#1D1D1D] bg-[#ECECEC] text-sm py-2 px-3 rounded-b mb-3">
                      {links.map((link, index) => (
                        <Link
                          key={link.id || link.label}
                          href={link.link}
                          target="_blank"
                          className="text-blue-500 hover:text-blue-700 transition duration-300"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
      </div>

      {/* Optional: Display message if no links are available */}
      {Object.keys(validatedLinks).every(
        (type) => validatedLinks[type].length === 0
      ) && (
        <p className="py-2 px-4 text-center">No important links available.</p>
      )}
    </div>
  );
};

export default ApplyLink;