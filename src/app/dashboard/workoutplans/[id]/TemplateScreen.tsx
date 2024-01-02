"use client";
import TemplatePlanManager, { Template } from "./TemplatePlanManager";

import {
  useGetWorkoutPlanTemplates,
  useGetExercises,
  useMutateWorkoutPlan,
  useMutateWorkoutPlanTemplate,
  useQueryCoachProfile,
} from "../api/hooks";

import { useRouter } from "next/navigation";
import useWorkoutPlanStore from "./useWorkoutplansStore";
import { useEffect } from "react";

import { useExercisesStore } from "@/app/common/inputs/SearchableExerciseSelect";
import { formatDateToYYYYMMDD } from "@/app/utilities/utils";
import {
  getWorkoutPlanPostPayload,
  getWorkoutPlanTemplateFromWorkoutPlan,
  templateFromWorkoutPlanTemplate,
} from "../api/adapters";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const router = useRouter();

  const {
    activeTemplate,
    setActiveTemplate,
    templates,
    setTemplates,
    activeTemplateId,
  } = useWorkoutPlanStore();

  const { searchTerm, setExercises } = useExercisesStore();

  const {
    data,
    error,
    isLoading,
    refetch: refetchTemplates,
  } = useGetWorkoutPlanTemplates();

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
      templateFromWorkoutPlanTemplate(template)
    );

    setTemplates(newTemplates);

    if (!activeTemplate?.id) {
      setActiveTemplate(newTemplates[0].id);
    } else if (activeTemplateId && activeTemplateId !== activeTemplate?.id) {
      setActiveTemplate(activeTemplateId);
    } else {
      setActiveTemplate(newTemplates[0].id);
    }
  }, [isLoading, data]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data: exercisesData, isLoading: exercisesDataLoading } =
    useGetExercises(searchTerm);

  useEffect(() => {
    if (!exercisesDataLoading && exercisesData && exercisesData.data) {
      setExercises(exercisesData.data);
    }
  }, [exercisesDataLoading, exercisesData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setActiveTemplate(undefined);
  }, [props.clientId]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    data: coachProfileData,
    error: coachProfileError,
    isLoading: coachProfileLoading,
  } = useQueryCoachProfile();

  const { mutate: mutateDietPlan } = useMutateWorkoutPlan({
    onSuccess: (data: any) => {
      router.push(`/dashboard/clients/${props.clientId}/`);
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

  const { mutate: mutateDietPlanTemplate } = useMutateWorkoutPlanTemplate({
    onSuccess: async (data: any) => {
      await refetchTemplates();
      setActiveTemplate(data.data.id);
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

  const onAssignPress = () => {
    const dietplan = getWorkoutPlanPostPayload(
      activeTemplate!,
      props.clientId!,
      "1",
      true,
      false
    );

    mutateDietPlan({
      ...dietplan,
      client_id: props.clientId!,
      coach_id: coachProfileData!.user_id,
      is_active: true,
      is_paused: false,
      start_date: formatDateToYYYYMMDD(new Date()),
      duration_in_days: 30,
    });
  };

  const onCreateDietPlanTemplate = async () => {
    const template = getWorkoutPlanTemplateFromWorkoutPlan(activeTemplate!);
    mutateDietPlanTemplate(template);
  };

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
      clientId={props.clientId!}
      onAssignPress={props.clientId ? onAssignPress : onCreateDietPlanTemplate}
      templates={templates}
    />
  );
};
