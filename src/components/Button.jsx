import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button
      type="button"
      className="bg-violet-500 px-5 py-1 rounded mb-10"
      onClick={onClick}
    >
      Add Important Date
    </button>
  );
};

export default Button;