import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { MealPlanSection, TemplateSection } from "./MealPlanSection";
import { DietPlanReviewModal } from "./workoutplanReviewModal";
import useWorkoutPlanStore from "./useWorkoutplansStore";

/* selectItem */
interface TemplateSelectItemProps {
  label: string;
  value: string;
}

const TemplateSelectItem = (props: TemplateSelectItemProps) => {
  return (
    <option value={props.value}>
      <Text>{props.label}</Text>
    </option>
  );
};

/* select */
interface TemplateSelectProps {
  items: TemplateSelectItemProps[];
  onChange: (value: string) => void;
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
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
    >
      {props.items.map((item) => (
        <TemplateSelectItem
          key={item.value}
          label={item.label}
          value={item.value}
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
  clientId?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  sections: TemplateSection[];
}

const TemplatePlanManager = (props: TemplatePlanManagerProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { activeTemplate, setActiveTemplate } = useWorkoutPlanStore();

  const templateSelectItems = props.templates.map((template) => {
    return {
      label: template.name,
      value: template.id,
    };
  });

  if (props.isNew) {
    return (
      <Box>
        <HStack>
          <TemplateSelect
            items={templateSelectItems.map((item) => ({
              ...item,
            }))}
            onChange={(value) => {
              const template = props.templates.find(
                (template) => template.id === value
              );
              console.log(template, "template");
              if (template) {
                setActiveTemplate(value);
              }
            }}
          />
          <Spacer />
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
                <MealPlanSection key={section.id} {...section} />
              </GridItem>
            </div>
          ))}
        </Grid>
        <Box p={2} />
        <Divider />
        <Flex p="4" direction="row" justifyContent={"flex-end"}>
          {!props.clientId && (
            <Button
              onClick={() => {
                setIsReviewModalOpen(true);
              }}
              {...styles.assignButton}
            >
              Create Template
            </Button>
          )}
          {props.clientId && (
            <Button
              onClick={() => {
                setIsReviewModalOpen(true);
              }}
              {...styles.assignButton}
            >
              Assign Chart
            </Button>
          )}
        </Flex>
        {isReviewModalOpen && (
          <DietPlanReviewModal
            isOpen={isReviewModalOpen}
            onClose={() => {
              props.onAssignPress(activeTemplate?.id!, activeTemplate);
              setIsReviewModalOpen(false);
            }}
            onSubmit={() => {
              props.onAssignPress(activeTemplate?.id!, activeTemplate);
              setIsReviewModalOpen(false);
            }}
            isTemplate={props.clientId ? false : true}
          />
        )}
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
