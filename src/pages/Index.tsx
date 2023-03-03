import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="grid gap-10">
      <h1>
        青翠のまじんこ<br></br>Sample Demo
      </h1>

      <div className="grid gap-4 text-xl">
        <Link to="/reservation">予約する</Link>
        <Link to="/spotauth">本人確認する</Link>
      </div>
    </div>
  );
}
