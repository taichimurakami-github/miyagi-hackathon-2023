import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="grid gap-10 py-10">
      <h1 className="text-3xl text-center">Majinko-DEMO</h1>

      <div className="grid gap-10 text-xl">
        <Link
          className="p-2 bg-app-brown rounded-md text-white"
          to="/reservation"
        >
          ① ネットで予約する
        </Link>
        <p className="text-3xl text-app-brown">↓↓↓</p>
        <Link className="p-2 bg-app-brown rounded-md text-white" to="/spotauth">
          ② 現地で本人確認する
        </Link>
      </div>
    </div>
  );
}
