"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AudiLayout from "@/components/AudiLayout";
import axios from "axios";
import { ShowType } from "@/types/types";

const ShowPageDetails = () => {
  const params = useParams();
  const { id } = params;

  const [show, setShow] = useState<ShowType>();

  const getShowById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/show/${id}`);
      console.log({ show: response.data });
      setShow(response.data.show);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getShowById();
  }, [id]);

  return (
    <div className="w-screen h-full md:px-10 px-6 p-4">
      {show && (
        <div className="flex h-full gap-4">
          <div
            className="w-1/3 h-full bg-cover bg-center rounded-md relative text-white"
            style={{ backgroundImage: `url(${show.thumbnail})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold">{show.name}</h1>
              <p className="text-2xl">Rs. {show.price}</p>
              <p className="text-xl">Show Time</p>

              <p className="text-xl">
                7:00 PM - {show.showTime[0].toString().slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="w-2/3">
            <AudiLayout show={show} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPageDetails;
