import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MacrosTicker } from "./MacrosTIcker";
import { MealPlanSection, TemplateSection } from "./MealPlanSection";
import useDietPlanStore from "./dietplansStore";
import {
  getTotalMealPlanMacros,
  getTotalSectionMacros,
  getTotalTemplateMacros,
} from "../utils";
import { AddNewMealButton } from "./AddNewMealButton";

/* selectItem */
interface TemplateSelectItemProps {
  label: string;
  value: string;
  onClick: (value: string) => void;
}

const TemplateSelectItem = (props: TemplateSelectItemProps) => {
  return (
    <option onClick={() => props.onClick(props.value)} value={props.value}>
      <Text>{props.label}</Text>
    </option>
  );
};

/* select */
interface TemplateSelectProps {
  items: TemplateSelectItemProps[];
  onClick: (value: string) => void;
}

const TemplateSelect = (props: TemplateSelectProps) => {
  return (
    <Select
      variant={"filled"}
      maxWidth={"50%"}
      style={{
        borderRadius: "8px",
        background: "#EAECF0",
        fontSize: "24px",
        fontWeight: "600",
      }}
    >
      {props.items.map((item) => (
        <TemplateSelectItem
          key={item.value}
          label={item.label}
          value={item.value}
          onClick={props.onClick}
        />
      ))}
    </Select>
  );
};

/* templatePlanManager */
interface TemplatePlanManagerProps {
  isNew: boolean;
  onAssignPress: (template_id: string, template: any) => void;
  templates: Template[];
  onAddNewFoodItem: () => void;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  sections: TemplateSection[];
}

const TemplatePlanManager = (props: TemplatePlanManagerProps) => {
  const {
    activeTemplate,
    setActiveTemplate,
    removeSectionFromActiveTemplate,
    addNewSectionToActiveTemplate,
  } = useDietPlanStore();

  console.log("activeTemplate", activeTemplate);
  const templateSelectItems = props.templates.map((template) => {
    return {
      label: template.name,
      value: template.id,
    };
  });

  const activeTemplateMacros = getTotalTemplateMacros(activeTemplate!);

  if (props.isNew) {
    return (
      <Box>
        <HStack>
          <TemplateSelect
            items={templateSelectItems.map((item) => ({
              ...item,
              onClick: (value) => {
                const template = props.templates.find(
                  (template) => template.id === value
                );
                if (template) {
                  setActiveTemplate(value);
                }
              },
            }))}
            onClick={(value) => {
              const template = props.templates.find(
                (template) => template.id === value
              );
              if (template) {
                setActiveTemplate(value);
              }
            }}
          />
          <Spacer />
          <MacrosTicker
            protien={activeTemplateMacros.protein!}
            fat={activeTemplateMacros.fat!}
            carbs={activeTemplateMacros.carbs!}
            calories={activeTemplateMacros.calories!}
          />
        </HStack>
        <Box p={2} />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {activeTemplate?.sections.map((section) => (
            <div style={{ position: "relative" }} key={section.id}>
              <GridItem
                key={section.id}
                {...styles.section}
                _hover={{
                  ".close-button": {
                    display: "block",
                  },
                }}
              >
                <MealPlanSection
                  key={section.id}
                  {...section}
                  macros={getTotalSectionMacros(section)}
                />
                <CloseButton
                  className="close-button"
                  size="md"
                  position="absolute"
                  display={"none"}
                  top={"-10px"}
                  right={"-20px"}
                  background={"black"}
                  color={"white"}
                  borderRadius={"50%"}
                  zIndex={100}
                  onClick={() => {
                    removeSectionFromActiveTemplate(section.id);
                  }}
                  cursor={"pointer"}
                />
              </GridItem>
            </div>
          ))}
        </Grid>
        <Box p={2} />
        <Flex direction={"row"} justifyContent={"center"}>
          <AddNewMealButton
            onClick={() => {
              addNewSectionToActiveTemplate();
            }}
          />
        </Flex>
        <Divider />
        <Flex p="4" direction="row" justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              props.onAssignPress(activeTemplate?.id!, activeTemplate);
            }}
            {...styles.assignButton}
          >
            Assign Chart
          </Button>
        </Flex>
      </Box>
    );
  }
  return <div>TemplatePlanManager</div>;
};

export const styles = {
  select: {
    paddingX: 4,
    paddingY: 2,
    background: "#EAECF0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    display: "inline-flex",
    color: "#101828",
    fontSize: 48,
    fontWeight: "600",
  },

  section: {
    flex: "0 0 48%",
    margin: "5px" /* Optional: Add margin for spacing between items */,
    width: "100%",
    height: "100%",
    padding: "18px",

    background: "#F2F4F7",
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.06)",
    borderRadius: 8,
    overflow: "hidden",
    border: "1px #D0D5DD solid",
  },
  sectionTitle: {
    color: "#344054",
    fontSize: 20,
    fontWeight: 600,
    wordWrap: "break-word",
  },
  subSection: {
    leftInfo: {
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 2,
      paddingBottom: 2,
      background: "#EAECF0",
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      color: "#344054",
      fontSize: 12,
      fontWeight: "600",
      maxHeight: "40px",
    },
    title: {
      color: "#182230",
      fontSize: 20,
      fontWeight: "500",

      wordWrap: "break-word",
    },
  },
  assignButton: {
    background: "#F15C3D",
    color: "white",
    fontSize: 16,
    height: "40px",
    paddingX: "10px",
    paddingY: "16px",
    borderRadius: "8px",
    border: "1px",
  },
};

export default TemplatePlanManager;
