import React, { useState } from "react";
import { useSubscription } from "./SubscriptionContext";
import { useSubscribeMutation } from "./features/api/apiSlice";

function App() {
  const [username, setUsername] = useState("");
  const [notifyAbout, setNotifyAbout] = useState("");
  const { subscription, setSubscription } = useSubscription();
  const [subscribe] = useSubscribeMutation();

  const handleSubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const newSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.REACT_APP_PUBLIC_VAPID_KEY
      ),
    });
    setSubscription(newSubscription);

    await subscribe({ subscription: newSubscription, username });
  };

  const handleRegister = async () => {
    await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-2"
          onClick={handleSubscribe}
        >
          Subscribe for Notifications
        </button>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter username to notify about"
          value={notifyAbout}
          onChange={(e) => setNotifyAbout(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          className="bg-green-500 text-white p-2 rounded ml-2"
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="bg-yellow-500 text-white p-2 rounded ml-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
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

export default App;
