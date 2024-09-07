import React from 'react';

const Input = ({ 
  type = 'text', 
  name, 
  id, 
  label, 
  autoComplete = 'off', 
  className = '', 
  onChange, 
  value, 
  required = false, 
  ...props 
}) => {
  return (
    <div className="w-full md:w-[45%] flex flex-wrap">
    <div className={`mb-4 flex flex-col bg-red-900  ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-base font-medium text-gray-700">
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={id}
          autoComplete={autoComplete}
          className="w-full text-base bg-transparent border-b-[1px] border-zinc-600/45 focus:outline-none focus:ring-sky-500"
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      ) : type === 'file' ? (
        <input
          type={type}
          name={name}
          id={id}
          accept="image/*"
          className="w-full text-base bg-transparent border-b-[1px] border-zinc-600/45 focus:outline-none focus:ring-sky-500"
          onChange={onChange}
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          autoComplete={autoComplete}
          className="w-full text-base bg-transparent border-b-[1px] border-zinc-600/45 focus:outline-none focus:ring-sky-500"
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      )}
    </div>
    </div>
  );
};

export default Input;