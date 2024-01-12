import React, { useEffect } from "react";
import { getSession } from "@/auth/lucia";
import { client } from "@/auth/lucia";
import type { NextRequest } from "next/server";

type Application = {
  names: string[];
  descriptions: string[];
};

const LaunchActions = async ( {applications}: { applications: Application[] }) => {
  applications.forEach((app, appIndex) => {
    app.names.forEach((name, nameIndex) => {
      ;
    });
  });
};
  
const CallActions = ({ applications }: { applications: Application[] }) => {
    useEffect(() => {
        const intervalId = setInterval(async () => {
          await LaunchActions({applications});
        }, 5000);

    return () => {
        clearInterval(intervalId);
        };
    }, []);

    return (
      <div>
      </div>
    );
  };
  
  export default CallActions;