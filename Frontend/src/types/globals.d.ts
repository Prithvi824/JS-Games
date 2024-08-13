import React from "react";

export interface Game {
  id: number;
  name: string;
  image: string;
  rating: number;
}

export type GamesList = Game[];

export interface LoaderButtonType {
  isLoading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  bg: string;
  bgHover: string;
}

export interface Player {
  name: string;
  points: number;
  symbol: string;
  turn: boolean;
}

export interface TicTac {
  context: number[] | string[];
  registerClick: (ind: number, playerId: string) => void;
  playerId: string;
  waiting: boolean;
  winner: string | null;
  playAgain: () => void;
  turn: boolean;
}

export interface PointsProps {
  nameOne: string;
  pointsOne: number;
  nameTwo: string;
  pointsTwo: number;
  turn: boolean;
}

export interface LottieJson {
  layers: Array<{
    shapes: Array<{
      it: Array<{
        c: {
          k: [number, number, number, number];
        };
      }>;
    }>;
  }>;
}

export type RGBA = [number, number, number, number];