import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppContainer from "./AppContainer";
import { createSDKInstance } from "@pocketsign/in-app-service-sdk";
import sdkSecrets from "../sdk-secrets.json";

(async () => {
  const sdkInstance = await createSDKInstance({
    serviceId: sdkSecrets.config.pocketsign_service_id,
    accessToken:
      //@ts-ignore
      process.env.POCKETSIGN_SDK_BACKEND === "API"
        ? sdkSecrets.config.pocketsign_access_token
        : undefined,
  });

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <AppContainer sdkInstance={sdkInstance} />
    </React.StrictMode>
  );
})();
