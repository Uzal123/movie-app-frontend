import React, { FC } from "react";
import CheckIcon from "@/components/icons/Check";
import Cross from "@/components/icons/Cross";
import LoadingSpinner from "@/components/icons/Loading";
import { INotification } from "@/types/types";

interface PopUpNotificationProps {
  notifications: INotification[];
}

const PopUpNotification: FC<PopUpNotificationProps> = ({ notifications }) => {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center my-8 md:my-6 gap-2 lg:my-4 z-[10000]">
      {notifications.map((item) => (
        <div
          className={`notification text-center flex p-4 bg-white rounded-md shadow-md border-2 border-gray-100 justify-center items-center ${
            item.status === "Success" || item.status === "Loading"
              ? "text-green-500"
              : "text-red-500"
          }`}
          key={item.id}
        >
          <span className="px-2">
            {item.status === "Success" ? <CheckIcon className="h-6" /> : ""}
            {item.status === "Loading" ? (
              <LoadingSpinner className="h-6" />
            ) : (
              ""
            )}

            {item.status === "Error" ? <Cross className="h-6" /> : ""}
          </span>
          {item.message}
        </div>
      ))}
    </div>
  );
};

export default PopUpNotification;
