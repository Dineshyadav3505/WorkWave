"use client";
import Card from '@/components/Card'
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'


const page = () => {
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = (input) => {
    setSearchResult(input); 
  };

  console.log(searchResult)

  return (
    <div  className='min-h-screen p-4 '>
      <div className="">
        <SearchBar 
        placeholder="search for job"
        onSearch={handleSearch}
        />
      </div>
    
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-5">
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    </div>
    </div>
  )
}

export default page