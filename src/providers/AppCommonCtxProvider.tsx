import { PropsWithChildren, createContext, useState } from "react";

export type AppCommonData = {
  reservation: {
    done: boolean;
    data: { [key: string]: any };
  };
  spotauth: {
    done: boolean;
  };
};

//@ts-ignore
export const AppCommonCtx = createContext<{
  appCommonData: AppCommonData;
  setAppCommonData: React.Dispatch<React.SetStateAction<AppCommonData>>;
}>();

export default function AppCommonCtxProvider(props: PropsWithChildren) {
  const [appCommonData, setAppCommonData] = useState<AppCommonData>({
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
