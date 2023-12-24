import { PFCColors } from "@/app/common/PFCColors";
import { Badge, Flex, HStack, Text } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { styles } from "./TemplatePlanManager";

interface AddTemplateSubSectionProps {
  label: string;
  onClick: () => void;
}

export const AddTemplateSubSection = ({
  label,
  onClick,
}: AddTemplateSubSectionProps) => {
  return (
    <Flex
      direction={"column"}
      onClick={onClick}
      cursor={"pointer"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="white"
      p="10px"
    >
      <CiCirclePlus size={24} />
      <Text fontSize={"15px"}>{label}</Text>
    </Flex>
  );
};

export interface TemplateSubSection {
  id: string;
  name: string;
  description: string;
  labels: string[];
  onDeleteClick: (id: string) => void;
  LeftInfo: any;
  rightTopInfo: any;
}

export const FoodItemSubSection = (props: any) => {
  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      bg={PFCColors.WHITE}
      p="12px"
      borderRadius={"4px"}
    >
      <Flex direction={"row"} justifyContent={"space-between"} flexGrow={"1"}>
        <Text {...styles.subSection.title}>{props.name}</Text>

        <Text
          {...styles.rightTopInfo}
          fontSize={"12px"}
          bg={"#EAECF0"}
          paddingY="8px"
          paddingX="12px"
        >
          {props.rightTopInfo}
        </Text>
      </Flex>

      <HStack>
        {props.labels.map((label: any) => (
          <Badge
            key={label}
            borderRadius={4}
            colorScheme="green"
            fontSize={"12px"}
            padding={1}
            paddingX={4}
            size={"sm"}
          >
            {label}
          </Badge>
        ))}
      </HStack>
    </Flex>
  );
};
