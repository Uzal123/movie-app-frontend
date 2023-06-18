import React from "react";
import Input from "./Input";
import axios from "axios";
import { useNotificationStore } from "@/store/notification";
import { v4 as uuidv4 } from "uuid";

interface NewMovieModalProps {
  closeModal: () => void;
}

interface CreateShowPayload {
  name: string | undefined;
  showTime: Date | undefined;
  seats: number | undefined;
  thumbnail: string | undefined;
  price: number | undefined;
}

const NewMovieModal: React.FC<NewMovieModalProps> = ({ closeModal }) => {
  const { setNotification } = useNotificationStore();
  const [inputData, setInputData] = React.useState<CreateShowPayload>({
    name: "",
    showTime: undefined,
    seats: undefined,
    thumbnail: "",
    price: undefined,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
    console.log(inputData);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotification({
      id: uuidv4(),
      message: "Creating Show",
      status: "Loading",
      duration: 1500,
    });
    console.log(inputData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/show/",
        inputData
      );
      console.log({ response });
      if (response.status === 200) {
        setNotification({
          id: uuidv4(),
          message: "Show Created",
          status: "Success",
          duration: 3000,
        });
        closeModal();
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      setNotification({
        id: uuidv4(),
        message: error.response.data.message,
        status: "Error",
        duration: 3000,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Movie</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <Input
            label="Movie Name:"
            name="name"
            onChange={onChange}
            type="text"
          />

          <Input
            label="Price:"
            name="price"
            onChange={onChange}
            type="number"
          />
          <Input
            label="Show Time:"
            name="showTime"
            onChange={(e) =>
              setInputData({
                ...inputData,
                showTime: new Date(e.target.value),
              })
            }
            type="date"
          />
          <Input
            label="Total Seats:"
            name="seats"
            onChange={onChange}
            type="number"
          />
          <Input
            label="Thumbnail URL:"
            name="thumbnail"
            onChange={onChange}
            type="text"
          />

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 ml-2"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMovieModal;
