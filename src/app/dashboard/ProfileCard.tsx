import {
  Box,
  Flex,
  Avatar,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

interface ProfileCardProps {
  isExpanded: boolean;
  name: string;
  email?: string;
  profileImage?: string;
  logout: () => void;
  onProfileClick: () => void;
}

function ProfileCard(props: ProfileCardProps) {
  const { isExpanded, name, email, logout, profileImage, onProfileClick } =
    props;

  if (!isExpanded) {
    return (
      <Box bg="transparent" borderRadius="lg" p={4} color="white" w="100%">
        <Avatar name={name} src={profileImage} />
      </Box>
    );
  }
  return (
    <Box
      bg={"transparent"}
      borderRadius="lg"
      p={4}
      color="white"
      w="100%"
      cursor={"pointer"}
    >
      <Flex align="center" justify="space-between">
        <Flex
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          onClick={onProfileClick}
        >
          <Avatar name={name} src={profileImage} />

          <Box ml={3}>
            <Text fontWeight="bold">{name}</Text>
            <Text fontSize="sm">{email ?? "-"}</Text>
          </Box>
        </Flex>

        <IconButton
          aria-label="Options"
          icon={<FiLogOut />}
          variant="ghost"
          fontSize="lg"
          onClick={logout}
          cursor={"pointer"}
          color="gray.300"
          bg={"transparent"}
          _hover={{
            bg: "transparent",
            color: "gray.100",
          }}
        />
      </Flex>
    </Box>
  );
}

export default ProfileCard;
