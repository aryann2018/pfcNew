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
import useDietPlanStore from "./dietplansStore";

interface DietPlanReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isTemplate?: boolean;
}

export const DietPlanReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  ...props
}: DietPlanReviewModalProps) => {
  const { activeTemplate, updateTemplateName } = useDietPlanStore();
  const { name } = activeTemplate!;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review Diet Plan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditableText
            defaultValue={name}
            onChange={(text: string) => updateTemplateName(text)}
          />
          <Box mt={4} />
          <Button size="lg" onClick={onSubmit}>
            {props.isTemplate ? "Create Template" : "Assign Diet Plan"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
