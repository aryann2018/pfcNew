"use client";
import TemplatePlanManager, { Template } from "./TemplatePlanManager";

import {
  useGetDietPlanTemplates,
  useGetFoodIngredients,
  useMutateDietPlan,
  useQueryCoachProfile,
} from "../api/hooks";

import { useRouter } from "next/navigation";
import { templates as mocktemplates } from "../api/mocks";
import useDietPlanStore from "./dietplansStore";
import { useEffect } from "react";
import {
  getDietPlanPostPayload,
  templateFromDietPlanTemplate,
} from "../api/adapters";
import { useFoodIngridientsStore } from "@/app/common/inputs/SearchableFoodSelect";
import { formatDateToYYYYMMDD } from "@/app/utilities/utils";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const { data, error, isLoading } = useGetDietPlanTemplates();
  const {
    data: coachProfileData,
    error: coachProfileError,
    isLoading: coachProfileLoading,
  } = useQueryCoachProfile();
  const { searchTerm, setFoodIngridients } = useFoodIngridientsStore();
  const { data: foodIngridientsData, isLoading: foodIngridientsLoading } =
    useGetFoodIngredients(searchTerm);

  const { mutate } = useMutateDietPlan({
    onSuccess: (data: any) => {
      console.log("data", data);
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });
  const router = useRouter();

  const { activeTemplate, setActiveTemplate, templates, setTemplates } =
    useDietPlanStore();

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
    const dietplan = getDietPlanPostPayload(
      activeTemplate!,
      props.clientId!,
      "1",
      true,
      false
    );

    mutate({
      ...dietplan,
      client_id: props.clientId!,
      coach_id: coachProfileData!.user_id,
      is_active: true,
      is_paused: false,
      start_date: formatDateToYYYYMMDD(new Date()),
      duration_in_days: 30,
    });
    // router.push(`/dashboard/clients/${props.clientId}/`);
  };

  return (
    <TemplatePlanManager
      isNew={props.isNew}
      onAssignPress={onAssignPress}
      templates={templates}
    />
  );
};
