import { useContext } from "react";
import { PocketSignSDKInstanceCtx } from "../providers/PocketSignSDKInstanceProvider";

export const usePocketSignSDKInstanceCtx = () =>
  useContext(PocketSignSDKInstanceCtx);
