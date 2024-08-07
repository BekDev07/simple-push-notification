import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SubscriptionProvider } from "./SubscriptionContext";
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then((registration) => {
    console.log("Service Worker registered with scope:", registration.scope);
  });
}

if ("Notification" in window && navigator.serviceWorker) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.REACT_APP_PUBLIC_VAPID_KEY
            ),
          })
          .then((subscription) => {
            // Save subscription to backend
          });
      });
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SubscriptionProvider>
        <App />
      </SubscriptionProvider>
    </Provider>
  </React.StrictMode>
);
