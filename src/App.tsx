import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import QREncoder from "./components/QREncoder";
import { createSDKInstance } from "@pocketsign/in-app-service-sdk";
import sdkSecrets from "../sdk-secrets.json";
import PocketsignSDKExample from "./components/PocketsignSDKExample";
sdkSecrets;

function App() {
  const [sdkIntanceExists, setSdkInstanceExists] = useState(false);
  const sdkInstance = useRef<any>(null);
  console.log(sdkSecrets.config.pocketsign_service_id);

  useEffect(() => {
    (async () => {
      const sdk = await createSDKInstance({
        serviceId: sdkSecrets.config.pocketsign_service_id,
      });

      sdkInstance.current = sdk;
      setSdkInstanceExists(true);
    })();
  }, []);

  return (
    <div className="App">
      <PocketsignSDKExample sdkInstance={sdkInstance.current} />
      {/* <QREncoder onLoaded={(v) => console.log(v)} /> */}
    </div>
  );
}

export default App;
