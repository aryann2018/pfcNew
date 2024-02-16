import React, { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  HStack,
  PinInput,
  PinInputField,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

type OtpCardProps = {
  phoneNumber: string;
  resetPhoneNumber: () => void;
  handleOtpSubmit: (otp: string) => void;
  isSendingOtp: boolean;
};

const OtpCard: React.FC<OtpCardProps> = ({
  phoneNumber,
  resetPhoneNumber,
  handleOtpSubmit,
  isSendingOtp,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm();

  return (
    <>
      
      <Heading as="h2" 
      textAlign="center" color="#101828" fontWeight="600" fontSize="3xl" mb={2}>
      Verify OTP
      </Heading>

      <Text mb="4" textAlign="center">
        Enter the OTP sent to {phoneNumber}{" "}
        <Link onClick={resetPhoneNumber} textDecoration={"underline"}>
          change
        </Link>
      </Text>

      <Box mb="4">
        <HStack justifyContent={"center"}>
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            rules={{
              required: "OTP is required",
              minLength: {
                value: 4,
                message: "OTP must be 4 digits long",
              },
              maxLength: {
                value: 4,
                message: "OTP must be 4 digits long",
              },
            }}
            render={({ field }) => (
              <PinInput
                {...field}
                onComplete={() =>
                  handleSubmit((values) => handleOtpSubmit(values.otp))
                }
                isInvalid={!!errors.otp}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            )}
          />
        </HStack>
      </Box>

      <Button
        colorScheme="teal"
        onClick={handleSubmit((values) => handleOtpSubmit(values.otp))}
        width="full"
        fontSize="md"
            size='lg'
            py="4"
            backgroundColor='#F15C3D'
            _hover={{
              background: "black"
            }}
        isLoading={isSubmitting || isSendingOtp}
        disabled={isSubmitting || isSendingOtp}
      >
        Verify
      </Button>

      <Text mt="4" textAlign="center">
        <Link href="#">Resend OTP</Link>
      </Text>
    </>
  );
};

export default OtpCard;
