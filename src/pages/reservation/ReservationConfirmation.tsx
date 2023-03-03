import React, { useEffect } from "react";
import { TwinButtonsContainer } from "../../components/ui/ButtonsContainer";
import { usePocketSignSDKInstanceCtx } from "../../hooks/useAppCtx";
import usePocketSignSDK from "../../hooks/usePocketSignSDK";
import useMajinkoAPI from "../../hooks/useMajinkoAPI";
import { AppFormData, AppUserData } from "../../types/data";

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
    <div className="text-lg">
      <h2>以下の情報で予約を確定します。よろしいですか？</h2>
      <div className="grid gap-4">
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

        <div className="w-full h-[10px] bg-black my-20"></div>

        {Object.entries(props.formData).map((v, i) => {
          return (
            <div>
              <p>{v[0]}: </p>
              <p className="font-bold">{v[1]}</p>
            </div>
          );
        })}
      </div>
      <TwinButtonsContainer>
        <button onClick={props.onHandleGoBack}>入力に戻る</button>
        <button onClick={handleReserve}>予約を完了する</button>
      </TwinButtonsContainer>
    </div>
  );
}
