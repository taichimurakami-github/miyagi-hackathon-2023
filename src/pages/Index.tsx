import React from "react";
import { Link } from "react-router-dom";
import { useAppCommonCtx } from "../hooks/useAppCtx";
import logo from "../assets/logo.svg";

export default function Index() {
  const { appCommonData } = useAppCommonCtx();
  console.log(appCommonData.reservation.done);
  return (
    <div className="grid gap-10 py-10">
      <h1 className="text-3xl text-center w-full">
        <img className="w-[250px]" src={logo} alt="スポット本人確認" />
      </h1>

      <div className="grid gap-10 text-xl">
        <Link
          className="p-2 bg-app-brown rounded-md text-white"
          to="/reservation"
        >
          ① ネットで予約する
        </Link>
        {appCommonData.reservation.done && (
          <>
            <p className="text-3xl text-app-brown">↓↓↓</p>
            <Link
              className="p-2 bg-app-brown rounded-md text-white"
              to="/spotauth"
            >
              ② 現地で本人確認する
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
