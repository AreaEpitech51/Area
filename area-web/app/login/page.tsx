  import Form from "@/components/form";
  import Link from "next/link";
  import { getPageSession } from "@/auth/lucia";
  import { redirect } from "next/navigation";
  import PasswordInput from "@/components/password";

  const Page = async () => {
    const session = await getPageSession();
    if (session) redirect("/");
    return (
      <body style={styles.page}>
        <div style={styles.whiteBox}>
          <h1>Login</h1>
          <Form action="/api/login">
            <label htmlFor="username">Username</label>
            <input name="username" id="username" />
            <br />
            <PasswordInput />
            <br />
            <input type="submit" value="Login" />
          </Form>
          <Link href="/signup">Create an account</Link>
        </div>
      </body>
    );
  };

  const styles = {
    page: {
      backgroundColor: "#f4f0f0",
      height: "100vh",
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    whiteBox: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      width: 300,
    },
  };

  export default Page;
