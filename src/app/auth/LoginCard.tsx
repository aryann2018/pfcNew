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
} from "@chakra-ui/react";
import { ContactDetailsType } from "./AuthCard";

const COUNTRY_CODE = "+91";

interface LoginCardProps {
  onSubmit: (details: ContactDetailsType) => void;
}

export const LoginCard = (props: LoginCardProps) => {
  const { onSubmit: onSubmitAuth } = props;

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ContactDetailsType>({
    defaultValues: {
      countryCode: COUNTRY_CODE,
      phoneNumber: "",
    },
    mode: "onChange",
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
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      autoComplete="on"
                      maxWidth={"10"}
                      padding={0}
                      disabled={true}
                      {...field}
                    ></Input>
                  )}
                />
              </InputLeftAddon>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    isInvalid={!!errors.phoneNumber}
                    type="number"
                    placeholder="phone number"
                    borderRadius={0}
                    borderEndRadius={6}
                    {...field}
                  />
                )}
              />
            </InputGroup>
            <FormErrorMessage>
              {!!errors.phoneNumber && (errors.phoneNumber as any).message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Stack spacing="6">
          <Button
            onClick={handleSubmit(onSubmit)}
            colorScheme="teal"
            isLoading={isSubmitting}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
