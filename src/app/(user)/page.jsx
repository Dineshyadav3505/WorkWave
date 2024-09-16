import Card from '@/components/Card'
import SearchBar from '@/components/SearchBar'
import React from 'react'

const page = () => {
  return (
    <div  className='min-h-screen p-4 '>
      <div className="">
        <SearchBar/>
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