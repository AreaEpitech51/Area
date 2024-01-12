"use client";
import React, { useState } from "react";
import Toggle from "../components/toggle";
import CallActions from "./area";

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

const Box = ({ setApplications }: { setApplications: (value: any) => void }) => {
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
  

  const createApplication = (
    name1: string,
    name2: string,
    submitted1: string,
    submitted2: string
  ) => {
    name1 = "Action: " + name1;
    name2 = "Reaction: " + name2;
    const newApplication = {
      names: [name1, name2],
      descriptions: [submitted1, submitted2],
    };

    setApplications((prevApplications: any) => [...prevApplications, newApplication]);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var name1 = selectedServices[0] !== null ? selectedServices[0] : "";
    var name2 = selectedServices[1] !== null ? selectedServices[1] : "";
    var submitted1 = submittedValues[0] !== undefined ? submittedValues[0] : "";
    var submitted2 = submittedValues[1] !== undefined ? submittedValues[1] : "";

    if (submitted1 === "") {
      if (name1 === "discord") {
        submitted1 = "4";
      }
      if (name1 === "google") {
        submitted1 = "1";
      }
      if (name1 === "spotify") {
        submitted1 = "7";
      }
      if (name1 === "github") {
        submitted1 = "10";
      }
      if (name1 === "microsoft") {
        submitted1 = "13";
      }
    }

    if (submitted2 === "") {
      if (name2 === "discord") {
        submitted2 = "4";
      }
      if (name2 === "google") {
        submitted2 = "1";
      }
      if (name2 === "spotify") {
        submitted2 = "7";
      }
      if (name2 === "github") {
        submitted2 = "10";
      }
      if (name2 === "microsoft") {
        submitted2 = "13";
      }
    }

    createApplication(name1, name2, submitted1, submitted2);

    handleCloseWindow();
  }

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
        {showWindows === 0 ? "Add Action / Reaction" : "Close"}
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


const Applications = () => {
  const styles = {
    appContainer: {
      display: "flex" as const,
      flexWrap: "wrap" as const,
      justifyContent: "center",
      gap: 20,
      marginTop: 20,
    },
    appBox: {
      backgroundColor: "#232323",
      borderRadius: 10,
      padding: 20,
      width: 300,
      height: 200,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    title: {
      marginBottom: 10,
      fontWeight: "bold",
    },
    plus: {
      background: "#444444",
    },
    buttonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    },
  }

  const [applications, setApplications] = useState([
    {
      names: ["App 1 - Name 1", "App 1 - Name 2"],
      descriptions: ["Description 1 for App 1", "Description 2 for App 1"],
    },
  ]);

  return (
    <div style={styles.appContainer}>
    <CallActions applications={applications}/>
      <div style={styles.plus}>
        <Box setApplications={setApplications} />
      </div>
      {applications.map((app, index) => (
        <div key={index} style={styles.appBox}>
          {app.names.map((name, i) => (
            <div key={i}>
              <p style={styles.title}>{`${name}`}</p>
              <p>{app.descriptions[i]}</p>
            </div>
          ))}
          <div style={styles.buttonContainer}>
            <Toggle />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Applications;