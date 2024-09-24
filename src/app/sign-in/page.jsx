"use client";
import React, { useState } from "react";
import Input from "@/components/Form/Input";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); 
  
    try {
      const response = await axios.post("/api/user/sign-in", {
        email,
        password,
      });
  
      if (response.status >= 200 && response.status < 300) {
        const { user } = response.data;
  
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
  
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Failed to sign in."); // Handle unexpected status codes
      }
    } catch (error) {
      setError(error.message); // Set the error message to state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full flex justify-center items-center font-roboto">
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
