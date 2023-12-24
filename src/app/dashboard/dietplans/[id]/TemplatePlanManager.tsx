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
import { useEffect, useState } from "react";
import { MacrosTicker } from "./MacrosTIcker";
import { MealPlanSection, TemplateSection } from "./MealPlanSection";

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
    <Select variant={"filled"} maxWidth={"50%"}>
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
  rightTopInfo: any;
}

const TemplatePlanManager = (props: TemplatePlanManagerProps) => {
  const [templateId, setTemplateId] = useState<string | null>(null);

  const templateSelectItems = props.templates.map((template) => {
    return {
      label: template.name,
      value: template.id,
    };
  });

  const template: Template | undefined = props.templates.find(
    (template) => template.id === templateId
  );

  useEffect(() => {
    if (props.isNew) {
      if (!templateId) {
        setTemplateId(templateSelectItems[0].value);
      }
    }
  }, [props.isNew, props.templates, templateId, templateSelectItems]);

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
                  setTemplateId(value);
                }
              },
            }))}
            onClick={(value) => {
              setTemplateId(value);
            }}
            {...styles.select}
          />
          <Spacer />
          <MacrosTicker protien={40} fat={70} carbs={20} calories={2990} />
        </HStack>
        <Box p={2} />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {template?.sections.map((section) => (
            <GridItem key={section.id} {...styles.section}>
              <MealPlanSection key={section.id} {...section} />
            </GridItem>
          ))}
        </Grid>
        <Box p={2} />
        <Divider />
        <Flex p="4" direction="row" justifyContent={"flex-end"}>
          <Button
            onClick={() => {
              props.onAssignPress(template?.id!, {});
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
  rightTopInfo: {
    paddingY: 2,
    paddingX: 2,
    background:
      "linear-gradient(0deg, white 0%, white 100%), linear-gradient(180deg, rgba(238, 241, 244, 0.50) 0%, rgba(255, 255, 255, 0.50) 45%, rgba(255, 255, 255, 0.50) 59%, rgba(237.83, 240.67, 243.51, 0.50) 100%)",
    boxShadow:
      "0px 1.7733333110809326px 1.7733333110809326px rgba(24, 34, 48, 0.10)",
    borderRadius: 8,
    border: "1px #D0D5DD solid",
    justifyContent: "center",
    alignItems: "center",

    display: "inline-flex",
    color: "#353849",
    fontSize: 24,
    fontWeight: "600",
    maxHeight: "40px",
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
