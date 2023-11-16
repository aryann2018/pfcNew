"use client"

import React, { useState } from "react";
import { LoginCard } from "./LoginCard";
import OtpCard from "./OtpCard";
import { Box, chakra } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const AuthCard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (enteredPhoneNumber: string) => {
    setPhoneNumber(enteredPhoneNumber);
  };

  return (
 <>  {phoneNumber ? (
  <Box as="h2" textAlign="center" mb="6" maxW="md">
  <ChakraBox
  maxW="md"
  borderWidth="1px"
  borderRadius="lg"
  overflow="hidden"
  p="6"
  m="auto"
  mt="10"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <OtpCard phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
  </ChakraBox>
  </Box>
) : (
  <LoginCard onSubmit={handleLogin} />
)}
</>
    
  );
};

export default AuthCard;
