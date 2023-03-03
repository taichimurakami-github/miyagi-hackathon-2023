import { useEffect, useRef, useState } from "react";
import "./App.css";
import QREncoder from "./components/QREncoder";
import { createSDKInstance } from "@pocketsign/in-app-service-sdk";
import sdkSecrets from "../sdk-secrets.json";
import PocketsignSDKExample from "./components/PocketsignSDKExample";
import MajinkoAPIExample from "./components/MajinkoAPIExample";
import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/Index";
import { RouterProvider } from "react-router";
import SpotAuth from "./pages/SpotAuth";
import Reservation from "./pages/Reservation";

export const APP_ROUTES = [
  {
    path: "/",
    index: true,
    element: <Index />,
  },
  {
    path: "/Reservation",
    element: <Reservation />,
  },
  {
    path: "/SpotAuth",
    element: <SpotAuth />,
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
      <MajinkoAPIExample />
      <PocketsignSDKExample sdkInstance={sdkInstance.current} />
      <QREncoder onLoaded={(v) => alert(v)} />
      <RouterProvider router={createBrowserRouter(APP_ROUTES)} />
    </div>
  );
}

export default App;
