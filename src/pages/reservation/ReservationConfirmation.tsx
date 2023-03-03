import React, { useEffect } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { usePocketSignSDKInstanceCtx } from "../../hooks/useAppCtx";
import usePocketSignSDK from "../../hooks/usePocketSignSDK";
import useMajinkoAPI from "../../hooks/useMajinkoAPI";
import { AppFormData, AppUserData } from "../../types/data";
import { DataShowcaseContainer } from "../../components/ui/DataShowcaseContainer";

export default function ReservationConfirmation(props: {
  ownerId: string;
  formData: AppFormData;
  userData: AppUserData;
  onSetUserData: (value: { [key: string]: string | null }) => void;
  onHandleGoBack: () => void;
  onHandleGoToTop: () => void;
}) {
  const sdkInstance = usePocketSignSDKInstanceCtx();
  const { getUserInfomation } = usePocketSignSDK(sdkInstance);
  const api = useMajinkoAPI();

  const handleReserve = async () => {
    if (props.userData.birthday) {
      await api.postMajinkoReservation({
        //client(owner) id
        clientId: props.ownerId === "" ? "test" : props.ownerId,

        //user data
        address: props.userData.address ?? "",
        birthDay: props.userData.birthday,
        name: props.userData.name ?? "",
        sex: props.userData.sex ?? "",
        subscriptionId: props.userData.id ?? "",

        //form data
        detail: props.formData,
      });
      alert("予約を完了しました。");
    } else {
      alert(
        "正しいユーザーデータを取得できませんでした。テストモードで予約を実行します。"
      );
      await api.postMajinkoReservation({
        //client(owner) id
        clientId: "test",

        //user data
        address: "宮城県富谷市西成田郷田1-57-9999",
        birthDay: "1961-11-25T00:00:00.000Z",
        name: "宮城 恭治",
        sex: "male",
        subscriptionId: "e5f19b8f-3252-4982-b3ef-98aa554d0421",

        //form data
        detail: props.formData,
      });
    }
    props.onHandleGoToTop();
  };

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
    <div className="text-lg grid gap-10">
      <h2>以下の情報で予約を確定します。よろしいですか？</h2>
      <div className="grid gap-4">
        <DataShowcaseContainer>
          <div className="form-table-cell">
            <p className="text-sm">オーナー</p>
            <p className="font-bold">青翠のまじんこ</p>
            {/* <p className="font-bold">{props.ownerId}</p> */}
          </div>
        </DataShowcaseContainer>

        <DataShowcaseContainer>
          {/* {Object.entries(props.userData).map((v, i) => {
            return (
              <div>
                <p>{v[0]}: </p>
                <p className="font-bold">{v[1]}</p>
              </div>
            );
          })} */}
          <div className="form-table-cell">
            <p className="text-sm">名前</p>
            {/* <p className="font-bold">{props.userData.name}</p> */}
            <p className="font-bold">村上大知</p>
          </div>

          <div className="form-table-cell">
            <p className="text-sm">生年月日</p>
            {/* <p className="font-bold">{props.userData.name}</p> */}
            <p className="font-bold">1999年8月17日</p>
          </div>

          <div className="form-table-cell">
            <p className="text-sm">性別</p>
            <p className="font-bold text-xl">
              {props.userData.sex === "male" ? "男性" : "女性"}
            </p>
          </div>

          <div className="form-table-cell">
            <p className="text-sm">住所</p>
            {/* <p className="font-bold">{props.userData.address}</p> */}
            <p className="font-bold text-md">
              宮城県仙台市青葉区川内澱橋通5-1 フォレストヒル仙台青葉3４１号
            </p>
          </div>
        </DataShowcaseContainer>

        <DataShowcaseContainer>
          {/* {Object.entries(props.formData).map((v, i) => {
            return (
              <div>
                <p>{v[0]}: </p>
                <p className="font-bold">{v[1]}</p>
              </div>
            );
          })} */}
        </DataShowcaseContainer>
      </div>
      <TwinButtonsContainer>
        <button className="type-b-reverse" onClick={props.onHandleGoBack}>
          戻る
        </button>
        <button className="type-b" onClick={handleReserve}>
          予約する
        </button>
      </TwinButtonsContainer>
    </div>
  );
}
