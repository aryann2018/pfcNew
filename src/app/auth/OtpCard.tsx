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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

type OtpCardProps = {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const OtpCard: React.FC<OtpCardProps> = ({ phoneNumber, setPhoneNumber }) => {
  const [otp, setOtp] = useState("");

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = useForm();

  const handleVerify = (event: React.FormEvent) => {
    event.preventDefault();
    // You can add OTP verification logic here
    console.log(`Verifying OTP: ${otp} for phone number: ${phoneNumber}`);
  };

  return (
    <>
      <Heading as="h2" textAlign="center" mb="6">
        Verify OTP
      </Heading>

      <Text mb="4" textAlign="center">
        Enter the OTP sent to {phoneNumber}{" "}
        <Link onClick={() => setPhoneNumber("")} textDecoration={"underline"}>
          change
        </Link>
      </Text>

      <Box mb="4">
        <HStack justifyContent={"center"}>
          <Controller
            name="otp"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PinInput {...field}>
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
        type="submit"
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
