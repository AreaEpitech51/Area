import Form from "@/components/form";
import Link from "next/link";
import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getPageSession();
  if (session) redirect("/");
  return (
    <body style={styles.page}>
      <div style={styles.container}>
        <div style={styles.whiteBox}>
          <h1 style={styles.title}>Je n&apos;ai pas de compte Area</h1>
          <br />
          <div style={styles.sepbar}></div>
          <Form action="/api/signup">
            <br />
            <br />
            <div style={styles.usernameContainer}>
              <label style={styles.label} htmlFor="username">
                Nom d&apos;utilisateur
              </label>
              <input
                name="username"
                id="username"
                style={styles.input}
                placeholder="Enter your username"
              />
            </div>
            <div style={styles.passwordContainer}>
              <label style={styles.label} htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                style={styles.input}
                placeholder="Enter your password"
              />
            </div>
            <div style={styles.buttonContainer}>
              <input type="submit" style={styles.submitButton} />
            </div>
          </Form>
          <br />
          <div style={styles.sepbar}></div>
          <br />
          <p>
            Vous avez déjà un compte ? <Link href="/login">Connectez vous</Link>
          </p>
        </div>
      </div>
    </body>
  );
};

const styles = {
  loginLogo: {
    width: 100,
    height: 100,
  },
  passwordContainer: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: 10,
    marginBottom: 10,
    width: 280,
    color: "#fff",
    backgroundColor: "#121212",
    transition: "border-color 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  usernameContainer: {
    display: "flex",
    flexDirection: "column" as const,
    marginBottom: 20,
  },
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    padding: 0,
    background: "linear-gradient(to bottom, #222222, #000000)",
    color: "#fff",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  whiteBox: {
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 20,
    width: 500,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#1abc54",
    color: "black",
    fontWeight: "bold",
    width: "80%",
    height: "50px",
    fontSize: 16,
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  socialButtonContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginTop: 20,
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: 5,
    width: 300,
    margin: "5px 0",
    textDecoration: "none",
  },
  sepbar: {
    height: "1px",
    background: "#333333",
    width: "80%",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
};

export default Page;
