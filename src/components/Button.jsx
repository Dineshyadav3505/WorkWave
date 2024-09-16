import Link from 'next/link';
import React from 'react';

const Button = ({link, divClass, innerClass, text  }) => {
  return (
    <div className={` flex justify-center items-center w-full py-10 ${divClass}`}>
    <Link href={link}
      type="button"
      className={`bg-[#023E8A] py-1 rounded-full px-12 text-sm ${innerClass} `}
    >
      {text}
    </Link>
    </div>
  );
};

export default Button;