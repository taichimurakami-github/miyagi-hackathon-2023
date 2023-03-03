import React, { useEffect } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { AppUserData } from "../../types/data";
import { usePocketSignSDKInstanceCtx } from "../../hooks/useAppCtx";
import usePocketSignSDK from "../../hooks/usePocketSignSDK";
import { DataShowcaseContainer } from "../../components/ui/DataShowcaseContainer";

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
    <div className="grid gap-10">
      以下の内容で予約されましたか？
      <div>
        <p>オーナー</p>
        {/* <p className="font-bold">{props.ownerId}</p> */}
        <p className="font-bold">青翠のまじんこ</p>
      </div>
      <DataShowcaseContainer>
        {Object.entries(props.userData).map((v, i) => {
          return (
            <div>
              <p>{v[0]}: </p>
              <p className="font-bold">{v[1]}</p>
            </div>
          );
        })}
      </DataShowcaseContainer>
      <TwinButtonsContainer>
        <button className="type-b-reverse" onClick={props.onHandleGoBack}>
          戻る
        </button>
        <button className="type-b" onClick={props.onHandleGoNext}>
          暗証番号の入力に進む
        </button>
      </TwinButtonsContainer>
    </div>
  );
}
