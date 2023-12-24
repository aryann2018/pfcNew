import React, { useEffect, useState } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

export const NumberTicker = ({ toValue, duration = 1000, unit }: any) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    // Calculate the increment per time to ensure smooth animation
    const increment = toValue / (duration / 10);

    const timer = setInterval(() => {
      start += increment;
      if (start > toValue) {
        setValue(toValue);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, 10);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [toValue, duration]);

  return (
    <Text fontWeight="bold">
      {Math.round(value)}
      {unit ?? ""}
    </Text>
  );
};

interface MacrosTickerProps {
  protien: number;
  fat: number;
  carbs: number;
  calories: number;
  size?: "sm" | "md" | "lg";
}

export const MacrosTicker = (props: MacrosTickerProps) => {
  const { protien, fat, carbs, calories, size } = props;

  return (
    <Flex
      style={{
        fontFamily: "JetBrains Mono",
        fontWeight: "bold",
        fontSize: size === "sm" ? "14px" : size === "md" ? "16px" : "22px",
        borderColor: "#D0D5DD",
        borderWidth: "1px",
        borderRadius: "6.761px",
        marginRight: "8px",
        boxShadow: "0px 1.69px 1.69px 0px rgba(24, 34, 48, 0.10)",
        background:
          "linear-gradient(180deg, rgba(238, 241, 244, 0.50) 0%, rgba(255, 255, 255, 0.50) 45%, rgba(255, 255, 255, 0.50) 58.89%, rgba(238, 241, 244, 0.50) 100%), #FFF;",
      }}
    >
      <Flex
        borderRightWidth={1}
        borderColor={"inherit"}
        background="rgba(244, 235, 255, 0.5)"
        flexDir={"row"}
        padding="8px"
      >
        <Text>P:</Text>
        <Box p={1} />
        <NumberTicker toValue={protien} duration={1000} />
        <Text>g</Text>
      </Flex>
      <Flex
        borderRightWidth={1}
        borderColor={"inherit"}
        background="rgba(254, 228, 226, 0.5)"
        padding="8px"
      >
        <Text>F:</Text>
        <Box p={1} />
        <NumberTicker toValue={fat} duration={1000} />
        <Text>g</Text>
      </Flex>
      <Flex
        borderRightWidth={1}
        borderColor={"inherit"}
        background="rgba(220, 250, 230, 0.5)"
        padding="8px"
      >
        <Text>C:</Text>
        <Box p={1} />
        <NumberTicker toValue={carbs} duration={1000} />
        <Text>g</Text>
      </Flex>
      <Flex padding="8px" gap={2}>
        <Text>
          <NumberTicker toValue={calories} duration={1000} />
        </Text>
        <Text>Kcal</Text>
      </Flex>
    </Flex>
  );
};
