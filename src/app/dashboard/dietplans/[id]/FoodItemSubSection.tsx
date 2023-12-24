import { PFCColors } from "@/app/common/PFCColors";
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { styles } from "./TemplatePlanManager";
import { FoodIngredient } from "../api/types";
import SearchableFoodSelect from "@/app/common/inputs/SearchableFoodSelect";
import { useState } from "react";
import CustomBadges from "./CustomBadges";

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
  id?: string;
  name: string;
  description: string;
  onDelete?: (id: string) => void;
  isNew?: boolean;
  macros: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
  quantity: number;
  unit: string;
  foodItem?: FoodIngredient;
  style?: any;
}

export const FoodItemSubSection = (props: TemplateSubSection) => {
  const [selected, setSelected] = useState<FoodIngredient>(props.foodItem!);
  return (
    <Flex
      direction={"row"}
      justifyContent={"space-between"}
      bg={PFCColors.WHITE}
      p="12px"
      borderRadius={"4px"}
      boxShadow="0px 1.69px 1.69px 0px rgba(24, 34, 48, 0.10)"
      zIndex={props.style?.zIndex}
    >
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <Box width={"100%"}>
          <SearchableFoodSelect
            onSelect={(foodItem) => {
              setSelected(foodItem);
            }}
            selected={selected}
          />
        </Box>
        <Flex direction={"row"} justifyContent={"space-between"} width={"100%"}>
          <CustomBadges macros={props.macros} />
        </Flex>
      </Flex>
    </Flex>
  );
};
