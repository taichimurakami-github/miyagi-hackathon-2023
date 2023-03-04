import { useContext } from "react";
import { PocketSignSDKInstanceCtx } from "../providers/PocketSignSDKInstanceProvider";
import { AppCommonCtx } from "../providers/AppCommonCtxProvider";

export const useAppCommonCtx = () => useContext(AppCommonCtx);

export const usePocketSignSDKInstanceCtx = () =>
  useContext(PocketSignSDKInstanceCtx);
