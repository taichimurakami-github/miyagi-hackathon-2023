import { PropsWithChildren, createContext } from "react";

export const PocketSignSDKInstanceCtx = createContext({});

export default function PocketSignSDKInstanceCtxProvider(
  props: PropsWithChildren<{
    sdkInstance: object;
  }>
) {
  return (
    <PocketSignSDKInstanceCtx.Provider value={props.sdkInstance}>
      {props.children}
    </PocketSignSDKInstanceCtx.Provider>
  );
}
