import React from 'react'
import Image from 'next/image' 

const Post = () => {
  return (
    <div className=" p-4 min-h-screen relative">
        <Image
          src="https://res.cloudinary.com/kodingmonk/image/upload/v1726928078/NaukriVacancy/s8kafnj1f8stxdzcjtth.png"      
          alt="hero"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority={true}
        />
    </div>
  )
}

export default Post;