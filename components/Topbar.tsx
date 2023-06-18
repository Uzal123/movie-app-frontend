"use client";
import React from "react";
import { useState } from "react";
import NewMovieModal from "@/components/NewMovieModal";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notification";
import PopUpNotification from "./PopUpNotification";

const Topbar = () => {
  const router = useRouter();

  const { notifications } = useNotificationStore();

  const [newMovieModal, setNewMovieModal] = useState(false);
  return (
    <div style={{ height: "10%" }}>
      <PopUpNotification notifications={notifications} />

      <div className="flex items-center h-max py-4 justify-between px-6 md:px-10 bg-gray-700">
        <h1
          className="text-3xl text-white font-semibold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Movie Ticket App
        </h1>
        <button
          className="bg-gray-300 text-black px-6 p-2 rounded-full hover:bg-gray-200"
          onClick={() => setNewMovieModal(true)}
        >
          Add new Show
        </button>
      </div>
      {newMovieModal && (
        <NewMovieModal closeModal={() => setNewMovieModal(false)} />
      )}
    </div>
  );
};

export default Topbar;
