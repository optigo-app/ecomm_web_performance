import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css/navigation'
import 'swiper/css';
import App from './App';
import { loadStoreInit } from "./loadInit";

(async () => {
  const success = await loadStoreInit();

  const root = ReactDOM.createRoot(document.getElementById("root"));

  if (!success || !sessionStorage.getItem("storeInit")) {
    root.render(
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <h2>❌ Failed to load store configuration.</h2>
        <p>Please refresh the page or contact support.</p>
      </div>
    );
    return;
  }

  root.render(<App />);
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();