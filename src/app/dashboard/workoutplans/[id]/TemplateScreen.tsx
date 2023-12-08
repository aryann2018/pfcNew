"use client";
import TemplatePlanManager, {
  Template,
} from "@/app/common/TemplatePlanManager";
import { useGetWorkoutPlanTemplates } from "../api/hooks";
import { isOdd } from "@/app/utilities/utils";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const { data, error, isLoading } = useGetWorkoutPlanTemplates();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.data) {
    return <div>No data</div>;
  }

  const templateItems: Template[] = data!.data.map((template) => {
    return {
      id: template.id,
      name: template.name,
      sections: template.workout_templates.map((section) => {
        return {
          description: "",
          rightTopInfo: "",
          id: section.id,
          name: section.name,
          subSections: section.template_exercises.map((subSection) => {
            return {
              id: subSection.id,
              name: subSection.exercise.name,
              description: subSection.exercise.description,
              labels: subSection.sets_and_reps.map((key, index) => {
                return `${isOdd(index) ? "Sets" : "Reps"}: 1}`;
              }),
              onDeleteClick: () => ({}),
              LeftInfo: "hey",
              rightTopInfo: "hey",
            };
          }),
        };
      }),
      description: "",
      rightTopInfo: "",
    };
  });

  return (
    <>
      <TemplatePlanManager
        isNew={props.isNew}
        onAssignPress={(id, value) => {
          console.log(id, value);
        }}
        templateItems={templateItems}
      />
    </>
  );
};
