"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
import Logo from "../Logo";
import SocialMedia from "../SocialMedia";
import { motion } from "framer-motion";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  const [error, setError] = useState(null); // Declare error state

  const logOut = async () => {
    try {
      const response = await fetch("/api/user/log-out", {
        method: "GET", // Ensure this is correct based on your API
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.push("/"); // Redirect to home page after logout
      console.log("Successfully logged out. Redirecting to the home page...");
    } catch (error) {
      setError(error.message); // Set the error message to state
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <nav className="h-16 bg-[#023E8A] sticky z-20 top-0 w-full right-0 dark:bg-[#000000] flex justify-between items-center px-[17px]">
      <div className="md:hidden pt-2">
        <button
          onClick={changeTheme}
          aria-label="Toggle theme"
          className="focus:outline-none text-[#FFFFFF]"
        >
          <ThemeToggleIcon theme={theme} />
        </button>
      </div>

      <Link href={"/admin"}>
        <Logo />
      </Link>

      <div className="flex gap-4">
        <div className="hidden md:flex">
          <button
            onClick={changeTheme}
            aria-label="Toggle theme"
            className="focus:outline-none text-[#FFFFFF]"
          >
            <ThemeToggleIcon theme={theme} />
          </button>
        </div>

        <div onClick={toggleMenu} className="text-[#FFFFFF]">
          <MenuIcon />
        </div>
      </div>

      {/* md Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 0.5 }}
          className="absolute flex flex-col min-h-96 items-end dark:bg-[#000000] bg-[#023E8A] top-0 right-0 py-[20px] px-[17px] pb-16 rounded-bl-lg"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col justify-center items-end"
          >
            <div onClick={toggleMenu} className="w-fit text-[#FFFFFF] mb-5">
              <CloseIcon onClick={toggleMenu} />
            </div>

            {menuLinks.map(({ name, url, icon }) => (
              <Link
                href={url}
                key={url}
                onClick={toggleMenu}
                className="flex w-64 md:w-[455px] text-[#ffffff] justify-between items-center border-b-[1px] border-[#E9E5E5] py-3"
              >
                <span className="flex gap-2 items-center">
                  <span>{icon}</span>
                  <h1 className="capitalize text-sm">{name}</h1>
                </span>
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
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </Link>
            ))}

            {/* Sign Out Button */}
            <div className={` flex justify-center items-center w-full py-10 `}>
            <button
              onClick={logOut}
              type="button"
              className={`py-1 px-4 rounded-full text-sm font-bold bg-[#64C8FA]`}
            >
              Sign Out
            </button>
            </div>

            {/* Social Media */}
            <SocialMedia />

            {/* Display error message if exists */}
            {error && <p className="text-red-500">{error}</p>}
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

const ThemeToggleIcon = ({ theme }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={
        theme === "light"
          ? "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          : "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      }
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

const createPost = (
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
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const menuLinks = [
  {
    name: "create post",
    url: "/admin/createPost",
    icon: createPost,
  },
];
