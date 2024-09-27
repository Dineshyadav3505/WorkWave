"use client";
import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import SocialMedia from "../SocialMedia";

const Footer = () => {
  return (
    <div className="dark:bg-[#000000] rounded-t-3xl bg-[#023E8A] text-[#FFFFFF] flex flex-col pb-28 md:pb-14">
      <div className=" w-full p-[47px] flex flex-col md:flex-row gap-10 justify-between items-start ">
        <div className="w-full">
          <Logo />
          <p className="text-xs py-3 text-[#D7D5D5]">
            Stay informed about the latest government job updates with our
            Sarkari Job Update website. We provide timely and accurate
            information on upcoming government job vacancies, application
            deadlines, exam schedules, and more
          </p>
        </div>
        <div className=" flex flex-col w-full md:pl-40">
          <h3 className="py-3 text-base">Category</h3>
          {jobLink.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-xs py-1 capitalize text-[#D7D5D5] hover:pl-5 hover:scale-105 duration-300 pl-3"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className=" flex flex-col w-full md:pl-40">
          <h3 className="py-3 text-base">Quick Links</h3>
          {link.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-xs py-1 capitalize text-[#D7D5D5] hover:pl-5 hover:scale-105 duration-300 pl-3"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <SocialMedia/>
    </div>
  );
};

export default Footer;

const jobLink = [
  {
    title:'Latest Jobs',
    link:'/'
  },
  {
    title:'Result',
    link:'/result'
  },
  {
    title:'State Job',
    link:'/state-job'
  },
  {
    title:'Admit Card',
    link:'/admit-card'
  },
]

const link = [
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Contact Us",
    link: "/contact",
  },
  {
    title: "Privacy Policy",
    link: "/privacy",
  },
  {
    title: "Terms & Conditions",
    link: "/terms",
  },
  {
    title: "Help and Support",
    link: "/help",
  },
];
