"use client";

import React, { useEffect, useState } from "react";
import { LoginCard } from "./LoginCard";
import OtpCard from "./OtpCard";
import { Box, Container, Divider, HStack, chakra } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import { useGenerateOtp, useLogin } from "./api/hooks";
import { useRouter } from "next/navigation";
import { getToken, setToken } from "./utils";



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
  const router = useRouter();

  const [contactDetails, setContactDetails] =
    useState<ContactDetailsType | null>(null);

  const [showPhoneInputCard, setShowPhoneInputCard] = useState<boolean>(false);

  const { mutate: mutateLogin, isPending: isLoggingIn } = useLogin({
    onSuccess: async (data) => {
      if (data?.token) {
        await setToken(data.token);
        router.push("/dashboard/clients");
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const { mutate: sendOtp, isPending: isSendingOtp } = useGenerateOtp({
    onSuccess: (data) => {
      if (data.is_success) {
        setShowPhoneInputCard(false);
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleContactDetailsSubmit = async (
    contactDetails: ContactDetailsType
  ) => {
    await sendOtp({
      phone_number: `${contactDetails.countryCode}${contactDetails.phoneNumber}`,
    });
    setShowPhoneInputCard(false);
    setContactDetails({
      countryCode: contactDetails.countryCode,
      phoneNumber: contactDetails.phoneNumber,
    });
  };

  const handleOtpSubmit = async (otp: string) => {
    await mutateLogin({
      phone_number: `${contactDetails?.countryCode}${contactDetails?.phoneNumber}`,
      otp,
    });
    `Verifying OTP: ${otp} for phone number: ${contactDetails?.phoneNumber}`;
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        router.push("/dashboard/clients");
      }
    };
    checkToken();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container height="100%" m="auto">
      <Box display="flex" alignItems="center" justifyContent="center"
      marginBottom={{ base: "-140px", md: "-220px", lg: "-150px" }}
      >
        <img src="/images/pfclogo.png" alt="PFC Club" />
      </Box>

      {contactDetails && contactDetails.phoneNumber && !showPhoneInputCard ? (
        <ChakraBox
          maxW="md"
          borderRadius="lg"
          overflow="hidden"
          p="4"
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
            isSendingOtp={isSendingOtp}
          />
        </ChakraBox>
      ) : (
        <Box
          maxW="md"
          overflow="hidden"
          m="auto"
          mt="10"
        >
          <LoginCard
            onSubmit={handleContactDetailsSubmit}
            isLoggingIn={isLoggingIn}
          />
          <HStack>
            <Divider />
          </HStack>
        </Box>
      )}
    </Container>
  );
};

export default AuthCard;
