import React from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Box,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import {
  FiCheck as CheckIcon,
  FiX as CloseIcon,
  FiEdit3 as EditIcon,
} from "react-icons/fi";

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return (
    <Flex justifyContent="flex-end">
      <ButtonGroup size="sm" isAttached variant="outline">
        {isEditing ? (
          <>
            <IconButton
              icon={<CheckIcon />}
              {...getSubmitButtonProps()}
              aria-label="check-icon"
            />
            <IconButton
              icon={<CloseIcon />}
              {...getCancelButtonProps()}
              aria-label="close-icon"
            />
          </>
        ) : (
          <IconButton
            style={{ border: "none" }}
            icon={<EditIcon />}
            {...getEditButtonProps()}
            aria-label="edit-icon"
          />
        )}
      </ButtonGroup>
    </Flex>
  );
}

function EditableText(props: { defaultValue: string }) {
  // Define common styles for both EditablePreview and EditableInput
  const commonStyles = {
    px: 2, // padding left and right
    py: 1, // padding top and bottom
    borderRadius: "md", // border radius
    fontSize: "22px", // font size
    fontWeight: "bold", // font weight
  };

  const { defaultValue, ...rest } = props;

  return (
    <Editable
      defaultValue={defaultValue}
      isPreviewFocusable
      as={Flex}
      direction={"row"}
      alignItems={"center"}
    >
      <EditablePreview
        {...commonStyles}
        _hover={{
          background: "gray.100", // Light gray background on hover for the preview
        }}
      />
      <EditableInput {...commonStyles} />

      <EditableControls />
    </Editable>
  );
}

export default EditableText;
