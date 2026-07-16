import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage("Error: " + err));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Day Zero in DB</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
