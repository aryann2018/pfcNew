import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  Button,
} from "@chakra-ui/react";
import EditableText from "@/app/common/inputs/EditableInput";
import useDietPlanStore from "./dietplansStore";

interface DietPlanReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const DietPlanReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
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
          <Button size="lg" onClick={onSubmit}>
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
