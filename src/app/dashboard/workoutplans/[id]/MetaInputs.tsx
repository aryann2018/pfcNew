import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
//   in the style of CustomBadges.tsx but rather have inputs for sets, reps, and rest each input
//   having similar color scheme for border and input text color not the label color. also should take props for
//   the inputs and the label. use InputGroups and InputLeftElements correctly to get the desired effect. the text should
//   be the same color as the input text color. the input border should be the same color as the input text color.
//   the left addon should be text, not an icon. the text should be the same color as the input text color. the colors are rgba(182, 146, 246, 1), rgba(83, 56, 158, 1) and rgba(253, 162, 155, 1) , rgba(145, 32, 24, 1) and rgba(8, 93, 58, 1), rgba(71, 205, 137, 1)

interface MetaInputsProps {
  sets: number;
  reps: number;
  rest: number;
  onSetsChange: (sets: number) => void;
  onRepsChange: (reps: number) => void;
  onRestChange: (rest: number) => void;
}

export const MetaInputs = ({
  sets,
  reps,
  rest,
  onSetsChange,
  onRepsChange,
  onRestChange,
}: MetaInputsProps) => {
  return (
    <Flex direction={"row"} gap={2} fontFamily={"Jetbrains Mono"}>
      <InputGroup
        size="sm"
        borderColor={"#B692F6"}
        borderWidth={"1px"}
        borderRadius={"4px"}
      >
        <InputLeftElement borderRadius={"4px"}>
          <Box p={1} />
          <Text color="rgba(83, 56, 158, 1)" fontWeight={600}>
            Sets
          </Text>
        </InputLeftElement>
        <Input
          type="number"
          value={sets}
          onChange={(e) => onSetsChange(parseInt(e.target.value))}
          bg={"#F3E9FF"}
          color={"rgba(182, 146, 246, 1)"}
          paddingLeft={1 + 46}
        />
      </InputGroup>
      <InputGroup
        size="sm"
        borderColor={"rgba(145, 32, 24, 1)"}
        borderWidth={"1px"}
        borderRadius={"4px"}
      >
        <InputLeftElement borderRadius={"4px"}>
          <Box p={1} />
          <Text color="rgba(145, 32, 24, 1)" fontWeight={600}>
            Reps
          </Text>
        </InputLeftElement>
        <Input
          type="number"
          value={reps}
          onChange={(e) => onRepsChange(parseInt(e.target.value))}
          bg={"rgba(254, 228, 226, 1)"}
          color={"rgba(253, 162, 155, 1)"}
          paddingLeft={1 + 46}
        />
      </InputGroup>
      <InputGroup
        size="sm"
        borderColor={"#47CD89"}
        borderWidth={"1px"}
        borderRadius={"4px"}
      >
        <InputLeftElement borderRadius={"4px"}>
          <Box p={1} />
          <Text color="rgba(8, 93, 58, 1)" fontWeight={600}>
            Rest
          </Text>
        </InputLeftElement>
        <Input
          type="number"
          value={rest}
          onChange={(e) => onRestChange(parseInt(e.target.value))}
          bg={"#D6FDEB"}
          color={"rgba(71, 205, 137, 1)"}
          paddingLeft={1 + 46}
        />
      </InputGroup>
    </Flex>
  );
};
