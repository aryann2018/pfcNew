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

export type ContactDetailsType = {
  countryCode: string;
  phoneNumber: string;
};

const AuthCard = () => {
  const [contactDetails, setContactDetails] =
    useState<ContactDetailsType | null>(null);

  const [showPhoneInputCard, setShowPhoneInputCard] = useState<boolean>(false);

  const handleContactDetailsSubmit = (contactDetails: ContactDetailsType) => {
    setShowPhoneInputCard(false);
    setContactDetails({
      countryCode: contactDetails.countryCode,
      phoneNumber: contactDetails.phoneNumber,
    });
  };

  const handleOtpSubmit = (otp: string) => {
    console.log(
      `Verifying OTP: ${otp} for phone number: ${contactDetails?.phoneNumber}`
    );
  };

  return (
    <Container height="100%">
      {contactDetails && contactDetails.phoneNumber && !showPhoneInputCard ? (
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
          <OtpCard
            phoneNumber={`${contactDetails?.countryCode}-${contactDetails?.phoneNumber}`}
            resetPhoneNumber={() => {
              setShowPhoneInputCard(true);
            }}
            handleOtpSubmit={handleOtpSubmit}
          />
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
          <LoginCard onSubmit={handleContactDetailsSubmit} />
          <HStack>
            <Divider />
          </HStack>
        </Box>
      )}
    </Container>
  );
};

export default AuthCard;
