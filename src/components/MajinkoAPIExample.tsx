import React from "react";

const postDataDummy = {
  // clientId: `test_${Date.now()}`, //事業者ID
  clientId: `test`, //事業者ID
  // "timeStamp" : "hoge", サーバー側で入力
  address: "he",
  birthDay: "bo",
  name: "maji",
  sex: "male",
  subscriptionId: "oge",
  detail: { hoge: "hogemann" },
};

export default function MajinkoAPIExample() {
  const postMajinkoReservation = async () => {
    const url =
      "https://a17qq4pyxk.execute-api.ap-northeast-1.amazonaws.com/majinko/reserveInfo";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(postDataDummy),
    });

    console.log(res);
  };

  const postMajinkoAuth = async () => {
    const url =
      "https://a17qq4pyxk.execute-api.ap-northeast-1.amazonaws.com/majinko/authInfo";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(postDataDummy),
    });

    console.log(res);
  };

  return (
    <div>
      <h1>MajinkoAPIExample</h1>
      <button onClick={postMajinkoReservation}>
        POST RESERVATION FORM DATA
      </button>
      <button onClick={postMajinkoAuth}>POST AUTH DATA</button>
    </div>
  );
}
