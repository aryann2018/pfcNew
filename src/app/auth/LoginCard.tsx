"use client";
import { useForm } from "react-hook-form";
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

interface LoginCardProps {
  onSubmit: (phoneNumber: string) => void;
}

export const LoginCard = (props: LoginCardProps) => {
  const { onSubmit: onSubmitAuth } = props;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values: any) => {
    onSubmitAuth(values.phone);
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="name">Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon borderStartRadius={6}>+91</InputLeftAddon>
                <Input
                  isInvalid={!!errors.phone}
                  type="number"
                  placeholder="phone number"
                  borderRadius={0}
                  borderEndRadius={6}
                  {...register("phone", {
                    required: "This is required",
                    maxLength: {
                      value: 10,
                      message: "Max length should be 10",
                    },
                    minLength: {
                      value: 10,
                      message: "Minimum length should be 10",
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {!!errors.phone && (errors.phone.message as string)}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <Stack spacing="6">
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              Sign in
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
