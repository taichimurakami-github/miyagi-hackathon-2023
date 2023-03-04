import React from "react";
import { Link } from "react-router-dom";
import { useAppCommonCtx } from "../hooks/useAppCtx";
import logo from "../assets/logo.svg";

export default function Index() {
  const { appCommonData } = useAppCommonCtx();

  return (
    <div className="grid gap-10 py-10 h-screen flex flex-col justify-center">
      <h1 className="text-3xl text-center w-full">
        <img
          className="w-[250px] mx-auto mb-[10px]"
          src={logo}
          alt="スポット本人確認"
        />
      </h1>

      <div className="grid gap-10 text-xl">
        <Link
          className="grid items-center h-[3rem] bg-app-brown rounded-md text-white font-bold"
          to="/reservation"
        >
          ① ネットで予約する
        </Link>
        {appCommonData.reservation.done && (
          <>
            <p className="text-3xl text-app-brown">↓↓↓</p>
            <Link
              className="grid items-center h-[3rem] bg-app-brown rounded-md text-white font-bold"
              to="/spotauth"
            >
              ② 現地で本人確認する
            </Link>
          </>
        )}
        {appCommonData.reservation.done && appCommonData.spotauth.done && (
          <>
            <p className="text-3xl text type-b">↓↓↓</p>
            <p className="grid items-center h-[3rem] bgcolor type-b rounded-md text-white font-bold">
              ③ ようこそ！
            </p>
          </>
        )}
      </div>
      <div>
        <p>version: 1.0.7</p>
        <p>&copy;2023 青翠のまじんこ</p>
      </div>
    </div>
  );
}
