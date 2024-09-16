import Link from "next/link";
import React from "react";

const Card = () => {
  return (
    <div className="w- full overflow-hidden shadow-lg h-52 ">
      <div className=" rounded-lg dark:bg-black bg-white p-2 flex flex-col relative ">
        <div className=" border-b-[1px] pb-3 flex items-start ">
          <img
            className="h-14 w-14 rounded-full"
            src="https://images.unsplash.com/photo-1719937206498-b31844530a96?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <h1 className="text-lg font-bold">John Doe</h1>
          <button>share</button>
        </div>
        <div className="my-4 py-2 dark:bg-white rounded-full flex justify-around items-center px-5 dark:text-text-light text-text-dark capitalize font-bold text-sm">
          <h6 className=" ">Begin : 10/09/2024</h6>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <h6>
            Last date : <span className="text-green-700"> 10/09/2024 </span>{" "}
          </h6>
        </div>
        <p className="text-red-600 text-sm mx-auto mb-4">13 days left</p>

        <div className=" absolute -bottom-3  w-full flex justify-center ">
          <Link href="/user/1" className="flex gap-1 bg-[#64C8FA] px-5 rounded-full text-base justify-center items-center leading-7">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
            </span>
            Quick Apply
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
