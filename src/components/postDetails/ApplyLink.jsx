import React from "react";
import Link from "next/link";

const ApplyLink = ({
  applyLink,
  answerKeyLink,
  resultLink,
  admissionLink,
  admitCardLink,
  notificationLink,
}) => {
  return (
    <div className="w-full dark:bg-[#000000] text-sm overflow-hidden md:text-sm lg:text-base bg-[#FFFFFF] rounded-md mt-5">
      <h1 className="text-base font-bold py-2 mb-3 text-center dark:bg-[#1D1D1D] bg-[#ECECEC]">
        Important Links
      </h1>

      <div className="w-full dark:bg-[#000000] text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-4 rounded-md flex flex-col gap-2 md:flex-row flex-wrap">
        {/* notification Link */}
        {Array.isArray(notificationLink) &&
          notificationLink.length > 0 &&
          notificationLink.map((link) => (
            <div className=" border-[1px] border-red-900 py-3 px-4 bg-red-800 w-10 h-10">
              <Link
                key={link.id || link.label} // Use a unique identifier if available
                href={link.link}
                target="_blank"
                className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
              >
                {link.label}
              </Link>
            </div>
          ))}

        {/* Apply Link */}
        {Array.isArray(applyLink) &&
          applyLink.length > 0 &&
          applyLink.map((link) => (
            <div className="py-3 px-4">
              <h1 className="text-sm mb-2">Apply link</h1>
              <Link
                key={link.id || link.label} // Use a unique identifier if available
                href={link.link}
                target="_blank"
                className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
              >
                {link.label}
              </Link>
            </div>
          ))}

        {/* answerKey Link */}
        {Array.isArray(answerKeyLink) &&
          answerKeyLink.length > 0 &&
          answerKeyLink.map(
            (link) =>
              link.link && (
                <Link
                  key={link.id || link.label} // Use a unique identifier if available
                  href={link.link}
                  target="_blank"
                  className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
                >
                  {link.label}
                </Link>
              )
          )}
        {/* resultLink Link */}
        {Array.isArray(resultLink) &&
          resultLink.length > 0 &&
          resultLink.map(
            (link) =>
              link.link && (
                <Link
                  key={link.id || link.label} // Use a unique identifier if available
                  href={link.link}
                  target="_blank"
                  className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
                >
                  {link.label}
                </Link>
              )
          )}
        {/* admissionLink Link */}
        {Array.isArray(admissionLink) &&
          admissionLink.length > 0 &&
          admissionLink.map(
            (link) =>
              link.link && (
                <Link
                  key={link.id || link.label} // Use a unique identifier if available
                  href={link.link}
                  target="_blank"
                  className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
                >
                  {link.label}
                </Link>
              )
          )}
        {/* admitCardLink Link */}
        {Array.isArray(admitCardLink) &&
          admitCardLink.length > 0 &&
          admitCardLink.map(
            (link) =>
              link.link && (
                <Link
                  key={link.id || link.label} // Use a unique identifier if available
                  href={link.link}
                  target="_blank"
                  className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
                >
                  {link.label}
                </Link>
              )
          )}
      </div>
    </div>
  );
};

export default ApplyLink;
