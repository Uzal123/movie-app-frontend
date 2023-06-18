import React, { FC } from "react";
type CrossIconProps = {
  className?: string;
};

const CrossIcon: FC<CrossIconProps> = ({ className = "" }) => {
  return (
    <svg
      data-name="Livello 1"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 122a58 58 0 1 1 58-58 58.07 58.07 0 0 1-58 58Z"
        fill="#ff0000"
        className="fill-000000"
      ></path>
      <path
        d="M92.12 35.79a3 3 0 0 0-4.24 0L64 59.75l-23.87-24A3 3 0 0 0 35.88 40l23.88 24-23.88 24a3 3 0 0 0 4.25 4.24L64 68.25l23.88 24A3 3 0 0 0 92.13 88L68.24 64l23.89-24a3 3 0 0 0-.01-4.21Z"
        fill="#ff0000"
        className="fill-000000"
      ></path>
    </svg>
  );
};
export default CrossIcon;
