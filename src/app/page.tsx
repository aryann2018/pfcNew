import Image from "next/image";
import styles from "./page.module.css";
import { Box, CSSReset } from "@chakra-ui/react";
import AuthCard from "./auth/AuthCard";

export default function Home() {
  return (
    <main>
      <CSSReset />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"calc(100vh - 24px)"}
      >
        <AuthCard />
      </Box>
    </main>
  );
}
