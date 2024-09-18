"use client";
import React, { useState } from "react";
import Input from "@/components/Form/Input";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold any error messages
  const [loading, setLoading] = useState(false); // State to manage loading
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    setError(null); // Reset any previous error

    try {
      const response = await fetch("/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({ email, password }), // Convert the data to JSON
      });

      const data = await response.json(); // Parse the response data

      if (!response.ok) {
        throw new Error(data.message); // Throw an error if the response is not ok
      }

      if(data.user.role === "admin") {
        router.push("/admin");
      }else{
        router.push("/");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message); // Set the error message to state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center font-roboto">
      <div className="relative p-4 md:p-8 flex flex-col gap-10 w-full">
        <div className="md:w-1/2 px-5 md:mx-auto py-28">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500  ">Sign in to your account</p>

          {/* Display error message */}
          {error && <p className="text-red-500 ">{error}</p>}{" "}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-10 flex flex-col">
            <Input
              type="text"
              name="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn px-12 py-1m mx-auto rounded-md py-1 bg-[#033E8A] text-[#ffffff] my-10"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
