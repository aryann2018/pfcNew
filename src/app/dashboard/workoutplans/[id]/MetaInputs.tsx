import { Flex, Input, InputGroup, Text } from "@chakra-ui/react";
//   in the style of CustomBadges.tsx but rather have inputs for sets, reps, and rest each input
//   having similar color scheme for border and input text color not the label color. also should take props for
//   the inputs and the label.

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
    <Flex direction={"column"} gap={4}>
      <Flex direction={"column"} gap={2}>
        <Text fontSize={"14px"} fontFamily={"JetBrains Mono"} color={"#344054"}>
          Sets
        </Text>
        <InputGroup
          style={{
            borderRadius: "4px",
            border: "1px solid #D0D5DD",
          }}
        >
          <Input
            placeholder="Sets"
            value={sets}
            onChange={(event) => {
              onSetsChange(
                event.target.value ? parseFloat(event.target.value) : 0
              );
            }}
            style={{ border: "none", outline: "none" }}
          />
        </InputGroup>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Text fontSize={"14px"} fontFamily={"JetBrains Mono"} color={"#344054"}>
          Reps
        </Text>
        <InputGroup
          style={{
            borderRadius: "4px",
            border: "1px solid #D0D5DD",
          }}
        >
          <Input
            placeholder="Reps"
            value={reps}
            onChange={(event) => {
              onRepsChange(
                event.target.value ? parseFloat(event.target.value) : 0
              );
            }}
            style={{ border: "none", outline: "none" }}
          />
        </InputGroup>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Text fontSize={"14px"} fontFamily={"JetBrains Mono"} color={"#344054"}>
          Rest
        </Text>
        <InputGroup
          style={{
            borderRadius: "4px",
            border: "1px solid #D0D5DD",
          }}
        >
          <Input
            placeholder="Rest"
            value={rest}
            onChange={(event) => {
              onRestChange(
                event.target.value ? parseFloat(event.target.value) : 0
              );
            }}
            style={{ border: "none", outline: "none" }}
          />
        </InputGroup>
      </Flex>
    </Flex>
  );
};
