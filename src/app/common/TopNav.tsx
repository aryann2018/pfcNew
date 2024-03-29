import { Box, Flex, Spacer, Text, Button, Image } from "@chakra-ui/react";

export const TopNav = () => {
  return (
    <Flex
      bg="assets.darkLiver"
      alignItems="center"
      position={"fixed"}
      top={0}
      width={"100%"}
    >
      <Flex
        id="animate-area"
        backgroundImage="/images/bg.svg"
        p="4"
        alignItems="center"
        flex={1}
        height={16}
      >
        <Box>
          <Image
            src="/images/logo.svg"
            alt="Logo"
            height="40px"
            width={"160px"}
          />
        </Box>
        <Spacer />
      </Flex>
    </Flex>
  );
};
