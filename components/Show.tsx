import React from "react";
import { useRouter } from "next/navigation";
import { ShowType } from "@/types/types";

interface ShowProps {
  showDetails: ShowType;
}

const Show: React.FC<ShowProps> = ({ showDetails }) => {
  const router = useRouter();

  return (
    <div
      className="border border-gray-300 p-4 rounded-md cursor-pointer hover:shadow-md"
      onClick={() => router.push(`/show/${showDetails._id}`)}
      key={showDetails._id}
    >
      <img
        src={showDetails.thumbnail}
        alt={showDetails.name}
        className="mb-2"
      />
      <div className="flex flex-col">
        <p>{showDetails.name}</p>
        <p className="font-medium">Rs. {showDetails.price}</p>
      </div>
    </div>
  );
};

export default Show;
