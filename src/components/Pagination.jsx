import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const SimplePagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex md:w-1/2 mx-auto py-5 items-center justify-between mt-6">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2" />
        Previous
      </button>

      <span className="text-sm dark:text-[#dadada] text-gray-700">
        Page <span className="font-semibold">{currentPage}</span> of{' '}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ChevronRightIcon className="w-5 h-5 ml-2" />
      </button>
    </div>
  );
};

export default SimplePagination;