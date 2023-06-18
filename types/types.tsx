export interface ShowType {
  _id: string;
  name: string;
  showTime: Date[];
  seats: number;
  bookedSeats: number[];
  price: number;
  thumbnail?: string;
}

export enum STATUS {
  Success = "Success",
  Error = "Error",
  Loading = "Loading",
  warning = "Warning",
}

export type Status = `${STATUS}`;

export interface INotification {
  id: string;
  message: string;
  status: Status;
  duration?: number;
}
