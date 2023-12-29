import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Box,
} from "@chakra-ui/react";
import EditableText from "@/app/common/inputs/EditableInput";
import useWorkoutPlanStore from "./useWorkoutplansStore";

interface WorkoutPlanReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isTemplate?: boolean;
}

export const WorkoutPlanReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  ...props
}: WorkoutPlanReviewModalProps) => {
  const { activeTemplate, updateTemplateName } = useWorkoutPlanStore();
  const { name } = activeTemplate!;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review Workout Plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditableText
            defaultValue={name}
            onChange={(text: string) => updateTemplateName(text)}
          />
          <Box mt={4} />
          <Button size="lg" onClick={onSubmit}>
            {props.isTemplate ? "Create Template" : "Assign Workout Plan"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
