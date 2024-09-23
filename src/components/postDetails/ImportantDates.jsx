import React from "react";

const ImportantDates = ({ data }) => {
  
  const dataCheck = Array.isArray(data) && data.length > 1;

  return (
    <>
      {dataCheck && (
        <div className="w-full dark:bg-[#000000] px-3 py-2 text-sm md:text-sm lg:text-base bg-[#FFFFFF] p-2 rounded-md mt-5">
          <h1 className="text-base font-bold py-2">Important Dates</h1>
          {data.map((item, index) => (
            <div key={index} className="flex text-sx">
              {item.label && <p>○ {item.label} :</p>}
              {item.date && <p>‎ {item.date}</p>}
            </div>
          ))}
        </div>
      )} 
    </>
  );
};

export default ImportantDates;
