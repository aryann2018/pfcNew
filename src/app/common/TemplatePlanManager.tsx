import { Box, Button, Select, SelectField, Text } from "@chakra-ui/react";
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
    <Select size={"lg"} variant={"filled"}>
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
    <Box>
      <Text>{props.name}</Text>
      <Text>{props.description}</Text>
    </Box>
  );
};

const TemplatePlanSection = (props: TemplateSection) => {
  return (
    <Box>
      <Text>{props.name}</Text>
      <Text>{props.description}</Text>
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
        />

        {template?.sections.map((section) => (
          <TemplatePlanSection key={section.id} {...section} />
        ))}

        <Button onClick={() => {}}>Assign</Button>
      </Box>
    );
  }
  return <div>TemplatePlanManager</div>;
};
export default TemplatePlanManager;
