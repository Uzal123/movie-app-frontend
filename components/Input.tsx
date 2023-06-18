import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, name, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        required
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
