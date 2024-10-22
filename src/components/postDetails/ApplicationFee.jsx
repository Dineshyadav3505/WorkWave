import React from "react";

const ApplicationFee = ({ data }) => {
  const dataCheck = Array.isArray(data) && data.length > 1;

  return (
    <>
      {dataCheck && (
        <div className="w-full dark:bg-[#000000] text-sm overflow-hidden md:text-sm lg:text-base bg-[#FFFFFF] rounded-md mt-5">
          <h1 className="text-base font-bold py-2 mb-3 text-center dark:bg-[#1D1D1D] bg-[#ECECEC]">Application Fee</h1>
          {data.map((item, index) => (
            <div key={index} className="flex text-sx capitalize px-3 pb-3">
              {item.label && <p>○ {item.label} ‎</p>}
              {item.fee && <p>: ‎ {item.fee}</p>}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ApplicationFee;
