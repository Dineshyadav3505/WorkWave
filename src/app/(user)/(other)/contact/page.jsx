import SocialMedia from "@/components/SocialMedia";
import React from "react";

const ContactUs = () => {
  return (
    <div className="px-5">
      <div className="px-5 mx-auto my-10 py-10 max-w-3xl justify-items-center rounded-lg shadow-lg transition-transform transform">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

        <h2 className="text-lg font-semibold mb-4 text-center">
          Wanna connect with us? <br /> You can do so through the below
          mentioned links.
        </h2>

        <div className="flex px-0 flex-col gap-6 items-center mt-8">
          <div className="flex gap-3 items-center ">
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
                d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
              />
            </svg>

            <p className="font-sans">Contactnaukrivacancy@gmail.com</p>
          </div>
        </div>

        <h3 className="text-lg font-sans mt-8 text-center">
          Find us on social media
        </h3>

        <div className="flex justify-center mt-4">
          <SocialMedia iconClass=" dark:text-white text-black border-black dark:border-white" />
        </div>

        <div className="text-center mt-8">
          <h3 className="text-blue-600 font-sans font-bold">Thank You!</h3>
          <h3 className="text-blue-600 font-sans">
            We will get back to you soon...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
