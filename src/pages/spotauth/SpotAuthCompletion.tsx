import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useMajinkoAPI from "../../hooks/useMajinkoAPI";
import { AppUserData } from "../../types/data";

export default function SpotAuthCompletion(props: {
  data: {
    ownerId: string;
    userData: AppUserData;
  };
  onHandleGoToTop: () => void;
}) {
  const api = useMajinkoAPI();

  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = (await api.postMajinkoAuth({
        //client(owner) id
        clientId: props.data.ownerId,

        //user data
        // address: props.data.userData.address ?? "",
        // birthDay: props.data.userData.birthday ?? "",
        // name: props.data.userData.name ?? "",
        // sex: props.data.userData.sex ?? "",
        // subscriptionId: props.data.userData.id ?? "",

        address: "宮城県富谷市西成田郷田1-57-9999",
        birthDay: "1961-11-25T00:00:00.000Z",
        name: "宮城 恭治",
        sex: "male",
        subscriptionId: "e5f19b8f-3252-4982-b3ef-98aa554d0421",
      })) as any;
      setIsLoading(false);

      console.log("result:");
      console.log(res);

      400 <= res.statusCode && res.statusCode < 500
        ? setError(JSON.stringify(res))
        : setData(JSON.stringify(res));
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
        <FontAwesomeIcon
          className="fa-spin-pulse text-[75px]"
          icon={faSpinner}
        />
        <p className="text-xl">只今認証中です。少々お待ちください...</p>
      </div>
    );
  }

  if (data) {
    return (
      <div className="grid gap-10">
        認証に成功しました！
        <button onClick={props.onHandleGoToTop}>トップに戻る</button>
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      認証に失敗しました：
      {JSON.stringify(error)}
      <button onClick={props.onHandleGoToTop}>トップに戻る</button>
    </div>
  );
}
