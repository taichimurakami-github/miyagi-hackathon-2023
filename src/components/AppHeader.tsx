import React from "react";
import mark from "../assets/mark.svg";
import { useNavigate } from "react-router";

export default function AppHeader(props: { headerTitle: string }) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-[1rem] text-lg  h-[50px] bg-app-brown text-white">
      <div
        className="bg-white w-[50px] h-full flex items-center justify-center  border-app-brown border-4 rounded-full"
        onClick={() => {
          navigate("/");
        }}
      >
        <img className="h-[35px]" src={mark} alt="スポット本人確認" />
      </div>
      <p>{props.headerTitle}</p>
    </header>
  );
}
