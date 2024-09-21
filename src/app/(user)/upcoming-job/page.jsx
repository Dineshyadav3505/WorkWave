"use client";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import SimplePagination from "@/components/Pagination";

const Page = () => {
  const [searchResult, setSearchResult] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 12; // Define how many items per page

  const handleSearch = (input) => {
    setSearchResult(input);
    setCurrentPage(1); // Reset to first page on new search
  };

  const fetchProducts = async (page) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axios.get("/api/post", {
        params: {
          searchResult,
          page: 1,
          limit: 12,
          upComingJob: true,
          link: "upcoming-job",
        },
      });
      setData(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is false even on error
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch products when currentPage changes
  }, [searchResult, currentPage]); // Run effect when search result or current page changes

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div className=" p-4">
      <div>
        <SearchBar placeholder="Search for job" onSearch={handleSearch} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-5">
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
