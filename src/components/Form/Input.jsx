import { space } from "postcss/lib/list";
import React from "react";

const Input = ({
  inputClass,
  textClass,
  optionClass,
  type = "text",
  name,
  id,
  label,
  labelClass,
  autoComplete = "off",
  onChange,
  value,
  required = false,
  ...props
}) => {
  const commonClasses = `w-full text-base bg-transparent border-[1px] dark:text-text-dark text-text-light px-2 py-1 rounded border-zinc-600/45 focus:outline-none focus:ring-sky-500 ${textClass}`;

  return (
    <div className={`w-full py-3 ${inputClass}`}>
      {label && (
        <label htmlFor={id} className={`text-sm py-2 flex capitalize items-center gap-1 dark:text-text-dark text-text-light font-bold ${labelClass}`}>
          {required && (<span className="text-red-600">*</span>)}
          {label}
          {!required && <span className={`dark:text-second-text-dark text-second-text-light text-xs ${optionClass}`}> (Optional)</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          id={id}
          autoComplete={autoComplete}
          className={commonClasses}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          autoComplete={type === "file" ? undefined : autoComplete}
          accept={type === "file" ? "image/*" : undefined}
          className={commonClasses}
          value={type === "file" ? undefined : value}
          onChange={onChange}
          required={required}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;