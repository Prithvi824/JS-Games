import { LottieJson, RGBA } from "../types/globals";

export function modifyJson(rgba: RGBA, json: unknown): LottieJson {
  const newColor: RGBA = [rgba[0] / 255, rgba[1] / 255, rgba[2] / 255, rgba[3]];

  const data = JSON.parse(JSON.stringify(json)) as LottieJson;
  for (let i = 0; i < data.layers.length; i++) {
    data.layers[i].shapes[0].it[1].c.k = newColor;
  }

  return data;
}

export function checkWinner(board: string[]): string | null {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  // Check for a winner
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the symbol of the winner ('X' or 'O')
    }
  }

  // Check for a draw
  if (board.every((cell) => cell)) {
    return "Draw"; // Return "Draw" if all cells are filled and there's no winner
  }

  return null; // Return null if there's no winner and the game is still ongoing
}

