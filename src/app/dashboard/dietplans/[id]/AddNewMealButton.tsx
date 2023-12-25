import { Button, Flex, Text } from "@chakra-ui/react";
import { PiPlusCircle, PiPlusFill } from "react-icons/pi";

interface AddNewMealButtonProps {
  onClick: () => void;
}

export const AddNewMealButton = (props: AddNewMealButtonProps) => {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        borderRadius: "8px",
        background: "#F2F4F7",
        fontSize: "24px",
        fontWeight: "600",
        border: "1px solid #D0D5DD",
        boxShadow:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
        maxWidth: "400px",
        color: "rgba(102, 112, 133, 1)",
        padding: "10px 83px",
      }}
      onClick={props.onClick}
      cursor={"pointer"}
    >
      <PiPlusCircle size={24} />
      <Text fontSize={"12px"}>Add New Meal</Text>
    </Flex>
  );
};
