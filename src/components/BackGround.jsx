import React, { useEffect, useState } from "react";
import Image from "next/image";

const BackGround = () => {
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = () => {

      if (localStorage.getItem("theme") === "dark") {
        setLightMode(true);
      } else {
        setLightMode(false);
      }

  };

  return (
    <div className="w-full absolute -z-10 h-[260px] mg:h-[300px] lg:h-[320px] flex justify-center items-center">
      {lightMode && (
        <>
          <Image
            src="http://res.cloudinary.com/kodingmonk/image/upload/v1727616022/NaukriVacancy/plfyzylitsurwalw61hz.jpg"
            alt="Post cover image"
            fill // This allows the image to fill its parent container
            priority // Prioritizes loading this image for performance
            sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
            style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
            className="absolute md:hidden light:hidden"
          />
          <Image
            src="http://res.cloudinary.com/kodingmonk/image/upload/v1727616046/NaukriVacancy/bcxishsu9or0nhifw6da.jpg"
            alt="Post cover image"
            fill // This allows the image to fill its parent container
            priority // Prioritizes loading this image for performance
            sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
            style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
            className="absolute hidden md:block light:hidden"
          />
          <Image
            src="http://res.cloudinary.com/kodingmonk/image/upload/v1727616088/NaukriVacancy/lljhns4sleknyxzwngkn.jpg"
            alt="Post cover image"
            fill // This allows the image to fill its parent container
            priority // Prioritizes loading this image for performance
            sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
            style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
            className="absolute hidden lg:block light:hidden "
          />
        </>
      )}
      <Image
        src="http://res.cloudinary.com/kodingmonk/image/upload/v1727615409/NaukriVacancy/umg0z7g5fkje0azx29db.jpg"
        alt="Post cover image"
        fill // This allows the image to fill its parent container
        priority // Prioritizes loading this image for performance
        sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
        style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
        className="absolute md:hidden dark:hidden"
      />
      <Image
        src="http://res.cloudinary.com/kodingmonk/image/upload/v1727615383/NaukriVacancy/jhcqqzv1pgswafstydtz.jpg"
        alt="Post cover image"
        fill // This allows the image to fill its parent container
        priority // Prioritizes loading this image for performance
        sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
        style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
        className="absolute hidden md:block dark:hidden"
      />
      <Image
        src="http://res.cloudinary.com/kodingmonk/image/upload/v1727615311/NaukriVacancy/xsexfkeqwvqgaoqbi3r2.jpg"
        alt="Post cover image"
        fill // This allows the image to fill its parent container
        priority // Prioritizes loading this image for performance
        sizes="(max-width: 500px) 100px, 50vw" // Adjust size based on viewport width
        style={{ objectFit: "fill" }} // Ensures the image covers the area while maintaining aspect ratio
        className="absolute hidden lg:block dark:hidden"
      />
    </div>
  );
};

export default BackGround;
