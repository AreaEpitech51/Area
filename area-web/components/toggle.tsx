'use client'
import React, { useState } from "react";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={toggleSwitch}
        style={isOn ? { backgroundColor: "#4caf50", color: "#fff" } : { backgroundColor: "#d61c1c", color: "#000" }}
        data-isOn={isOn}
      >
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  color: "#333",
  padding: "8px 16px",
  fontSize: "16px",
  cursor: "pointer",
  outline: "none",
  borderRadius: "20px",
  transition: "background-color 0.3s, color 0.3s",
};

export default ToggleButton;