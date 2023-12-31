import { create } from "zustand";
import { Template } from "./TemplatePlanManager";
import { TemplateSubSection } from "./WorkoutExerciseSubSection";

// Define the store's state shape
interface WorkoutPlanTemplate {
  id: string;
  name: string;
  description: string;
  sections: any[]; // Define appropriately based on your data structure
}

interface WorkoutPlanState {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  activeTemplate: Template | null;
  activeTemplateId: string | null;
  setActiveTemplate: (templateId?: string) => void;
  updateActiveTemplateField: (field: string, value: any) => void;
  addSubSectionToActiveTemplate: (foodItem: TemplateSubSection) => void;
  addNewSubSectionToActiveTemplate: (weekday: string) => void;
  setSubSectionInSection: (
    weekday: string,
    subSectionId: string,
    newSubSection: TemplateSubSection
  ) => void;
  updateSubSectionSets: (
    weekday: string,
    subSectionId: string,
    sets: number
  ) => void;
  updateSubSectionReps: (
    weekday: string,
    subSectionId: string,
    reps: number
  ) => void;
  updateTemplateName: (name: string) => void;
  removeSubSectionFromActiveTemplate: (
    weekday: string,
    subSectionId: string
  ) => void;
}

// Create the store

const useWorkoutPlanStore = create<WorkoutPlanState>((set) => ({
  // Initial state
  templates: [], // Populate with your initial templates
  activeTemplate: null,
  activeTemplateId: null,
  setTemplates: (templates: Template[]) => set({ templates }),
  // Sets the active template by ID
  setActiveTemplate: (templateId) =>
    set((state) => ({
      activeTemplate:
        state.templates.find(
          (t) => t.id === templateId || state.templates[0]?.id
        ) || null,
      activeTemplateId: templateId,
    })),

  // Updates fields of the active template
  updateActiveTemplateField: (field, value) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? { ...state.activeTemplate, [field]: value }
        : null,
    })),
  addSubSectionToActiveTemplate: (foodItem: TemplateSubSection) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) => ({
              ...section,
              subSections: [...section.subSections, foodItem],
            })),
          }
        : null,
    })),
  addNewSubSectionToActiveTemplate: (weekday: string) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.find(
              (section) => section.preffered_day_of_week === weekday
            )
              ? state.activeTemplate.sections.map((section) =>
                  section.preffered_day_of_week === weekday
                    ? {
                        ...section,
                        subSections: [
                          ...section.subSections,
                          {
                            id: Math.random().toString(36).substr(2, 9),
                            name: "New Exercise",
                            description: "New Exercise",
                            reps: 1,
                            sets: 1,
                            isNew: true,
                            preffered_day_of_week: weekday,
                            exercise: {
                              id: "new",
                              name: "New Exercise",
                              description: "New Exercise",
                            },
                            rest: 0,
                          },
                        ],
                      }
                    : section
                )
              : [
                  ...state.activeTemplate.sections,
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    name: weekday,
                    description: weekday,
                    subSections: [
                      {
                        id: Math.random().toString(36).substr(2, 9),
                        name: "New Exercise",
                        description: "New Exercise",
                        reps: 1,
                        sets: 1,
                        isNew: true,
                        preffered_day_of_week: weekday,
                        exercise: {
                          id: "new",
                          name: "New Exercise",
                          description: "New Exercise",
                        },
                        rest: 0,
                      },
                    ],
                    preffered_day_of_week: weekday,
                  },
                ],
          }
        : null,
    })),
  setSubSectionInSection: (
    weekday: string,
    subSectionId: string,
    newSubSection: TemplateSubSection
  ) => {
    console.log("setSubSectionInSection", weekday, subSectionId, newSubSection);
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) => {
              console.log("section", section);
              return section.preffered_day_of_week.toLowerCase() === weekday
                ? {
                    ...section,
                    subSections: section.subSections.map((subSection) =>
                      subSection.id === subSectionId
                        ? newSubSection
                        : subSection
                    ),
                  }
                : section;
            }),
          }
        : null,
    }));
  },
  removeSectionFromActiveTemplate: (sectionId: string) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.filter(
              (section) => section.id !== sectionId
            ),
          }
        : null,
    })),
  addNewSectionToActiveTemplate: () =>
    set((state: { activeTemplate: any }) => ({
      ...state,
      activeTemplate: {
        ...state.activeTemplate,
        sections: [
          ...(state.activeTemplate?.sections || []),
          {
            id: Math.random().toString(36).substr(2, 9),
            name: "New Meal",
            description: "New Section",
            subSections: [
              {
                id: Math.random().toString(36).substr(2, 9),
                name: "New Food Item",
                description: "New Food Item",
                quantity: 1,
                unit: "g",
                isNew: true,
                foodItem: {
                  id: "new",
                  name: "New Food Item",
                  description: "New Food Item",
                  unit_of_measure: "-",
                  portion_size: "0",
                  calories: "0",
                  protein: "0",
                  fat: "0",
                  carbohydrates: "0",
                  is_private: false,
                  is_allergen: false,
                  photo: null,
                },
              },
            ],
            isNew: true,
          },
        ],
      },
    })),
  updateSectionName: (sectionId: string, name: string) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    name: name,
                  }
                : section
            ),
          }
        : null,
    })),
  updateTemplateName: (name: string) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            name: name,
          }
        : null,
    })),
  removeSubSectionFromActiveTemplate: (
    weekday: string,
    subSectionId: string
  ) => {
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) =>
              section.preffered_day_of_week === weekday
                ? {
                    ...section,
                    subSections: section.subSections.filter(
                      (subSection) => subSection.id !== subSectionId
                    ),
                  }
                : section
            ),
          }
        : null,
    }));
  },
  updateSubSectionSets: (weekday: string, subSectionId: string, sets: number) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) =>
              section.preffered_day_of_week === weekday
                ? {
                    ...section,
                    subSections: section.subSections.map((subSection) =>
                      subSection.id === subSectionId
                        ? {
                            ...subSection,
                            sets: sets,
                          }
                        : subSection
                    ),
                  }
                : section
            ),
          }
        : null,
    })),
  updateSubSectionReps: (weekday: string, subSectionId: string, reps: number) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) =>
              section.preffered_day_of_week === weekday
                ? {
                    ...section,
                    subSections: section.subSections.map((subSection) =>
                      subSection.id === subSectionId
                        ? {
                            ...subSection,
                            reps: reps,
                          }
                        : subSection
                    ),
                  }
                : section
            ),
          }
        : null,
    })),
}));

export default useWorkoutPlanStore;
