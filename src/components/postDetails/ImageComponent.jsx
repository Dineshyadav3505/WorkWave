import React from 'react'
import Image from 'next/image'
import daysLeft from '@/utils/DaysLeft'


const ImageComponent = ({data}) => {
      // Function to format date to a more readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const leftDays = daysLeft(data.lastDate);

  const details = [
    { label: "Begin", text: "", date: data.beginDate },
    { label: "Last Date", text: "#049A13", date: data.lastDate },
  ];

  return (
    <div className="h-full w-full absolute top-0 right-0 px-4 md:px-16 pt-48 md:pt-60 ">
    <div className="p-7 w-full dark:bg-[#000000] bg-[#FFFFFF] rounded-md md:flex gap-5 justify-center items-center ">
      <div className="h-20 w-20 md:w-24 md:h-24 bg-red-500 rounded-full overflow-hidden mx-auto relative">
        <Image
          src={data?.image || "/path/to/placeholder.jpg"}
          alt="Post Image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="mx-auto md:w-[90%]">
        <h1 className="text-center font-bold py-5 md:py-0 text-lg md:text-left md:mb-2">
          {data.postName}
        </h1>
        <hr />
        <div className="mt-5 md:mt-2 flex flex-col md:flex-row gap-2">
          {details.map((detail, index) => (
            <h4
              key={index}
              className="dark:bg-[#4d4c4c] capitalize bg-[#F4F4F4] text-center font-semibold py-2 px-5 text-sm rounded-full"
            >
              {detail.label} :{" "}
              <span style={{ color: detail.text }}>
                {formatDate(detail.date)}
              </span>
            </h4>
          ))}
          <h4 className="dark:bg-[#4d4c4c] capitalize bg-[#F4F4F4] text-center font-semibold py-2 px-5 text-sm rounded-full">
            Time Left: <span className="text-[#FF0000]">{leftDays}</span>
          </h4>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ImageComponent;