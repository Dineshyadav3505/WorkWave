"use client";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";

const Page = () => {
  const [searchResult, setSearchResult] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (input) => {
    setSearchResult(input);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/post", {
          params: {
            searchResult,
            page: 1,
            limit: 12,
            link : "applyLink",
            state : "true",
          },
        });
        setData(response.data.posts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [searchResult]);

  return (
    <div className="min-h-screen p-4">
      <div>
        <SearchBar placeholder="Search for job" onSearch={handleSearch} />
      </div>

      {loading === true ? (
        <Loader/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-5">
          {data?.map((job) => (
            <Card key={job._id} data={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
