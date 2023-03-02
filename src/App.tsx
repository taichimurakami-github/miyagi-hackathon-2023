import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React, { FC } from "react";
import { GoogleMap } from './pages/GoogleMap';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <GoogleMap/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
