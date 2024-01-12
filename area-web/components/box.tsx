"use client";
import React, { useState } from "react";

const SmallWindow = ({
  selectedService,
  onSubmit,
}: {
  onClose: () => void;
  selectedService: string | null;
  onSubmit: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("1");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSubmit(value);
  };

  const getOptions = () => {
    switch (selectedService) {
      case "google":
        return ["1", "2", "3"];
      case "discord":
        return ["4", "5", "6"];
      case "spotify":
        return ["7", "8", "9"];
      case "github":
        return ["10", "11", "12"];
      case "microsoft":
        return ["13", "14", "15"];
      default:
        return [];
    }
  };

  const styles = {
    smallWindow: {
      backgroundColor: "#383838",
      borderRadius: 8,
      padding: 20,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      zIndex: 999,
    },
    select: {
      width: "100%",
      padding: 10,
      marginTop: 10,
      borderRadius: 4,
      border: "1px solid #555",
      backgroundColor: "#292929",
      color: "#f0f0f0",
      fontSize: 16,
      outline: "none",
    },
    submitButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 4,
      border: "none",
      backgroundColor: "#007bff",
      color: "#ffffff",
      fontSize: 16,
      cursor: "pointer",
      outline: "none",
    },
  };

  return (
    <div style={styles.smallWindow}>
      <form>
        <label style={{ display: "block", marginBottom: 10 }}>
          Choose a Value:
          <select
            value={selectedValue}
            onChange={handleChange}
            style={styles.select}
          >
            {getOptions().map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
};

const Box = () => {
  const [showWindows, setShowWindows] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<
    Array<string | null>
  >([null, null]);
  const [submittedValues, setSubmittedValues] = useState<string[]>(
    Array.from({ length: 2 }, () => "")
  );

  const handleServiceSelection = (service: string, windowIndex: number) => {
    const updatedServices = [...selectedServices];
    updatedServices[windowIndex] = service;
    setSelectedServices(updatedServices);
  };

  const handleSubmitValue = (value: string, index: number) => {
    const updatedSubmittedValues = [...submittedValues];
    updatedSubmittedValues[index] = value;
    setSubmittedValues(updatedSubmittedValues);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted:");
    selectedServices.forEach((service, index) => {
      const submitted =
        submittedValues[index] !== undefined ? submittedValues[index] : "";
      console.log(
        `Window ${
          index + 1
        } - Service: ${service}, Submitted Value: ${submitted}`
      );
    });
    handleCloseWindow();
  };

  const handleCloseWindow = () => {
    setShowWindows(0);
    setSelectedServices([null, null]);
    setSubmittedValues(Array.from({ length: 2 }, () => ""));
  };

  const services = ["google", "discord", "spotify", "github", "microsoft"];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: 20,
        backgroundColor: "#1e1e1e",
        color: "#f0f0f0",
      }}
    >
      <button
        onClick={() =>
          setShowWindows((prevWindows) => (prevWindows === 0 ? 2 : 0))
        }
        style={{
          padding: 10,
          borderRadius: 4,
          border: "none",
          backgroundColor: "#007bff",
          color: "#ffffff",
          fontSize: 16,
          cursor: "pointer",
          outline: "none",
        }}
      >
        {showWindows === 0 ? "Add Action / Reaction" : "Close Windows"}
      </button>
      {showWindows > 0 &&
        selectedServices.map((selectedService, index) => (
          <div key={index} style={{ marginTop: 20 }}>
            {services.map((service, serviceIndex) => (
              <button
                key={serviceIndex}
                onClick={() => handleServiceSelection(service, index)}
                style={{
                  padding: 10,
                  margin: 5,
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#383838",
                  color: "#f0f0f0",
                  fontSize: 14,
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {service}
              </button>
            ))}
            <SmallWindow
              onClose={handleCloseWindow}
              selectedService={selectedService}
              onSubmit={(value: string) => handleSubmitValue(value, index)}
            />
          </div>
        ))}
      {showWindows > 0 && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <input
            type="submit"
            value="Submit"
            style={{
              padding: 10,
              borderRadius: 4,
              border: "none",
              backgroundColor: "#007bff",
              color: "#ffffff",
              fontSize: 16,
              cursor: "pointer",
              outline: "none",
            }}
          />
        </form>
      )}
    </div>
  );
};

export default Box;
