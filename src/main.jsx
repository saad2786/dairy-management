import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DairyProvider } from "./context/DairyContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DairyProvider>
      <App />
    </DairyProvider>
  </React.StrictMode>,
);
