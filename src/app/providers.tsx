// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: PFCColors,
  assets: {
    darkLiver: "#3A0A00",
  },
};

const fonts = {
  heading: "var(--font-rubik)",
  body: "var(--font-rubik)",
};

export const theme = extendTheme({ colors, fonts });

import { Rubik } from "next/font/google";
import { PFCColors } from "./common/PFCColors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rubik = Rubik({ subsets: ["latin"] });

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <style jsx global>
          {`
            :root {
              --font-rubik: ${rubik.style.fontFamily};
            }
          `}
        </style>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
