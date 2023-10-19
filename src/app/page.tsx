import Image from "next/image";
import styles from "./page.module.css";
import { LoginCard } from "./auth/LoginCard";

export default function Home() {
  return (
    <main
      style={{
        //calculate height to be 100vh - 64px (top nav height)
        height: "calc(100vh - 64px)",
      }}
    >
      <LoginCard />
    </main>
  );
}
