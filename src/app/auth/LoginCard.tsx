import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  NumberInput,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

export const LoginCard = () => (
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
        <Stack spacing="6">
          <Stack spacing="5">
            <InputGroup>
              <InputLeftAddon borderStartRadius={6}>+91</InputLeftAddon>
              <Input
                type="number"
                placeholder="phone number"
                borderRadius={0}
                borderEndRadius={6}
              />
            </InputGroup>
          </Stack>
          <Stack spacing="6">
            <Button>Sign in</Button>
            <HStack>
              <Divider />
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
);
