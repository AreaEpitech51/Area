import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

import Form from "@/components/form";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");
  return (
    <body style={styles.page}>
      <h1>Profile</h1>
      <p>User id: {session.user.userId}</p>
      <p>Username: {session.user.username}</p>
      <Form action="/api/logout">
        <input type="submit" value="Sign out" />
      </Form>
    </body>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    padding: 0,
    background: "linear-gradient(to bottom, #222222, #000000)",
    color: "#fff",
    flexDirection: "column" as const,
  },
};

export default Page;
