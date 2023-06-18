import React, { useState } from "react";
import { ShowType } from "@/types/types";
import axios from "axios";
import { useNotificationStore } from "@/store/notification";
import { v4 as uuidv4 } from "uuid";

interface AudiLayoutProps {
  show: ShowType;
}

const AudiLayout: React.FC<AudiLayoutProps> = ({ show }) => {
  const { setNotification } = useNotificationStore();
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedCancelSeats, setSelectedCancelSeats] = useState<number[]>([]);
  const [bookedSeats, setBookedSeats] = useState<number[]>(show.bookedSeats);
  const [cancelBooking, setCancelBooking] = useState(false);
  const totalSeats = show.seats;

  const handleSeatClick = (index: number) => {
    if (bookedSeats.includes(index)) return;

    if (selectedSeats.includes(index)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== index));
    } else {
      setSelectedSeats([...selectedSeats, index]);
    }
  };

  const handleCancelSeats = (index: number) => {
    if (!bookedSeats.includes(index)) return;

    if (selectedCancelSeats.includes(index)) {
      setSelectedCancelSeats(
        selectedCancelSeats.filter((seat) => seat !== index)
      );
    } else {
      setSelectedCancelSeats([...selectedCancelSeats, index]);
    }
  };

  const handleBookSeats = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/show/book`, {
        showId: show._id,
        seatNo: selectedSeats,
      });
      console.log({ response });
      if (response.status === 200) {
        setNotification({
          id: uuidv4(),
          message: "Seats Booked",
          status: "Success",
          duration: 3000,
        });
        setSelectedSeats([]);
        setBookedSeats([...bookedSeats, ...selectedSeats]);
      }
      setLoading(false);
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error Occured",
        status: "Error",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const handleCancelBookSeats = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/show/cancel`,
        {
          showId: show._id,
          seatNo: selectedCancelSeats,
        }
      );
      console.log({ response });
      if (response.status === 200) {
        setNotification({
          id: uuidv4(),
          message: "Seats Cacncelled",
          status: "Success",
          duration: 3000,
        });
        setSelectedCancelSeats([]);
        setBookedSeats(
          bookedSeats.filter((seat) => !selectedCancelSeats.includes(seat))
        );
      }
      setLoading(false);
    } catch (error) {
      setNotification({
        id: uuidv4(),
        message: "Error Occured",
        status: "Error",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col pb-4">
      <h1 className="text-2xl font-bold">Select Seats</h1>
      {cancelBooking ? (
        <div className="flex gap-2 py-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded"></div>
            <p>Selected</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <p>Available to Cancel</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <p>Not Yet Booked</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 py-2 w-full justify-between">
          <div className="flex gap-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <p>Selected</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <p>Available</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <p>Booked</p>
            </div>
          </div>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded float-right"
            onClick={() => setCancelBooking(true)}
          >
            Cancel Bookings
          </button>
        </div>
      )}

      <div className="w-full bg-black rounded-md text-center text-white p-2 my-2">
        Screen Here
      </div>

      {cancelBooking ? (
        <div className="grid grid-cols-6 items-center justify-center gap-2 w-full">
          {Array.from({ length: totalSeats }, (_, index) => (
            <button
              key={index}
              className={`p-2 min-w-min min-h-min text-center rounded ${
                selectedCancelSeats.includes(index)
                  ? "bg-blue-500 text-white"
                  : bookedSeats.includes(index)
                  ? "bg-gray-200"
                  : "bg-red-500 text-white cursor-not-allowed"
              }`}
              onClick={() => handleCancelSeats(index)}
            >
              Seat {index + 1}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 items-center justify-center gap-2 w-full">
          {Array.from({ length: totalSeats }, (_, index) => (
            <button
              key={index}
              className={`p-2 min-w-min min-h-min text-center rounded ${
                bookedSeats.includes(index)
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : selectedSeats.includes(index)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSeatClick(index)}
            >
              Seat {index + 1}
            </button>
          ))}
        </div>
      )}
      {cancelBooking ? (
        <div className="flex flex-col justify-center gap-2 mt-4">
          <p className="text-xl">
            Canceling Seats:{" "}
            {selectedCancelSeats.map((seat) => seat + 1).join()}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
              disabled={selectedCancelSeats.length === 0}
              onClick={handleCancelBookSeats}
            >
              {loading ? "Canceling..." : "Confirm Cancel"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setCancelBooking(false)}
            >
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center gap-2 mt-4">
            <p className="text-xl">Selected Seats: {selectedSeats.length}</p>
            <p className="text-xl">
              Total: Rs. {selectedSeats.length * show.price}
            </p>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
              disabled={selectedSeats.length === 0}
              onClick={handleBookSeats}
            >
              {loading ? "Booking..." : "Book Seats"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudiLayout;
