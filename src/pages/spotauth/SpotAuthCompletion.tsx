import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useMajinkoAPI from "../../hooks/useMajinkoAPI";
import { AppUserData } from "../../types/data";
import { useAppCommonCtx } from "../../hooks/useAppCtx";

export default function SpotAuthCompletion(props: {
  data: {
    ownerId: string;
    userData: AppUserData;
  };
  onHandleGoToTop: () => void;
}) {
  const api = useMajinkoAPI();
  const { setAppCommonData } = useAppCommonCtx();

  const [error, setError] = useState<any>();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = (await api.postMajinkoAuth({
        //client(owner) id
        clientId: props.data.ownerId,

        //user data
        address: props.data.userData.address ?? "",
        birthDay: props.data.userData.birthday ?? "",
        name: props.data.userData.name ?? "",
        sex: props.data.userData.sex ?? "",
        subscriptionId: props.data.userData.id ?? "",

        // address: "宮城県富谷市西成田郷田1-57-9999",
        // birthDay: "1961-11-25T00:00:00.000Z",
        // name: "宮城 恭治",
        // sex: "male",
        // subscriptionId: "e5f19b8f-3252-4982-b3ef-98aa554d0421",
      })) as any;
      setIsLoading(false);

      console.log("result:");
      console.log(res);

      if (
        Object.hasOwn(res, "errorMessage") ||
        (400 <= res.statusCode && res.statusCode < 500)
      ) {
        setError(JSON.stringify(res));
      } else {
        setData(JSON.stringify(res));
      }
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
      <div className="grid gap-10 items-center h-[50vh]">
        <p className="font-bold">
          本人確認が完了しました！<br></br>
          只今より、サービスがご利用可能です。
        </p>
        <button
          className="type-b"
          onClick={() => {
            setAppCommonData((prev) => ({
              ...prev,
              spotauth: {
                ...prev.spotauth,
                done: true,
              },
            }));
            props.onHandleGoToTop();
          }}
        >
          トップに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-10 items-center h-screen w-full">
      認証に失敗しました：
      {JSON.stringify(error)}
      <button className="type-b" onClick={props.onHandleGoToTop}>
        トップに戻る
      </button>
    </div>
  );
}
