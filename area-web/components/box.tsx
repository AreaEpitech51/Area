"use client";
import React, { useState } from "react";
import Toggle from "../components/toggle";
import { useEffect } from "react";
import { getSession } from "@/auth/lucia";
import { client } from "@/auth/lucia";
import type { NextRequest } from "next/server";

const Applications = () => {
  const [applications, setApplications] = useState([
    {
      names: ["Action Service", "Reaction Service"],
      descriptions: ["Nom action", "Nom réaction"],
    },
  ]);

  const styles = {
    appContainerBox: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      borderRadius: 20,
      margin: 0,
      padding: 20,
      background: "#121212",

      color: "#ffffff",
    },
    appContainer: {
      display: "flex",
      flexWrap: "wrap" as const,
      justifyContent: "center",
      gap: 20,
      marginTop: 20,
    },
    appBox: {
      backgroundColor: "#242424",
      borderRadius: 12,
      padding: 20,
      width: 300,
      height: 200,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      color: "#ffffff",
    },
    title: {
      marginBottom: 10,
      fontWeight: "bold",
    },
    plus: {
      background: "#212121",
      borderRadius: 12,
    },
    buttonContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    },
    smallWindow: {
      backgroundColor: "#242424",
      borderRadius: 12,
      padding: 20,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
    select: {
      width: "100%",
      padding: 10,
      marginTop: 10,
      borderRadius: 6,
      border: "1px solid #333",
      backgroundColor: "#1F1F1F",
      color: "#ffffff",
      fontSize: 16,
      outline: "none",
    },
    submitButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 6,
      border: "none",
      backgroundColor: "#1db954",
      color: "#ffffff",
      fontSize: 16,
      cursor: "pointer",
      outline: "none",
    },
    addReactionButton: {
      marginTop: 10,
      padding: 10,
      borderRadius: 6,
      border: "none",
      backgroundColor: "#ff4500",
      color: "#ffffff",
      fontSize: 16,
      cursor: "pointer",
      outline: "none",
    },
    button: {
      padding: 10,
      margin: 5,
      borderRadius: 4,
      border: "none",
      backgroundColor: "#383838",
      color: "#f0f0f0",
      fontSize: 14,
      cursor: "pointer",
      outline: "none",
    },
  };


  const CallActions = ({ applications }: { applications: Application[] }) => {
    useEffect(() => {
      const intervalId = setInterval(async () => {
        LaunchActions({ applications });
      }, 5000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);
  
    return <div></div>;
  };

  type Application = {
    names: string[];
    descriptions: string[];
  };
  
  const callReaction = async ({ description, content }: { description: string, content: string }) => {
    if (description === "send_mail") {
        await fetch("https://localhost:3000/api/reactions/send_mail", {
          method: "POST",
          body: content,
        });
    }
  }
  
  
  const LaunchActions = ({ applications }: { applications: Application[] }) => {
    applications.forEach(async (app, _appIndex) => {
      if (app.descriptions[0] == "emoji-github") {
        const emoji = await fetch(
          "https:localhost:3000/api/actions/github/emoji"
        );
        const text = await emoji.text();
        callReaction({ description: app.descriptions[1], content: text });
      }
    });
  };
  

  return (
  <div style={styles.appContainerBox}>
    <div style={styles.appContainer}>
      <CallActions applications={applications} />
      <Box setApplications={setApplications} styles={styles} />
      <div style={styles.plus}></div>
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
  </div>
  );
};



const Box = ({ setApplications, styles }: { setApplications: (value: any) => void; styles: any }) => {
  const [showWindows, setShowWindows] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<Array<string | null>>([null, null]);
  const [submittedValues, setSubmittedValues] = useState<string[]>(Array.from({ length: 2 }, () => ""));

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

  const createApplication = (name1: string, name2: string, submitted1: string, submitted2: string) => {
    name1 = "Action: " + name1;
    name2 = "Reaction: " + name2;
    console.log(name1 + ": " + name2 + ": " + submitted1 + ": " + submitted2);
    const newApplication = {
      names: [name1, name2],
      descriptions: [submitted1, submitted2],
    };
    setApplications((prevApplications: any) => [...prevApplications, newApplication]);
    console.log(newApplication);
  };

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
        submitted1 = "emoji-github";
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
        submitted2 = "11";
      }
      if (name2 === "microsoft") {
        submitted2 = "13";
      }
    }

    createApplication(name1, name2, submitted1, submitted2);
    handleCloseWindow();
  };

  const handleCloseWindow = () => {
    setShowWindows(0);
    setSelectedServices([null, null]);
    setSubmittedValues(Array.from({ length: 2 }, () => ""));
  };

  const services = ["google", "discord", "spotify", "github", "microsoft"];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, backgroundColor: "#242424", color: "#f0f0f0", borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
      <button
        onClick={() => setShowWindows((prevWindows) => (prevWindows === 0 ? 2 : 0))}
        style={{
          marginTop: 80,
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontSize: "16px",
          cursor: "pointer",
          outline: "none",
          textAlign: "center" as const,
          fontWeight: "bold",
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
                style={styles.button}
              >
                {service}
              </button>
            ))}
            <SmallWindow
              onClose={handleCloseWindow}
              selectedService={selectedService}
              onSubmit={(value: string) => handleSubmitValue(value, index)}
              styles={styles}
              isReaction={index === 1}
            />
          </div>
        ))}
      {showWindows > 0 && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <input
            type="submit"
            value="Submit"
            style={styles.submitButton}
          />
        </form>
      )}
    </div>
  );
};

const getServiceInfo = (selectedService: string | null) => {
  switch (selectedService) {
    case "google":
      return { options: ["1", "2", "3"], reactions: ["google"] };
    case "discord":
      return { options: ["4", "5", "6"], reactions: ["discord"] };
    case "spotify":
      return { options: ["7", "8", "9"], reactions: ["google"] };
    case "github":
      return { options: ["emoji-github", "11", "12"], reactions: ["github"] };
    case "microsoft":
      return { options: ["13", "14", "15"], reactions: ["microsoft"] };
    default:
      return { options: [], reactions: [] };
  }
};

const SmallWindow = ({
  onClose,
  selectedService,
  onSubmit,
  isReaction,
  styles,
}: {
  onClose: () => void;
  selectedService: string | null;
  onSubmit: (value: string) => void;
  isReaction: boolean;
  styles: any;
}) => {
  const [selectedValue, setSelectedValue] = useState("1");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSubmit(value);
  };

  const { options, reactions } = getServiceInfo(selectedService);
  const menuOptions = isReaction ? reactions : options;
  const menuLabel = isReaction ? "Choose a Reaction:" : "Choose an Action:";

  return (
    <div style={styles.smallWindow}>
      <form>
        <label style={{ display: "block", marginBottom: 10 }}>
          {menuLabel}
          <select
            value={selectedValue}
            onChange={handleChange}
            style={styles.select}
          >
            {menuOptions.map((option, index) => (
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


export default Applications;