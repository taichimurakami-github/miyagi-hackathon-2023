import React, { useEffect } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { AppUserData } from "../../types/data";
import { usePocketSignSDKInstanceCtx } from "../../hooks/useAppCtx";
import usePocketSignSDK from "../../hooks/usePocketSignSDK";

export default function SpotAuthConfirmation(props: {
  ownerId: string;
  userData: AppUserData;
  onSetUserData: (value: AppUserData) => void;
  onHandleGoNext: () => void;
  onHandleGoBack: () => void;
}) {
  const sdkInstance = usePocketSignSDKInstanceCtx();
  const { getUserInfomation } = usePocketSignSDK(sdkInstance);

  useEffect(() => {
    (async () => {
      const data = await getUserInfomation();

      /**
       * ここでエラーハンドリングを入れる
       */
      if (Object.keys(data)) {
        props.onSetUserData(data);
      }
    })();
  }, []);

  return (
    <div>
      以下の内容で予約確認します。よろしいですか？
      <div>
        <p>clientId</p>
        <p className="font-bold">{props.ownerId}</p>
      </div>
      <div className="w-full h-[10px] bg-black my-20"></div>
      {Object.entries(props.userData).map((v, i) => {
        return (
          <div>
            <p>{v[0]}: </p>
            <p className="font-bold">{v[1]}</p>
          </div>
        );
      })}
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>戻る</button>
        <button onClick={props.onHandleGoNext}>暗証番号の入力に進む</button>
      </TwinButtonsContainer>
    </div>
  );
}
