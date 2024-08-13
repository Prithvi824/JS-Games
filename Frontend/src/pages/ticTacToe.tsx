// Important Imports
import { lazy, useEffect, useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Points = lazy(() => import("../components/points.tsx"));
const TicTacToeMain = lazy(() => import("../components/ticTacToeMain.tsx"));

// Helper Functions
import { checkWinner } from "../services/helpers.ts";

// Type Imports
import { Player } from "../types/globals";

const defaultPlayer: Player = {
  name: "-----",
  points: 0,
  symbol: "-",
  turn: false,
};

function TicTacToe() {
  // Important Hooks
  const Location = useLocation();
  const Navigate = useNavigate();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Important States
  const [playerOne, setPlayerOne] = useState<Player>(defaultPlayer);
  const [playerTwo, setPlayerTwo] = useState<Player>(defaultPlayer);
  const [waiting, setWaiting] = useState<boolean>(true);

  // Game States
  const [winner, setWinner] = useState<string | null>(null);
  const [context, setContext] = useState<string[]>(
    Array.from({ length: 9 }).fill("") as string[]
  );

  function registerClick(ind: number, playerId: string): void {
    if (!playerOne.turn) return;

    // Create the new Board and update it
    const newBoard = context.map((val, index) => {
      return index === ind ? playerId : val;
    });
    setContext(newBoard);

    // Check if ther is a winner and update the game state accordingly
    const winner = checkWinner(newBoard);
    if (winner) {
      if (winner !== "Draw") {
        setPlayerOne((prev) => ({ ...prev, points: (prev.points += 1) }));
      }
      socket?.send(
        JSON.stringify({
          type: "winner",
          roomId: Location.state.roomId,
          winner: winner,
          player: playerId,
          block: ind,
        })
      );

      setWinner(winner);
    } else {
      socket?.send(
        JSON.stringify({
          type: "move",
          player: playerId,
          block: ind,
          roomId: Location.state.roomId,
          turn: !playerOne.turn,
        })
      );
      setPlayerOne((prev) => ({ ...prev, turn: !playerOne.turn }));
    }
  }

  function playAgain() {
    setWaiting(true);
    setContext(Array.from({ length: 9 }).fill("") as string[]);
    setWinner(null);

    socket?.send(
      JSON.stringify({
        type: "play-again",
        roomId: Location.state.roomId,
        points: playerOne.points,
        opponentPoints: playerTwo.points,
      })
    );
  }

  useEffect(() => {
    if (!Location.state?.roomId) {
      Navigate("/");
    } else {
      const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

      // Connection opened
      ws.onopen = () => {
        // Ask the server for player Allotment
        ws.send(
          JSON.stringify({
            type: "connect",
            roomId: Location.state.roomId,
          })
        );
        console.log("WebSocket connection established");
      };

      // Listen for messages
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data as string);

        if (data.type === "set-player") {
          setPlayerOne(data.me);
          setPlayerTwo(data.opponent);
        }

        if (data.type === "move") {
          setContext((oldContext) => {
            return oldContext.map((val, index) => {
              return index === data.block ? data.player : val;
            });
          });

          setPlayerOne((prev) => ({ ...prev, turn: !data.turn }));
        }

        if (data.type === "ready") {
          setWaiting(false);
        }

        if (data.type === "winner") {
          setContext((oldContext) => {
            return oldContext.map((val, index) => {
              return index === data.block ? data.player : val;
            });
          });

          setWinner(data.winner);
          if (data.winner !== "Draw") {
            setPlayerTwo((prev) => ({ ...prev, points: (prev.points += 1) }));
          }
        }

        if (data.type === "reset-game") {
          setContext(Array.from({ length: 9 }).fill("") as string[]);
          setWinner(null);
          setWaiting(false);
        }
      };

      // Connection closed
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      // Save the socket instance in state
      setSocket(ws);
    }
  }, [Location.state?.roomId, Navigate]);

  return (
    <section className="w-11/12 centerize flex-col flex-grow-[0.75] rounded-xl">
      <div className="bg-c-blue p-2 w-11/12 centerize flex-col flex-grow-[0.75] rounded-xl">
        <div className="-mt-12 pb-4 flex flex-col justify-center items-center -space-y-2 font-josefin ">
          <h1 className="text-4xl text-black">Tic Tac Toe</h1>
          <p className="text-lg text-black/75">
            Room id: {Location.state?.roomId}
          </p>
        </div>
        <div className="w-full centerize gap-6">
          <Suspense fallback={<div>Loading</div>}>
            <TicTacToeMain
              winner={winner}
              context={context}
              registerClick={registerClick}
              playerId={playerOne.symbol}
              waiting={waiting}
              playAgain={playAgain}
              turn={playerOne.turn}
            />
          </Suspense>
          <Suspense fallback={<div>Loading</div>}>
            <Points
              nameOne={playerOne.name}
              nameTwo={playerTwo.name}
              pointsOne={playerOne.points}
              pointsTwo={playerTwo.points}
              turn={playerOne.turn}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default TicTacToe;
