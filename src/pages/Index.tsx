import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <h1>INDEX</h1>
      <Link to="/page1">Page1へ</Link>
      <Link to="/page2">Page2へ</Link>
      <Link to="/page3">Page3へ</Link>
    </div>
  );
}
