import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import QREncoder from "./components/QREncoder";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <QREncoder />
    </div>
  );
}

export default App;
