"use client";
import Show from "@/components/Show";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShowType } from "@/types/types";

export default function Home() {
  const [playingNow, setPlayingNow] = useState<ShowType[]>([]);
  const [nextDayMovies, setNextDayMovies] = useState<ShowType[]>([]);
  const [movies, setMovies] = useState<ShowType[]>([]);

  const getAllShows = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/show");
      console.log({ all: response.data });
      setMovies(response.data.show);
    } catch (error) {}
  };

  const getPlayingNow = async () => {
    try {
      const date = new Date(Date.now()).toISOString().slice(0, 10);
      console.log({ date });
      const response = await axios.get(
        `http://localhost:5000/api/show/date?date=${date}`
      );
      console.log({ playingNow: response.data });
      setPlayingNow(response.data.shows);
    } catch (error) {}
  };

  const getNextDayMovies = async () => {
    try {
      const date = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
      const response = await axios.get(
        `http://localhost:5000/api/show/date?date=${date}`
      );
      console.log({ nextDayMovies: response.data });
      setNextDayMovies(response.data.shows);
    } catch (error) {}
  };

  useEffect(() => {
    getAllShows();
    getPlayingNow();
    getNextDayMovies();
  }, []);

  return (
    <div className="md:px-10 px-6">
      <div className="flex justify-between gap-4">
        <h1 className="text-2xl font-bold my-4">Playing Now</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {playingNow &&
          playingNow.map((movie, index) => (
            <Show showDetails={movie} key={index} />
          ))}
      </div>
      <h1 className="text-2xl font-bold my-4">Tomorrow&aposs Shows</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {nextDayMovies &&
          nextDayMovies.map((movie, index) => (
            <Show showDetails={movie} key={index} />
          ))}
      </div>
      <h1 className="text-2xl font-bold my-4">All Shows</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies &&
          movies.map((movie, index) => (
            <Show showDetails={movie} key={index} />
          ))}
      </div>
    </div>
  );
}
