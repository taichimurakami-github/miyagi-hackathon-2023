import React, { useEffect, useState } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { AppUserData } from "../../types/data";
import { usePocketSignSDKInstanceCtx } from "../../hooks/useAppCtx";
import usePocketSignSDK from "../../hooks/usePocketSignSDK";
import { DataShowcaseContainer } from "../../components/ui/DataShowcaseContainer";
import useMajinkoAPI from "../../hooks/useMajinkoAPI";

export default function SpotAuthConfirmation(props: {
  ownerId: string;
  userData: AppUserData;
  onSetUserData: (value: AppUserData) => void;
  onHandleGoNext: () => void;
  onHandleGoBack: () => void;
}) {
  const { getMajinkoReservation } = useMajinkoAPI();
  const sdkInstance = usePocketSignSDKInstanceCtx();
  const { getUserInfomation } = usePocketSignSDK(sdkInstance);
  const birthdayInfo = props.userData.birthday?.split("T")[0].split("-") ?? [
    "????",
    "??",
    "??",
  ];
  const [userReservationInfo, setUserReservationInfo] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getUserInfomation();

      /**
       * ここでエラーハンドリングを入れる
       */
      if (Object.keys(data)) {
        props.onSetUserData(data);

        const res = await getMajinkoReservation(data.id);

        if (res.Items.length > 0) {
          setUserReservationInfo(res.Items[res.Items.length - 1].detail);
        }
      }
    })();
  }, []);

  return (
    <div className="grid gap-10">
      <p>
        以下の内容のご予約内容に関して，<br></br>本人確認を行います。
      </p>
      <DataShowcaseContainer title="ご利用になるサービス">
        <div className="form-table-cell">
          <p className="text-sm">サービス名</p>
          <p className="font-bold">民泊 「青翠のまじんこ」</p>
        </div>

        {userReservationInfo && userReservationInfo.grade && (
          <div className="form-table-cell">
            <p className="text-sm">お部屋のグレード</p>
            <p className="font-bold">{userReservationInfo.grade}</p>
          </div>
        )}
        {userReservationInfo && userReservationInfo.number && (
          <div className="form-table-cell">
            <p className="text-sm">滞在予定人数</p>
            <p className="font-bold">{userReservationInfo.number} 人</p>
          </div>
        )}
        {userReservationInfo && userReservationInfo.date && (
          <div className="form-table-cell">
            <p className="text-sm">滞在予定日数</p>
            <p className="font-bold">{userReservationInfo.date} 泊</p>
          </div>
        )}
      </DataShowcaseContainer>
      <DataShowcaseContainer title="あなたについて">
        <div className="form-table-cell">
          <p className="text-sm">名前</p>
          <p className="font-bold">{props.userData.name}</p>
          {/* <p className="font-bold">村上大知</p> */}
        </div>

        <div className="form-table-cell">
          <p className="text-sm">生年月日</p>
          <p className="font-bold">
            {birthdayInfo[0]}年 {birthdayInfo[1]}月 {birthdayInfo[2]}日
          </p>
          {/* <p className="font-bold">1999年8月17日</p> */}
        </div>

        <div className="form-table-cell">
          <p className="text-sm">性別</p>
          <p className="font-bold text-xl">
            {props.userData.sex === "male" ? "男性" : "女性"}
          </p>
        </div>

        <div className="form-table-cell">
          <p className="text-sm">住所</p>
          <p className="font-bold">{props.userData.address}</p>
          {/* <p className="font-bold text-md">
              宮城県仙台市青葉区川内澱橋通5-1 フォレストヒル仙台青葉3４１号
            </p> */}
        </div>
        {/* {Object.entries(props.userData).map((v, i) => {
          return (
            <div>
              <p>{v[0]}: </p>
              <p className="font-bold">{v[1]}</p>
            </div>
          );
        })} */}
      </DataShowcaseContainer>
      <p>
        よろしければ、<br></br>マイナンバーカードの暗証番号の入力<br></br>
        を次の画面で行なってください。
      </p>
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
