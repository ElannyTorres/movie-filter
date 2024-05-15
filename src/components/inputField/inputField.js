import React from 'react';

const InputField = ({ label, id, placeholder, value, onChange }) => (
  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
