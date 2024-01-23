import { Image } from "@chakra-ui/react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import useDietPlanStore from "./dietplansStore";
import { TemplateSection } from "./MealPlanSection";
import { TemplateSubSection } from "./FoodItemSubSection";
import { getTotalFoodMacros } from "../utils";

interface FoodItemProps {
  food: TemplateSubSection;
}

const FoodItem = ({ food }: FoodItemProps) => {
  const macros = getTotalFoodMacros(food);

  return (
    <Box p={3} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <HStack>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={food.foodItem?.photo || "/images/food-placeholder.svg"}
          alt={food.name}
        />
        <VStack align="start">
          <Text fontWeight="bold">{food.name}</Text>
          <Text fontSize="sm">
            Qty:
            {Math.round(
              food.quantity * parseFloat(food.foodItem?.portion_size!)
            )}{" "}
            {food.foodItem?.unit_of_measure}
          </Text>
          <Text fontSize="sm">{macros.calories} Kcal</Text>
          <HStack>
            <Text fontSize="sm">P {macros.protein} gm</Text>
            <Text fontSize="sm">F {macros.fat} gm</Text>
            <Text fontSize="sm">C {macros.carbs} gm</Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const PDFHeader = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="10px"
      width="100%"
      height="100%"
      padding="18px"
      boxShadow="0px 1px 2px rgba(16, 24, 40, 0.06)"
      borderRadius={8}
      overflow="clip"
      background={"#101828"}
    >
      <Image src="/images/logo.svg" alt="Logo" height={"40px"} />
    </Box>
  );
};

const TemplatePdf = (props: any) => {
  const { templatePdfRef } = props;

  const { activeTemplate } = useDietPlanStore();

  return (
    <div
      style={{
        display: "none",
      }}
    >
      <div
        id="template-pdf"
        ref={templatePdfRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          height: "100%",
          padding: "18px",
          boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.06)",
          borderRadius: 8,
          overflow: "clip",
        }}
      >
        <PDFHeader />
        {activeTemplate?.sections.map(
          (meal: TemplateSection, index: number) => (
            <div key={index}>
              <Text fontSize="xl" fontWeight="bold">
                {meal.name}
              </Text>
              <Box
                display="flex"
                flexDirection={"column"}
                gap={"10px"}
                marginTop={"10px"}
              >
                {meal.subSections.map(
                  (food: TemplateSubSection, index: number) => (
                    <FoodItem key={index} food={food} />
                  )
                )}
              </Box>
              <div className="html2pdf__page-break"></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TemplatePdf;
