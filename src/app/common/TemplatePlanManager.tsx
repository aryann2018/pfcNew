import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  SelectField,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface TemplateSubSection {
  id: string;
  name: string;
  description: string;
  labels: string[];
  onDeleteClick: (id: string) => void;
  LeftInfo: any;
  rightTopInfo: any;
}

interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  sections: TemplateSection[];
  rightTopInfo: any;
}

/* selectItem */
interface TemplateSelectItemProps {
  label: string;
  value: string;
  onClick: (value: string) => void;
}

const TemplateSelectItem = (props: TemplateSelectItemProps) => {
  return (
    <option
      //   border="1px solid #EAECF0"
      //   borderRadius="8px"
      //   width="100%"
      //   _hover={{ cursor: "pointer" }}
      onClick={() => props.onClick(props.value)}
      value={props.value}
    >
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

/* templatePlanSubSection */
const TemplatePlanSubSection = (props: TemplateSubSection) => {
  return (
    <Box {...styles.subSection}>
      <Text>{props.name}</Text>
      <Text>{props.description}</Text>
    </Box>
  );
};

const TemplatePlanSection = (props: TemplateSection) => {
  return (
    <Box>
      <HStack justifyContent="space-between" p={2}>
        <Text {...styles.sectionTitle}>{props.name}</Text>
        <Text>{props.description}</Text>
      </HStack>
      {props.subSections.map((subSection) => (
        <TemplatePlanSubSection key={subSection.id} {...subSection} />
      ))}
    </Box>
  );
};

/* templatePlanManager */
interface TemplatePlanManagerProps {
  isNew: boolean;
  onAssignPress: (template_id: string, template: any) => void;
  templateItems: Template[];
}

const TemplatePlanManager = (props: TemplatePlanManagerProps) => {
  const [templateId, setTemplateId] = useState<string | null>(null);

  const templateSelectItems = props.templateItems.map((template) => {
    return {
      label: template.name,
      value: template.id,
    };
  });

  const template: Template | undefined = props.templateItems.find(
    (template) => template.id === templateId
  );

  useEffect(() => {
    if (props.isNew) {
      if (!templateId) {
        setTemplateId(templateSelectItems[0].value);
      }
    }
  }, [props.isNew, props.templateItems, templateId, templateSelectItems]);

  if (props.isNew) {
    return (
      <Box>
        <HStack>
          <TemplateSelect
            items={templateSelectItems.map((item) => ({
              ...item,
              onClick: (value) => {
                const template = props.templateItems.find(
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
          <Box {...styles.rightTopInfo}>
            <Text>{template?.rightTopInfo}</Text>
          </Box>
        </HStack>
        <Box p={2} />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {template?.sections.map((section) => (
            <GridItem key={section.id} {...styles.section}>
              <TemplatePlanSection key={section.id} {...section} />
            </GridItem>
          ))}
        </Grid>
        <Box p={2} />
        <Divider />
        <Box p="4" display="flex" alignItems={"flex-end"}>
          <Button onClick={() => {}} {...styles.AssignButton}>
            Assign
          </Button>
        </Box>
      </Box>
    );
  }
  return <div>TemplatePlanManager</div>;
};

const styles = {
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
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 30,
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
    fontFamily: "Inter",
    fontWeight: 600,
    wordWrap: "break-word",
  },
  subSection: {},
  AssignButton: {},
};

export default TemplatePlanManager;
