export default function useMajinkoAPI() {
  const postMajinkoReservation = async (data: {
    clientId: string; //事業者ID
    // "timeStamp" : "hoge", サーバー側で入力
    address: string;
    birthDay: string;
    name: string;
    sex: string;
    subscriptionId: string;
    detail: object;
  }) => {
    const url =
      "https://a17qq4pyxk.execute-api.ap-northeast-1.amazonaws.com/majinko/reserveInfo";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(res);
    return await res.json();
  };

  const postMajinkoAuth = async (data: {
    clientId: string; //事業者ID
    // "timeStamp" : "hoge", サーバー側で入力
    address: string;
    birthDay: string;
    name: string;
    sex: string;
    subscriptionId: string;
  }) => {
    const url =
      "https://a17qq4pyxk.execute-api.ap-northeast-1.amazonaws.com/majinko/authInfo";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return await res.json();
  };

  return { postMajinkoReservation, postMajinkoAuth };
}
