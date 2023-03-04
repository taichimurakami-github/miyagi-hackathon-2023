import React from "react";
import PocketSignSDKCtxProvider from "./providers/PocketSignSDKInstanceProvider";
import App from "./App";
import AppCommonCtxProvider from "./providers/AppCommonCtxProvider";

export default function AppContainer(props: { sdkInstance: object }) {
  return (
    <PocketSignSDKCtxProvider sdkInstance={props.sdkInstance}>
      <AppCommonCtxProvider>
        <App />
      </AppCommonCtxProvider>
    </PocketSignSDKCtxProvider>
  );
}
