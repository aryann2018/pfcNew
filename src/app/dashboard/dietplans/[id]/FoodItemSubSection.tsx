import { PFCColors } from "@/app/common/PFCColors";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { styles } from "./TemplatePlanManager";
import { FoodIngredient } from "../api/types";
import SearchableFoodSelect from "@/app/common/inputs/SearchableFoodSelect";
import { useState } from "react";
import CustomBadges from "./CustomBadges";
import useDietPlanStore from "./dietplansStore";
import { getTotalFoodItemMarcos } from "../utils";

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
  mealId?: string;
  name: string;
  description: string;
  onDelete?: (id: string) => void;
  isNew?: boolean;
  macros?: {
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
  const { updateActiveFoodItemQuantity, setSubSectionInSection } =
    useDietPlanStore();

  return (
    <Flex
      direction={"row"}
      justifyContent={"space-between"}
      bg={PFCColors.WHITE}
      p="12px"
      borderRadius={"4px"}
      boxShadow="0px 1.69px 1.69px 0px rgba(24, 34, 48, 0.10)"
      zIndex={props.style?.zIndex}
      gap={"10px"}
    >
      <Flex direction={"column"} justifyContent={"space-between"} width={"60%"}>
        <Box width={"100%"}>
          <SearchableFoodSelect
            onSelect={(foodItem: FoodIngredient) => {
              setSelected(foodItem);
              setSubSectionInSection(props.mealId!, props.id!, {
                id: foodItem.id,
                name: foodItem.name,
                description: foodItem.description,
                quantity: 1 as unknown as number,
                unit: foodItem.unit_of_measure as unknown as string,
                foodItem: foodItem,
              });
            }}
            selected={selected}
            isLoadingOptions={false}
            options={[]}
          />
        </Box>
        <Flex direction={"row"} justifyContent={"space-between"} width={"100%"}>
          <CustomBadges macros={props.macros} />
        </Flex>
        <Text fontSize={"12px"}>{props.description}</Text>
      </Flex>
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        width={"40%"}
      >
        <Flex direction={"column"} alignItems={"flex-end"}>
          <InputGroup>
            <Input
              placeholder="Quantity"
              value={0}
              onChange={(event) => {
                updateActiveFoodItemQuantity(
                  props.id!,
                  event.target.value as unknown as number
                );
              }}
            />
            <InputRightAddon background={"white"}>
              <Badge
                colorScheme="white"
                alignItems={"center"}
                justifyContent={"center"}
                justifyItems={"center"}
                display={"flex"}
                p="1"
                gap={"2px"}
                width={"100%"}
              >
                <Text>{props.unit}</Text>
              </Badge>
            </InputRightAddon>
          </InputGroup>
        </Flex>
      </Flex>
    </Flex>
  );
};
