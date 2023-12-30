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
import { createRef, useEffect, useRef, useState } from "react";
import {
  WeekdaySection,
  TemplateSection,
  SECTION_WIDTH,
} from "./WeekdaySection";

import useWorkoutPlanStore from "./useWorkoutplansStore";
import { WorkoutPlanReviewModal } from "./WorkoutPlanReviewModal";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { weekdays } from "./constants";

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

  const scrollContainerRef = useRef<any>();

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemRefs = useRef<any>(weekdays.map(() => createRef()));

  const { activeTemplate, setActiveTemplate } = useWorkoutPlanStore();

  const getVisibleItems = () => {
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    return itemRefs.current
      .map((ref: any, index: number) => {
        const rect = ref.current.getBoundingClientRect();
        const isFullyVisible =
          rect.left >= containerRect.left && rect.right <= containerRect.right;
        return isFullyVisible ? index : null;
      })
      .filter((index: any) => index !== null);
  };

  const updateCurrentIndex = (direction: "left" | "right") => {
    const visibleItems = getVisibleItems();
    if (direction === "right") {
      const nextIndex = visibleItems[visibleItems.length - 1] + 1;
      if (nextIndex < weekdays.length) {
        setCurrentIndex(nextIndex);
      }
    } else if (direction === "left") {
      const prevIndex = visibleItems[0] - 1;
      if (prevIndex >= 0) {
        setCurrentIndex(prevIndex);
      }
    }
  };

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index]?.current;
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    scrollToItem(currentIndex);
  }, [currentIndex]);

  const scrollRight = (isDoubleClick: boolean) => {
    updateCurrentIndex("right");
  };

  const scrollLeft = (isDoubleClick: boolean) => {
    updateCurrentIndex("left");
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
        <Flex width={"100%"} justifyContent={"center"} height="10000px">
          <Button
            onClick={() => scrollLeft(false)}
            onDoubleClick={() => {
              scrollLeft(true);
            }}
            style={{
              borderRadius: "8px 0px 0px 8px",
              borderTop: "1px solid  #D0D5DD",
              borderBottom: " 1px solid #D0D5DD",
              borderLeft: "1px solid #D0D5DD",
              background: "#fff",
              padding: 10,
              borderRightWidth: "0px",
            }}
          >
            <FaArrowLeftLong />
          </Button>
          <Box
            ref={scrollContainerRef}
            style={{
              overflowX: "scroll",
              overflowY: "hidden",
              width: "100%",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
              scrollSnapType: "x mandatory",
              scrollSnapAlign: "right",
              border: "1px solid #D0D5DD",
              borderLeftWidth: "0.5px",
              borderBottom: "none",
              // borderTopWidth: "0.5px",
              height: "100%",
            }}
          >
            <Grid
              templateColumns={`repeat(7, minmax(${SECTION_WIDTH}px, 14fr))`}
              gap={0}
              style={{ width: "100%", height: "100%" }}
            >
              {weekdays.map((weekday, index) => (
                <GridItem
                  key={weekday}
                  {...styles.section}
                  scrollSnapAlign={"start"}
                  ref={itemRefs.current[index]}
                >
                  {/* @ts-ignore */}
                  <Text
                    {...styles.sectionTitle}
                    _firstLetter={{ textTransform: "capitalize" }}
                  >
                    {weekday.toLocaleLowerCase()}
                  </Text>

                  <WeekdaySection
                    key={weekday}
                    weekday={weekday.toLocaleLowerCase()}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Button
            onClick={() => scrollRight(false)}
            onDoubleClick={() => scrollRight(true)}
            style={{
              borderRadius: "0px 8px 8px 0px",
              borderTop: "1px solid  #D0D5DD",
              borderBottom: " 1px solid #D0D5DD",
              borderRight: "1px solid #D0D5DD",
              background: "#fff",
              padding: 10,
            }}
          >
            <FaArrowRightLong />
          </Button>
        </Flex>

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
    width: "100%",
    height: "100%",
    overflow: "hidden",
    border: "0.3px #D0D5DD solid",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    padding: "8px",
    borderBottom: "1px solid #D0D5DD",
    marginBottom: "8px",
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
