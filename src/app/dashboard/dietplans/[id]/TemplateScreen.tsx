"use client";
import TemplatePlanManager, { Template } from "./TemplatePlanManager";

import { useGetDietPlanTemplates, useGetFoodIngredients } from "../api/hooks";

import {
  getTotalDietPlanCalories,
  getTotalFoodItemCalories,
  getTotalMealPlanCalories,
} from "../utils";
import { useRouter } from "next/navigation";
import { templates } from "../api/mocks";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const { data, error, isLoading } = useGetDietPlanTemplates();

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.data) {
    return <div>No data</div>;
  }

  return (
    <TemplatePlanManager
      isNew={props.isNew}
      onAssignPress={(id, value) => {
        router.push(`/dashboard/clients/${props.clientId}/`);
      }}
      templates={templates}
      onAddNewFoodItem={() => {}}
    />
  );
};
