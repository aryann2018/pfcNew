import { PFCColors } from "@/app/common/PFCColors";
import {
  Badge,
  Box,
  Button,
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
import { useEffect, useState } from "react";
import CustomBadges from "./CustomBadges";
import useDietPlanStore from "./dietplansStore";
import { getTotalFoodItemMarcos, getTotalFoodMacros } from "../utils";
import { createTemplateSubSection } from "../api/mocks";

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
  const [selected, setSelected] = useState<FoodIngredient | undefined>();

  const { updateActiveFoodItemQuantity, setSubSectionInSection } =
    useDietPlanStore();

  const macros = getTotalFoodMacros(props);

  useEffect(() => {
    if (selected) {
      const newSubSection = createTemplateSubSection({
        id: selected.id!,
        foodItem: selected,
        quantity: 1,
        unit: selected.unit_of_measure,
        name: selected.name,
        description: selected.description,
      });

      setSubSectionInSection(props.mealId!, props.id!, newSubSection);
      setSelected(undefined);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

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
            }}
            selected={props.foodItem}
            isLoadingOptions={false}
          />
        </Box>
        <Flex direction={"row"} justifyContent={"space-between"} width={"100%"}>
          <CustomBadges macros={macros} />
        </Flex>
        <Text fontSize={"12px"}>{props.description}</Text>
      </Flex>
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        width={"40%"}
      >
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          fontFamily={"JetBrains Mono"}
        >
          <InputGroup
            style={{
              borderRadius: "4px",
              border: "1px solid #D0D5DD",
            }}
          >
            <Input
              placeholder="Quantity"
              value={Math.round(
                props.quantity * parseFloat(props.foodItem?.portion_size!)
              )}
              onChange={(event) => {
                updateActiveFoodItemQuantity(
                  props.mealId!,
                  props.id!,
                  event.target.value
                    ? parseFloat(event.target.value) /
                        parseFloat(props.foodItem?.portion_size!)
                    : 0
                );
              }}
              style={{ border: "none", outline: "none" }}
            />
            <InputRightAddon
              background={"white"}
              style={{ border: "none", outline: "none" }}
            >
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
          <Box p={1} />
        </Flex>
      </Flex>
    </Flex>
  );
};
