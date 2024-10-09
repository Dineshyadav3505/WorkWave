"use client";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import SimplePagination from "@/components/Pagination";
import { set } from "mongoose";

const Page = () => {
  const [searchResult, setSearchResult] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 12; // Define how many items per page
  const [callState, setCallState] = useState("");
  const [filter, setFilter] = useState(false);
  const stateName = [
    "All",
    "Bihar",
    "Chandigarh",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Madhya Pradesh",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Uttar Pradesh",
    "Uttarakhand",
  ];

  const handleSearch = (input) => {
    setSearchResult(input);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilter = () => {
    setFilter(!filter);
  }

  const handleState = async (state) => {  
    await setCallState(state);
    console.log(callState);
    setFilter(!filter);
    setCurrentPage(1); 
    fetchProducts(currentPage); 
  }

  const fetchProducts = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/post", {
        params: {
          searchResult,
          page,
          limit: itemsPerPage,
          link: "applyLink",
          state: "true",
          stateName: callState,
        },
      });
      setData(response.data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }, [searchResult, itemsPerPage, callState]);

  useEffect(() => {
    console.log("useEffect");
    fetchProducts(currentPage); 
  }, [searchResult, currentPage, callState]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div className=" p-4">
      <div className="flex flex-col md:flex-row w-full gap-1 items-center">
        <SearchBar placeholder="Search for job" onSearch={handleSearch} />
        <button
          className=" ml-2 bg-[#033E8A] text-white px-6 py-1.5 mb-5 rounded text-sm w-full md:w-auto"
          onClick={handleFilter}
          title="Filter"
        >
          Filter
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-5 relative">
            {filter && (
              <div className="flex gap-2 fixed right-5 left-5 rounded-xl z-20 justify-center items-center py-24">
                <div className=" w-full bg-[#FFFFFF] shadow-lg  dark:bg-black px-8 py-5 rounded-xl">
                  <div className="">
                  <h1 className="text-lg py-3">Select Your State</h1>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stateName.map((state) => (
                      <button
                        key={state}
                        className="bg-[#033E8A] text-white px-4 py-1 rounded text-sm"
                        onClick={() => handleState(state)}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {data?.map((job) => (
              <Card key={job._id} data={job} />
            ))}
          </div>
          <SimplePagination
            totalItems={100} // This should ideally come from your API response
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Page;
