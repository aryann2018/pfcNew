import React from "react";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { NumberTicker } from "./MacrosTIcker";

interface CustomBadgesProps {
  macros?: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
}

function CustomBadges(props: CustomBadgesProps) {
  const badgeStyle = {
    px: "2", // padding left and right
    py: "1", // padding top and bottom
    borderRadius: "4px", // large border radius
    fontWeight: "bold", // bold font
    fontFamily: "JetBrains Mono", // font family
  };

  const { macros = { protein: 0, fat: 0, carbs: 0, calories: 0 } } = props;

  const { protein, fat, carbs, calories } = macros;

  return (
    <Flex gap={"10px"} marginY={"10px"} height={"40px"} width={"100%"}>
      <Badge
        {...badgeStyle}
        colorScheme="gray"
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        display={"flex"}
        p="1"
        gap={"2px"}
        width={"100%"}
      >
        <NumberTicker toValue={calories} duration={1000} />
        <Text>KCal</Text>
      </Badge>
      <Badge
        {...badgeStyle}
        colorScheme="purple"
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        display={"flex"}
        p="1"
        gap={"2px"}
        width={"100%"}
      >
        <Text>P:</Text>
        <NumberTicker toValue={protein} duration={1000} unit="g" />
      </Badge>
      <Badge
        {...badgeStyle}
        colorScheme="red"
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        display={"flex"}
        p="1"
        gap={"2px"}
        width={"100%"}
      >
        <Text>F:</Text>
        <NumberTicker toValue={fat} duration={1000} unit="g" />
      </Badge>
      <Badge
        {...badgeStyle}
        colorScheme="green"
        alignItems={"center"}
        justifyContent={"center"}
        justifyItems={"center"}
        display={"flex"}
        p="1"
        gap={"2px"}
        width={"100%"}
      >
        <Text>C:</Text>
        <NumberTicker toValue={carbs} duration={1000} unit="g" />
      </Badge>
    </Flex>
  );
}

export default CustomBadges;
