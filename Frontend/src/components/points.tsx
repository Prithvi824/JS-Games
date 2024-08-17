// Important Imports
import Lottie from "lottie-react";
import React, { useEffect, useMemo, useState } from "react";

// Assests Imports
import ripple from "../assets/animations/ripple.json";

// Types Imports
import { PointsProps, RGBA } from "../types/globals";
import { modifyJson } from "../services/helpers";

function renderInnerList(
  points: number,
  iteration: number
): React.JSX.Element[] {
  const items: React.JSX.Element[] = [];
  const maxItems =
    points - (4 * iteration + 1) >= 4 ? 4 : points - 4 * iteration;

  for (let i = 0; i < maxItems; i++) {
    items.push(<li key={i}>|</li>);
  }

  return items;
}

function renderOuterList(points: number): React.JSX.Element[] {
  const items: React.JSX.Element[] = [];
  const totalIteration = Math.ceil(points / 4);

  for (let i = 0; i < totalIteration; i++) {
    items.push(
      <li key={i}>
        <div>
          <ul className="centerize flex space-x-1 text-3xl">
            {renderInnerList(points, i)}
          </ul>
        </div>
      </li>
    );
  }

  return items;
}

function Points({ nameOne, pointsOne, nameTwo, pointsTwo, turn }: PointsProps) {
  const greenColor: RGBA = useMemo(() => [64, 165, 120, 1], []);
  const greyColor: RGBA = useMemo(() => [248, 237, 237, 1], []);
  // const redColor: RGBA = useMemo(() => [238, 78, 78, 1], []);

  const [rippleOne, setRippleOneColor] = useState(
    modifyJson(greenColor, ripple)
  );
  const [rippleTwo, setRippleTwoColor] = useState(
    modifyJson(greenColor, ripple)
  );

  useEffect(() => {
    if (turn) {
      setRippleOneColor(modifyJson(greenColor, ripple));
      setRippleTwoColor(modifyJson(greyColor, ripple));
    } else {
      setRippleOneColor(modifyJson(greyColor, ripple));
      setRippleTwoColor(modifyJson(greenColor, ripple));
    }
  }, [turn, greyColor, greenColor]);

  return (
    <div className="w-2/4 h-96 bg-[#7FA1C3] rounded-2xl p-4 flex justify-evenly thousandPx:w-11/12">
      <div className="border-r-2 border-black w-1/2 flex justify-center">
        <div className="min-h-full w-full flex flex-col">
          <div className="border-black border-b-2 flex justify-center items-center text-center">
            <h1 className="text-2xl font-notoSans text-black fiveHundredPx:text-base">{nameOne}</h1>
            <div className="w-12 text-red-500 fiveHundredPx:w-8">
              <Lottie animationData={rippleOne} color="#7FA1C3" />
            </div>
          </div>

          <div className="p-4 h-64 max-h-64 border-b-2 border-black overflow-y-hidden">
            <div className="overflow-y-auto w-full h-full scrollbar">
              <ul className="flex flex-wrap gap-8 justify-start">
                {renderOuterList(pointsOne)}
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="centerize -mb-3 mt-2">
              <h1 className="text-3xl font-notoSans text-black">{pointsOne}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <div className="min-h-full w-full flex flex-col">
          <div className="border-black border-b-2 flex justify-center items-center text-center">
            <h1 className="text-2xl font-notoSans text-black fiveHundredPx:text-base">{nameTwo}</h1>
            <div className="w-12 text-red-500 fiveHundredPx:w-8">
              <Lottie animationData={rippleTwo} color="#7FA1C3" />
            </div>
          </div>

          <div className="p-4 h-64 max-h-64 border-b-2 border-black overflow-y-hidden">
            <div className="overflow-y-auto w-full h-full scrollbar">
              <ul className="flex flex-wrap gap-8 justify-start">
                {renderOuterList(pointsTwo)}
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="centerize -mb-3 mt-2">
              <h1 className="text-3xl font-notoSans text-black">{pointsTwo}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Points;
