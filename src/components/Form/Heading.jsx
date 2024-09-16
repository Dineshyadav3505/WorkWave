"use client";
import React from 'react'

const Heading = ({label, headerClass, textClass, spanClass}) => {
  return (
    <>
    <div className={` dark:text-text-dark text-text-light px-2 capitalize ${headerClass}`}>
        <h1 className={`text-lg md:text-xl font-thin py-2 ${textClass}`}>{label}</h1>
    </div>
        <span className={`block border-b-[.1px] border-gray-600 ${spanClass}`}></span>
    </>
  )
}

export default Heading;