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
import { createRef, RefObject, useEffect, useRef, useState } from "react";
import {
  WeekdaySection,
  TemplateSection,
  SECTION_WIDTH,
} from "./WeekdaySection";

import useWorkoutPlanStore from "./useWorkoutplansStore";
import { WorkoutPlanReviewModal } from "./WorkoutPlanReviewModal";

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

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TemplatePlanManager = (props: TemplatePlanManagerProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<any>();
  const itemRefs = useRef<RefObject<any>[]>(weekdays.map(() => createRef()));

  const { activeTemplate, setActiveTemplate } = useWorkoutPlanStore();

  useEffect(() => {
    // scrollToItem(currentIndex);
  }, [currentIndex]);

  const scrollInContainer = (direction: "left" | "right", boost: boolean) => {
    const container = scrollContainerRef.current;
    if (container) {
      if (direction === "right") {
        container.scrollBy({
          left: boost ? (SECTION_WIDTH + 40) * 3 : SECTION_WIDTH + 40,
          behavior: boost ? "instant" : "smooth",
        });
      } else if (direction === "left") {
        container.scrollBy({
          left: boost ? -(SECTION_WIDTH + 40) * 3 : -(SECTION_WIDTH + 40),
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToItem = (index: number) => {
    console.log(index, "index");
    const item = itemRefs.current[index]?.current;
    console.log(item, "item");
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const getVisibleItems = () => {
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    return itemRefs.current
      .map((ref, index) => {
        const rect = ref.current.getBoundingClientRect();
        const isFullyVisible =
          rect.left >= containerRect.left && rect.right <= containerRect.right;
        return isFullyVisible ? index : null;
      })
      .filter((index) => index !== null);
  };

  const updateCurrentIndex = (direction: "left" | "right") => {
    const visibleItems = getVisibleItems();
    const currentIndex = visibleItems[visibleItems.length - 1];

    if (currentIndex === undefined || currentIndex === null) {
      return setCurrentIndex(0);
    }

    if (direction === "right") {
      const nextIndex = currentIndex + 1;

      if (nextIndex < weekdays.length) {
        setCurrentIndex(nextIndex);
      }
    } else if (direction === "left") {
      const prevIndex = (visibleItems[0] as number) - 1;
      console.log(prevIndex, "prevIndex");
      if (prevIndex < weekdays.length) {
        setCurrentIndex(prevIndex);
      }
    }
  };

  const scrollRight = (isDoubleClick: boolean) => {
    scrollInContainer("right", isDoubleClick);
  };

  const scrollLeft = (isDoubleClick: boolean) => {
    scrollInContainer("left", isDoubleClick);
  };

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
        </HStack>
        <Box p={2} />
        {/* a container with a scrollable horizontal list of weekday sections */}
        <Flex width={"100%"} justifyContent={"center"}>
          <Button
            onClick={() => scrollLeft(false)}
            onDoubleClick={() => {
              scrollLeft(true);
            }}
          >
            Left
          </Button>
          <Box
            ref={scrollContainerRef}
            style={{
              overflowX: "scroll",
              overflowY: "hidden",
              width: "100%",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
            }}
          >
            <Grid
              templateColumns={`repeat(7, ${SECTION_WIDTH}px)`}
              gap={0}
              style={{ width: "100%" }}
            >
              {weekdays.map((weekday, index) => (
                <GridItem
                  key={weekday}
                  {...styles.section}
                  ref={itemRefs.current[index]}
                >
                  <Text {...styles.sectionTitle}>{weekday}</Text>
                  <Box p={2} />
                  <Divider />
                  <Box p={2} />
                  {/* <WeekdaySection
                  sections={activeTemplate?.sections.filter(
                    (section) => section.day === weekday
                  )}
                /> */}
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Button
            onClick={() => scrollRight(false)}
            onDoubleClick={() => scrollRight(true)}
          >
            Right
          </Button>
        </Flex>

        <Box p={2} />
        <Divider />
        {isReviewModalOpen && (
          <WorkoutPlanReviewModal
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
