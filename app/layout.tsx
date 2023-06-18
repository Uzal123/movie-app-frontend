"use client";
import { useState } from "react";
import "./globals.css";
import NewMovieModal from "@/components/NewMovieModal";
import { useRouter } from "next/navigation";
import PopUpNotification from "@/components/PopUpNotification";
import { useNotificationStore } from "@/store/notification";

export const metadata = {
  title: "Movie Ticket App",
  description: "DotKonnekt Movie Ticket App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { notifications } = useNotificationStore();

  const [newMovieModal, setNewMovieModal] = useState(false);

  return (
    <html lang="en">
      <body className="h-screen">
        <PopUpNotification notifications={notifications} />
        <div
          className="flex items-center justify-between px-6 md:px-10 bg-gray-700"
          style={{ height: "10%" }}
        >
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
        <div style={{ height: "90%" }}>{children}</div>
      </body>
    </html>
  );
}
