"use client";
import TemplatePlanManager, { Template } from "./TemplatePlanManager";

import { useGetDietPlanTemplates, useGetFoodIngredients } from "../api/hooks";

import { useRouter } from "next/navigation";
import { templates as mocktemplates } from "../api/mocks";
import useDietPlanStore from "./dietplansStore";
import { useEffect } from "react";
import { templateFromDietPlanTemplate } from "../api/adapters";
import { useFoodIngridientsStore } from "@/app/common/inputs/SearchableFoodSelect";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const { data, error, isLoading } = useGetDietPlanTemplates();

  const { searchTerm, setFoodIngridients } = useFoodIngridientsStore();
  const { data: foodIngridientsData, isLoading: foodIngridientsLoading } =
    useGetFoodIngredients(searchTerm);

  const router = useRouter();

  const { setActiveTemplate, templates, setTemplates } = useDietPlanStore();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (error) {
      return;
    }
    if (!data || !data.data) {
      return;
    }

    const newTemplates = data.data.map((template) =>
      templateFromDietPlanTemplate(template)
    );
    setTemplates(newTemplates);
    setActiveTemplate(newTemplates[0].id);
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      !foodIngridientsLoading &&
      foodIngridientsData &&
      foodIngridientsData.data
    ) {
      setFoodIngridients(foodIngridientsData.data);
    }
  }, [foodIngridientsLoading, foodIngridientsData]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.data) {
    return <div>No data</div>;
  }

  const onAssignPress = () => {
    router.push(`/dashboard/clients/${props.clientId}/`);
  };

  return (
    <TemplatePlanManager
      isNew={props.isNew}
      onAssignPress={onAssignPress}
      templates={templates}
      onAddNewFoodItem={() => {}}
    />
  );
};
