import React from 'react'
import daysLeft from '@/utils/DaysLeft'
import { CldImage } from "next-cloudinary";



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
    { label: "Last Date", text: "#FF0000", date: data.lastDate },
  ];

  return (
  
    <div className="p-7 w-full dark:bg-[#000000] bg-[#FFFFFF] rounded-md md:flex gap-5 justify-center items-center ">
      <div className="h-20 w-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto relative p-1">
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
      </div>
      <div className="mx-auto md:w-[90%]">
        <h1 className="text-center font-bold py-5 md:py-0 text-lg md:text-left md:mb-2">
          {data.postName}
        </h1>
        <hr />
        <div className="mt-5 md:mt-2 flex flex-col items-center md:flex-row flex-wrap gap-2">
          {details.map((detail, index) => (
            <h4
              key={index}
              className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-5 text-sm rounded-full"
            >
              {detail.label} :{" "}
              <span style={{ color: detail.text }}>
                {formatDate(detail.date)}
              </span>
            </h4>
          ))}

          <h4 className="dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-5 text-sm rounded-full">
            Time Left: <span className="text-[#FF0000]">{leftDays}</span>
          </h4>
          <h6 className='dark:bg-[#1d1d1d] capitalize w-full md:w-fit bg-[#F4F4F4] text-center font-semibold py-2 px-5 text-sm rounded-full'>
          total Vacancy : {data?.totalPost}
          </h6>
        </div>
      </div>
    </div>

  )
}

export default ImageComponent;