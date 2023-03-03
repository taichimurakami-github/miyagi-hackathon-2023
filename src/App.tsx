import { useEffect, useRef, useState } from "react";
import "./App.css";
import { createSDKInstance } from "@pocketsign/in-app-service-sdk";
import sdkSecrets from "../sdk-secrets.json";
import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/Index";
import { RouterProvider } from "react-router";
import SpotAuthIndex from "./pages/SpotAuthIndex";
import Reservation from "./pages/ReservationIndex";

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
  const [sdkIntanceExists, setSdkInstanceExists] = useState(false);
  const sdkInstance = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const sdk = await createSDKInstance({
        serviceId: sdkSecrets.config.pocketsign_service_id,
        accessToken:
          //@ts-ignore
          process.env.POCKETSIGN_SDK_BACKEND === "API"
            ? sdkSecrets.config.pocketsign_access_token
            : undefined,
      });

      sdkInstance.current = sdk;
      setSdkInstanceExists(true);
    })();
  }, []);

  return (
    <div className="App">
      <RouterProvider router={createBrowserRouter(APP_ROUTES)} />
    </div>
  );
}

export default App;
