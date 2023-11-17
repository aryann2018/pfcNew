"use client";

import React, { useState } from "react";
import { LoginCard } from "./LoginCard";
import OtpCard from "./OtpCard";
import { Box, Container, Divider, HStack, chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const AuthCard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (enteredPhoneNumber: string) => {
    setPhoneNumber(enteredPhoneNumber);
  };

  return (
    <Container height="100%">
      {phoneNumber ? (
        <ChakraBox
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="6"
          m="auto"
          mt="10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <OtpCard phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        </ChakraBox>
      ) : (
        <Box
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="6"
          m="auto"
          mt="10"
        >
          <LoginCard onSubmit={handleLogin} />
          <HStack>
            <Divider />
          </HStack>
        </Box>
      )}
    </Container>
  );
};

export default AuthCard;
