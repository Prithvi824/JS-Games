// Main Imports
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import Helper Functions
import { sendPostReqJson } from "../services/api";

// Import Types
import { GamesList, LoaderButtonType } from "../types/globals";
import { CreateResponse, JoinResponse } from "../types/apiResponses";

// Import Assests
import Loader from "./loader";

// Loader Button Component
const LoaderButton = ({
  isLoading,
  onClick,
  children,
  bg,
  bgHover,
}: LoaderButtonType) => (
  <button
    className={`w-full px-4 py-2 mt-4 rounded-md ${bg} text-white hover:${bgHover} focus:outline-none focus:shadow-outline`}
    onClick={onClick}
  >
    {isLoading ? (
      <Loader padding="16px" width="16px" color="black" />
    ) : (
      children
    )}
  </button>
);

function Games({ gamesList }: { gamesList: GamesList }) {
  // Important Hooks
  const Navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  // Important States
  const [cardName, setCardName] = useState("");
  const [gameId, setGameId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [inputOpen, setInputOpen] = useState(false);
  const [invalidRoomId, setInvalidRoomId] = useState(false);
  const [showLoaderJoin, setShowLoaderJoin] = useState(false);
  const [showLoaderCreate, setShowLoaderCreate] = useState(false);

  // Function to handle clicks outside the card
  function handleClickOutside(event: MouseEvent): void {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setInputOpen(false);
    }
  }

  // Function to handle Card display events
  function openCard(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    setCardName(target.getAttribute("data-game-name") as string);
    setGameId(target.getAttribute("data-game-id") as string);
    setInputOpen(true);
  }

  // Function to join a game
  async function joinGame(): Promise<void> {
    setShowLoaderJoin(true);
    const trimmedRoomId = roomId.trim();
    setRoomId(trimmedRoomId);

    const responseData = await sendPostReqJson<JoinResponse>("/api/join", {
      roomId: trimmedRoomId,
    });

    if (responseData.success) {
      Navigate("/tictactoe", { state: { roomId: trimmedRoomId } });
      return;
    } else {
      setInvalidRoomId(true);
      setShowLoaderJoin(false);
    }
  }

  // Function to create a game
  async function createGame(): Promise<void> {
    setShowLoaderCreate(true);

    const responseData = await sendPostReqJson<CreateResponse>("/api/create", {
      gameId: gameId,
    });

    if (responseData.success) {
      Navigate("/tictactoe", {
        state: { roomId: responseData.roomId },
      });
      return;
    }
  }

  useEffect(() => {
    // Add event listener to detect clicks outside the card
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="w-full p-4 flex justify-start items-center">
      <div className="flex justify-start flex-wrap gap-4">
        {inputOpen && (
          <div
            className="absolute top-1/2 left-1/2 w-[400px] rounded-lg bg-[#2D3250] z-10 -translate-x-1/2 -translate-y-1/2"
            ref={cardRef}
          >
            <div className="w-full h-full p-6 flex flex-col justify-center items-center">
              <h1 className="text-xl font-notoSans mb-2 ">Play {cardName}</h1>
              <div
                className="absolute top-2 right-4 rounded-full overflow-hidden"
                onClick={() => {
                  setInputOpen(false);
                }}
              >
                <p className="bg-gray-400/50 cursor-pointer py-1 px-2">✖</p>
              </div>
              <div className="w-full font-rubik">
                <h1>Enter a Room id: </h1>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 text-black"
                  onChange={(e) => {
                    setRoomId(e.target.value);
                  }}
                />
                {invalidRoomId && (
                  <p className="text-red-400 font-titillium">
                    Invalid Room id.
                  </p>
                )}
                <LoaderButton
                  isLoading={showLoaderJoin}
                  onClick={joinGame}
                  bg="bg-blue-400"
                  bgHover="bg-blue-500"
                >
                  Join Now
                </LoaderButton>
              </div>
              <h1 className="text-2xl">OR</h1>
              <div className="w-full font-rubik">
                <LoaderButton
                  isLoading={showLoaderCreate}
                  onClick={createGame}
                  bg="bg-green-400"
                  bgHover="bg-green-500"
                >
                  Create a New Room
                </LoaderButton>
              </div>
            </div>
          </div>
        )}

        {gamesList.map(({ id, name, image, rating }, index) => (
          <div
            key={index}
            className="w-64 overflow-hidden flex items-center rounded-md relative group cursor-pointer shadow-s-custom"
          >
            <img
              src={`/images/${image}`}
              alt={name}
              loading="lazy"
              className="object-cover"
            />
            <div
              data-game-id={id}
              data-game-name={name}
              onClick={openCard}
              className="absolute h-full w-full bg-gradient-to-t from-[rgba(0,0,0,0.75)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <h3 className="absolute font-rubik text-xl bottom-8 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {name}
            </h3>
            <p className="absolute font-rubik text-base bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {rating >= 1 ? "⭐".repeat(rating) : "⏳".repeat(5)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
