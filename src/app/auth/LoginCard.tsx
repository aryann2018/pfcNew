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
  function onSubmit(values: any) {
    onSubmitAuth(values.phone);
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      alignSelf={{ base: "center" }}
      height={{ base: "100%" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          borderWidth={"1px"}
          borderRadius={"10px"}
          borderColor={"black"}
          bg={"white"}
        >
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
                <Button
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                </HStack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};
