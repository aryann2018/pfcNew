"use client";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { ContactDetailsType } from "./AuthCard";
import { getToken, isTokenAvailable } from "./utils";
import { useEffect } from "react";

const COUNTRY_CODE = "91";

interface LoginCardProps {
  onSubmit: (details: ContactDetailsType) => void;
  isLoggingIn: boolean;
}

export const LoginCard = (props: LoginCardProps) => {
  const { onSubmit: onSubmitAuth, isLoggingIn } = props;

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ContactDetailsType>({
    defaultValues: {
      countryCode: COUNTRY_CODE,
      phoneNumber: "",
    },
  });

  const onSubmit = (values: ContactDetailsType) => {
    onSubmitAuth({
      countryCode: values.countryCode,
      phoneNumber: values.phoneNumber,
    });
  };

  return (
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading as="h2" textAlign="center" mb="6">
            Login
          </Heading>
        </Stack>
      </Stack>

      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="name">Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon borderStartRadius={6}>
                <Controller
                  name="countryCode"
                  control={control}
                  rules={{ required: "Country code is required" }}
                  render={({ field }) => (
                    <>
                      <Text color="gray">+</Text>
                      <Input
                        {...field}
                        type="text"
                        autoComplete="on"
                        maxWidth={"10"}
                        padding={0}
                        disabled={true}
                        value={COUNTRY_CODE}
                        onChange={() => {}}
                      ></Input>
                    </>
                  )}
                />
              </InputLeftAddon>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number should be of 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number should be of 10 digits",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    isInvalid={!!errors.phoneNumber}
                    type="number"
                    placeholder="phone number"
                    borderRadius={0}
                    borderEndRadius={6}
                  />
                )}
              />
            </InputGroup>

            {!!errors.countryCode && (
              <Text fontSize={"small"} color="red">
                {(errors.countryCode as any).message}
              </Text>
            )}
            {!!errors.phoneNumber && (
              <Text fontSize={"small"} color="red">
                {(errors.phoneNumber as any).message}
              </Text>
            )}
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button
            onClick={handleSubmit(onSubmit)}
            colorScheme="teal"
            isLoading={isSubmitting || isLoggingIn}
            disabled={isSubmitting || isLoggingIn}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
