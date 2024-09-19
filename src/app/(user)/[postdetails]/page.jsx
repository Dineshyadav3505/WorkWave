import React from 'react'
import Image from 'next/image' 

const Post = () => {
  return (
    <div className=" p-4 min-h-screen relative">
        <Image
            src="/images/hero.jpg"      
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