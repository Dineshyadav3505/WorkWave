"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import Logo from "../Logo";
import Link from "next/link";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(null); // Initialize error state
  const router = useRouter(); // Initialize router

  const logOut = async () => {
    try {
      const response = await fetch("/api/user/log-out", { // Corrected endpoint
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.push("/"); // Redirect after successful logout
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

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <nav className="h-16 bg-[#023E8A] sticky z-50 top-0 w-full right-0 dark:bg-[#000000] flex justify-between items-center px-[17px]">
      <div className="md:hidden pt-2">
        <button
          onClick={changeTheme}
          aria-label="Toggle theme"
          className="focus:outline-none text-[#FFFFFF]"
        >
          <ThemeToggleIcon theme={theme} />
        </button>
      </div>

      <Logo />

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
        <Link href="/admin/createPost" className="text-sm bg-white dark:bg-[#2a2a2a] hover:bg-[#e0e0e0] px-4 py-[2px] font-semibold rounded shadow-md">
          Create Post 
        </Link>
        <Link onClick={logOut} href="#" className="text-sm bg-white dark:bg-[#2a2a2a] px-4 hover:bg-[#e0e0e0] py-[2px] font-semibold rounded shadow-md">
          Log Out
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
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