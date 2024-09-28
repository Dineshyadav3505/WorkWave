import Link from "next/link";
import React from "react";

const ApplyLink = ({
  applyLink,
  answerKeyLink,
  resultLink,
  admissionLink,
  admitCardLink,
  notificationLink
}) => {
  console.log(applyLink);
  console.log(answerKeyLink);
  console.log(resultLink);
  console.log(admissionLink);
  console.log(admitCardLink);

  return (
    <div className="w-full dark:bg-[#000000] text-sm md:text-sm lg:text-base bg-[#FFFFFF] px-10 py-5 rounded-md flex flex-col gap-2 md:flex-row flex-wrap">
      {/* notification Link */}
      {Array.isArray(notificationLink) &&
        notificationLink.length > 0 &&
        notificationLink.map((link) => (
          <Link
            key={link.id || link.label} // Use a unique identifier if available
            href={link.link}
            target="_blank"
            className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
          >
            {link.label}
          </Link>
        ))}
      {/* Apply Link */}
      {Array.isArray(applyLink) &&
        applyLink.length > 0 &&
        applyLink.map((link) => (
          <Link
            key={link.id || link.label} // Use a unique identifier if available
            href={link.link}
            target="_blank"
            className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-8 text-sm rounded-full"
          >
            {link.label}
          </Link>
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
  );
};

export default ApplyLink;
