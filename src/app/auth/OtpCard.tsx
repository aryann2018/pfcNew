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
};

const OtpCard: React.FC<OtpCardProps> = ({
  phoneNumber,
  resetPhoneNumber,
  handleOtpSubmit,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm();

  return (
    <>
      <Heading as="h2" textAlign="center" mb="6">
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
        isLoading={isSubmitting}
        disabled={isSubmitting}
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
