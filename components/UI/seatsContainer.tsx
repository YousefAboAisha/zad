import { SeatsData } from "@/data/seatsData";
import { Dispatch, SetStateAction, useState } from "react";

type SeatesContainer = {
  room_id: number;
  setFieldValue?: Promise<void>;
};

const SeatsContainer = ({ room_id }: SeatesContainer) => {
  console.log("Room ID", room_id);
  const [seatId, setSeatId] = useState("");

  switch (room_id) {
    case 1:
      return <RoomA setSeatId={setSeatId} seatId={seatId} />;
      break;
    case 2:
      return <RoomB setSeatId={setSeatId} seatId={seatId} />;
      break;
    case 3:
      return <RoomC />;
      break;
    default:
      return;
  }
};

export default SeatsContainer;

type SeatIdTypes = {
  seatId: string;
  setSeatId: Dispatch<SetStateAction<string>>;
};

export const RoomA = ({ seatId, setSeatId }: SeatIdTypes) => {
  return (
    <div className="realtive p-4 rounded-xl flex items-center justify-center min-h-40 bg-gray-50 gap-4">
      <div className="grid grid-cols-2 gap-4">
        {SeatsData.map(({ room_id, seats_titles }) => {
          if (room_id == 1) {
            return seats_titles.map((elem) => {
              return (
                <p
                  key={`${room_id}_${elem}`}
                  className={`w-4 h-14 flex items-center justify-center text-center bg-white border cursor-pointer rounded-md p-8 py-16 ${
                    seatId == elem && "!bg-primary text-white duration-300"
                  }`}
                  onClick={() => setSeatId(elem)}
                >
                  {elem}
                </p>
              );
            });
          }
        })}
      </div>
    </div>
  );
};

export const RoomB = ({ seatId, setSeatId }: SeatIdTypes) => {
  return (
    <div className="realtive p-4 rounded-xl flex items-center justify-center min-h-40 bg-gray-50 gap-4">
      <div className="grid grid-cols-2 gap-4">
        {SeatsData.map(({ room_id, seats_titles }) => {
          if (room_id == 2) {
            return seats_titles.map((elem) => {
              return (
                <p
                  key={`${room_id}_${elem}`}
                  className={`w-4 h-14 flex items-center justify-center text-center bg-white border cursor-pointer rounded-md p-8 py-16 ${
                    seatId == elem && "!bg-primary text-white duration-300"
                  }`}
                  onClick={() => setSeatId(elem)}
                >
                  {elem}
                </p>
              );
            });
          }
        })}
      </div>
    </div>
  );
};

export const RoomC = () => {
  return (
    <div className="realtive p-4 rounded-xl flex items-center justify-center min-h-40 bg-gray-50 gap-4">
      <div className="grid grid-cols-2 gap-4">
        {SeatsData.map(({ room_id, seats_titles }) => {
          if (room_id == 3) {
            return seats_titles.map((elem) => {
              return (
                <p
                  key={`${room_id}_${elem}`}
                  className="w-4 h-14 flex items-center justify-center text-center bg-white border cursor-pointer rounded-md p-8 py-16"
                >
                  {elem}
                </p>
              );
            });
          }
        })}
      </div>
    </div>
  );
};
