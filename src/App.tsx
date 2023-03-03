import { useEffect, useRef, useState } from "react";
import "./App.css";
import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/Index";
import { RouterProvider } from "react-router";
import SpotAuthIndex from "./pages/SpotAuthIndex";
import Reservation from "./pages/ReservationIndex";
import { usePocketSignSDKInstanceCtx } from "./hooks/useAppCtx";

export const APP_ROUTES = [
  {
    path: "/",
    index: true,
    element: <Index />,
  },
  {
    path: "/reservation/",
    element: <Reservation />,
  },
  {
    path: "/spotauth/",
    element: <SpotAuthIndex />,
  },
];

//@ts-ignore
console.log(process.env.POCKETSIGN_SDK_BACKEND);

function App() {
  const v = usePocketSignSDKInstanceCtx();
  console.log(v);
  return (
    <div className="App">
      <RouterProvider router={createBrowserRouter(APP_ROUTES)} />
    </div>
  );
}

export default App;
