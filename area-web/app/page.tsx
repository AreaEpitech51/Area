import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import Applications from "../components/box";
import Form from "@/components/form";
import Image from "next/image";
import discord from "@/assets/Discord_icon.png";
import google from "@/assets/Google_icon.png";
import github from "@/assets/GitHub_icon.png";
import microsoft from "@/assets/Microsoft_icon.png";
import spotify from "@/assets/Spotify_icon.png";

const Page = async () => {
  const session = await getPageSession();
  if (!session) redirect("/login");

  return (
    <body style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Area51</h1>
        <p style={styles.subtitle}>L'automatisation sans limites!</p>
      </header>

      <section style={styles.profileSection}>
        <h2 style={styles.sectionTitle}>Profile</h2>
        <div style={styles.profileInfo}>
          <p>User ID: {session.user.userId}</p>
          <p>Username: {session.user.username}</p>
        </div>
      </section>

      <section style={styles.applicationsSection}>
        <h2 style={styles.sectionTitle}>Action / Réactions</h2>
        <div style={styles.appContainer}>
          <Applications />
        </div>
      </section>
      <p>Connectez vous aux services suivant :</p>
      <div style={styles.imageBox}>
        <a href="/api/login/discord">
          <Image src={discord} alt="discord" width={50} />
        </a>
        <a href="/api/login/google">
          <Image src={google} alt="google" width={50} />
        </a>
        <a href="/api/login/github">
          <Image src={github} alt="github" width={50} />
        </a>
        <a href="/api/login/microsoft">
          <Image src={microsoft} alt="microsoft" width={50} />
        </a>
        <a href="/api/login/spotify">
          <Image src={spotify} alt="spotify" width={50} />
        </a>
      </div>
      <section style={styles.logoutSection}>
        <h2 style={styles.sectionTitle}>Logout</h2>
        <Form action="/api/logout">
          <input type="submit" value="Sign out" style={styles.logoutButton} />
        </Form>
      </section>
    </body>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    minHeight: "100vh",
    margin: 0,
    padding: 20,
    background: "linear-gradient(to top, #000000, #111111)",
    color: "#ffffff",
  },
  imageBox: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
    background: "linear-gradient(to top, #000000, #111111)",
    color: "#ffffff",
  },
  header: {
    background: "#292929",
    borderRadius: 10,
    textAlign: "center" as const,
    padding: 20,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    margin: 0,
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 16,
    margin: 0,
    color: "#aaaaaa",
  },
  profileSection: {
    background: "#333333",
    borderRadius: 10,
    padding: 20,
    width: "30%",
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileInfo: {
    color: "#ffffff",
  },
  applicationsSection: {
    background: "#333333",
    borderRadius: 10,
    textAlign: "center" as const,
    padding: 20,
    marginBottom: 40,
  },
  appContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    gap: 20,
  },
  logoutSection: {
    background: "#333333",
    borderRadius: 10,
    textAlign: "center" as const,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: "#1abc54",
    color: "#ffffff",
    fontWeight: "bold",
    width: "120px",
    height: "40px",
    fontSize: 16,
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default Page;
