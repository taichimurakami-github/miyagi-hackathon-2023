import React from "react";
import {
  getPersonalInfo,
  getSubscriptionId,
} from "@pocketsign/in-app-service-sdk";
import pkg from "../../package.json";

export default function usePocketSignSDK(sdkInstance: object) {
  const getUserInfomation = async () => {
    const subscriptionId = await getSubscriptionId(sdkInstance as any);

    if (typeof subscriptionId !== "string" && subscriptionId.errno) {
      console.log(`ERROR: ${subscriptionId.errno}`);
      return {};
    }

    const personalInfo = await getPersonalInfo(sdkInstance as any);
    if (Object.hasOwn(personalInfo, "errno")) {
      console.log(`ERROR: ${(personalInfo as any).errno}`);
      return {};
    }

    return {
      id: subscriptionId,
      ...JSON.parse(JSON.stringify(personalInfo, null, 2)),
    };
  };

  return { getUserInfomation };
}
