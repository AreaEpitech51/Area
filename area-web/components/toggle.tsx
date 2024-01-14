"use client";
import React, { useState } from "react";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(true);

  /**
   * change button state
   */
  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
  };
  return (
    <div>
      <button
        onClick={toggleSwitch}
        style={
          isOn
            ? { backgroundColor: "#4caf50", color: "#fff" }
            : { backgroundColor: "#d61c1c", color: "#000" }
        }
      >
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
};

export default ToggleButton;
