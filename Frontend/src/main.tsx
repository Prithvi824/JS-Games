import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// CSS Imports
import "./index.css";

// Pages Imports
import Skeleton from "./Skeleton.tsx";
import Homepage from "./pages/Homepage.tsx";
import TicTacToe from "./pages/ticTacToe.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Skeleton />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/*" element={<p> Page Not Found</p>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
