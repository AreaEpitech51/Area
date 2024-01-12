import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Toggle from "../components/toggle";
import Box from "../components/box";


import Form from "@/components/form";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");

  const applications = [
    { name: "App 1", description: "Description for App 1" },
  ];

  

  return (
    <body style={styles.page}>
      <h1>Profile</h1>
      <p>User id: {session.user.userId}</p>
      <p>Username: {session.user.username}</p>
      <div style={styles.appContainer}>
        {applications.map((app, index) => (
          <div key={index} style={styles.appBox}>
            <p style={styles.title}>{app.name}</p>
            <p>{app.description}</p>  
            <div style={styles.buttonContainer}>
              <Toggle />
            </div>
          </div>
        ))}
        <div style={styles.plus}>
          <Box />
        </div>
      </div>
      <Form action="/api/logout">
        <input type="submit" value="Sign out" />
      </Form>
    </body>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    padding: 20,
    background: "linear-gradient(to bottom, #222222, #000000)",
    color: "#fff",
  },
  plus: {
    background: "#444444"
  },
  appContainer: {
    display: "flex",
    flexWrap: "wrap",
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  onOffButton: {
    backgroundColor: "#1abc54",
    color: "black",
    fontWeight: "bold",
    width: "80px",
    height: "30px",
    fontSize: 12,
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default Page;
