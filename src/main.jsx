import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiKeyProvider } from "./contexts/ApiKeyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiKeyProvider>
      <App />
    </ApiKeyProvider>
  </React.StrictMode>
);
