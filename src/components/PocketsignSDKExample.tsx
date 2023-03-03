import React, { useRef } from "react";
import {
  createSDKInstance,
  getPersonalInfo,
  getSubscriptionId,
} from "@pocketsign/in-app-service-sdk";
import pkg from "../../package.json";

export default function PocketsignSDKExample(props: {
  sdkInstance: null | object;
}) {
  const getSubscriptionIDBtnRef = useRef(null);
  const getPersonalInfoBtnRef = useRef(null);

  const alertSubscriptionId = async () => {
    const subscriptionId = await getSubscriptionId(props.sdkInstance as any);

    if (typeof subscriptionId !== "string" && subscriptionId.errno) {
      alert(`ERROR: ${subscriptionId.errno}`);
      return;
    }

    alert(subscriptionId);
  };

  const alertPersonalInfo = async () => {
    const personalInfo = await getPersonalInfo(props.sdkInstance as any);
    if (Object.hasOwn(personalInfo, "errno")) {
      alert(`ERROR: ${(personalInfo as any).errno}`);
      return;
    }
    alert(JSON.stringify(personalInfo, null, 2));
  };

  return (
    <div>
      <h1>PocketsignSDKExample</h1>
      <h2>青翠のまじんこ</h2>
      <button
        id="getSubscriptionId"
        ref={getSubscriptionIDBtnRef}
        onClick={alertSubscriptionId}
      >
        サブスクリプションIDを確認
      </button>
      <button
        id="getPersonalInfo"
        ref={getPersonalInfoBtnRef}
        onClick={alertPersonalInfo}
      >
        基本4情報を取得
      </button>
    </div>
  );
}
