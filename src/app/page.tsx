import Image from "next/image";
import styles from "./page.module.css";
import { LoginCard } from "./auth/LoginCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginCard />
    </main>
  );
}
