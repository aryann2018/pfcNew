import React, { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";

type OtpCardProps = {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
};

const OtpCard: React.FC<OtpCardProps> = ({ phoneNumber ,setPhoneNumber}) => {
  const [otp, setOtp] = useState("");

  const handleVerify = (event: React.FormEvent) => {
    event.preventDefault();
    // You can add OTP verification logic here
    console.log(`Verifying OTP: ${otp} for phone number: ${phoneNumber}`);
  };

  return (
    <>
    
      <Heading as="h2" textAlign="center" mb="6">
        Verify OTP <Link onClick={() => setPhoneNumber("")}>Change</Link>
      </Heading>

      <Text mb="4" textAlign="center">
        Enter the OTP sent to {phoneNumber}
      </Text>

      <form onSubmit={handleVerify}>
        <FormControl id="otp" mb="4">
          <FormLabel>OTP</FormLabel>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="teal" type="submit" width="full">
          Verify
        </Button>
      </form>

      <Text mt="4" textAlign="center">
        <Link href="#">Resend OTP</Link>
      </Text>
    </>
  );
};

export default OtpCard;
