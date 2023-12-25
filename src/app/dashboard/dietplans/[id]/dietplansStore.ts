import { create } from "zustand";
import { Template } from "./TemplatePlanManager";
import { TemplateSubSection } from "./FoodItemSubSection";

// Define the store's state shape
interface DietPlanTemplate {
  id: string;
  name: string;
  description: string;
  sections: any[]; // Define appropriately based on your data structure
}

interface DietPlanState {
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
  activeTemplate: Template | null;
  setActiveTemplate: (templateId: string) => void;
  updateActiveTemplateField: (field: string, value: any) => void;
  updateActiveFoodItemQuantity: (foodItemId: string, quantity: number) => void;
  addSubSectionToActiveTemplate: (foodItem: TemplateSubSection) => void;
  addNewSubSectionToActiveTemplate: (sectionId: any) => void;
  setSubSectionInSection: (
    sectionId: string,
    subSectionId: string,
    newSubSection: TemplateSubSection
  ) => void;
  removeSectionFromActiveTemplate: (sectionId: string) => void;
  addNewSectionToActiveTemplate: () => void;
}

// Create the store
const useDietPlanStore = create<DietPlanState>((set) => ({
  // Initial state
  templates: [], // Populate with your initial templates
  activeTemplate: null,
  setTemplates: (templates: Template[]) => set({ templates }),
  // Sets the active template by ID
  setActiveTemplate: (templateId) =>
    set((state) => ({
      activeTemplate: state.templates.find((t) => t.id === templateId) || null,
    })),

  // Updates fields of the active template
  updateActiveTemplateField: (field, value) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? { ...state.activeTemplate, [field]: value }
        : null,
    })),
  updateActiveFoodItemQuantity: (foodItemId, quantity) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) => ({
              ...section,
              subSections: section.subSections.map((subSection) =>
                subSection.id === foodItemId
                  ? { ...subSection, quantity }
                  : subSection
              ),
            })),
          }
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
  addNewSubSectionToActiveTemplate: (sectionId: any) =>
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    subSections: [
                      ...section.subSections,
                      {
                        id: Math.random().toString(36).substr(2, 9),
                        name: "New Food Item",
                        description: "New Food Item",
                        quantity: 0,
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
                  }
                : section
            ),
          }
        : null,
    })),
  setSubSectionInSection: (
    sectionId: string,
    subSectionId: string,
    newSubSection: TemplateSubSection
  ) => {
    console.log(
      "setSubSectionInSection",
      sectionId,
      subSectionId,
      newSubSection
    );
    set((state) => ({
      activeTemplate: state.activeTemplate
        ? {
            ...state.activeTemplate,
            sections: state.activeTemplate.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    subSections: section.subSections.map((subSection) =>
                      subSection.id === subSectionId
                        ? newSubSection
                        : subSection
                    ),
                  }
                : section
            ),
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
                quantity: 0,
                unit: "g",
                isNew: true,
              },
            ],
            isNew: true,
          },
        ],
      },
    })),
}));

export default useDietPlanStore;
