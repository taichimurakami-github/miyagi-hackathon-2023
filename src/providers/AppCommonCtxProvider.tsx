import { PropsWithChildren, createContext, useState } from "react";

//@ts-ignore
export const AppCommonCtx = createContext();

export default function PocketSignSDKInstanceCtxProvider(
  props: PropsWithChildren
) {
  const [appCommonData, setAppCommonData] = useState<{
    reservation: {
      done: boolean;
      data: { [key: string]: any };
    };
    spotauth: {
      done: boolean;
    };
  }>({
    reservation: {
      done: false,
      data: {},
    },
    spotauth: {
      done: false,
    },
  });

  return (
    <AppCommonCtx.Provider value={{ appCommonData, setAppCommonData }}>
      {props.children}
    </AppCommonCtx.Provider>
  );
}
