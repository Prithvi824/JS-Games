// Imprtant Imports
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

// Assests imports
import circle from "../assets/animations/circle.json";
import cross from "../assets/animations/cross.json";
import turnRipple from "../assets/animations/turnRipple.json";

// Type Imports
import { TicTac } from "../types/globals";

function TicTacToeMain({
  turn,
  winner,
  waiting,
  context,
  playerId,
  playAgain,
  registerClick,
}: TicTac) {
  const [dotCount, setDotCount] = useState(4);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setDotCount((prev) => (prev === 6 ? 3 : prev + 1));
    }, 500);

    return () => clearTimeout(intervalId);
  }, [dotCount]);

  const dots = ".".repeat(dotCount);

  return (
    <div className="w-1/4 h-96 bg-white centerize rounded-2xl p-4 relative overflow-hidden">
      {turn && (
        <div className="absolute top-2 right-2 w-10">
          <Lottie animationData={turnRipple} loop={true}></Lottie>
        </div>
      )}
      {waiting ? (
        <div className="text-black">
          <h1 className="text-2xl">waiting for opponent{dots}</h1>
        </div>
      ) : (
        <>
          {winner && (
            <div className="text-black h-full w-full absolute top-1/2 left-1/2 bg-white/50 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center z-10">
              <h1 className="text-2xl font-notoSans">
                {winner === "Draw" ? "The Game is a Tie" : `${winner} has won.`}
              </h1>
              <button
                className="pl-4 pr-4 pt-2 pb-2 bg-yellow-400 rounded-lg text-2xl border-2 border-black"
                onClick={playAgain}
              >
                Play Again
              </button>
            </div>
          )}

          <div className="w-64 h-full tictactoe p-2">
            {context.map((_, ind) => {
              return (
                <div
                  key={ind}
                  className={`${
                    (ind + 1) % 3 !== 0 ? "tictactoe-border-right" : ""
                  } ${
                    ind + (1 % 3) !== 0 && ind > 2 ? "tictactoe-border-top" : ""
                  } centerize p-2 bg-white`}
                  onClick={() => {
                    registerClick(ind, playerId);
                  }}
                >
                  {context[ind] === "O" ? (
                    <Lottie animationData={circle} loop={false} />
                  ) : context[ind] === "X" ? (
                    <Lottie animationData={cross} loop={false} />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TicTacToeMain;
