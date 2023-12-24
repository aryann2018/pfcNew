// Import the Template type from a dynamic path based on the plan ID
import { TemplateSubSection } from "../[id]/FoodItemSubSection";
import { TemplateSection } from "../[id]/MealPlanSection";
import { Template } from "../[id]/TemplatePlanManager";
import { FoodIngredient } from "../api/types";

// Constants for common units
const UNIT_SERVING = "serving";
const UNIT_BOWL = "bowl";
const UNIT_PLATE = "plate";
const UNIT_CUP = "cup";

// Functions to create food items, subsections, sections, and templates
function createFoodItem(foodData: any): FoodIngredient {
  return { ...foodData };
}

function createTemplateSubSection(subSectionData: any): TemplateSubSection {
  return {
    ...subSectionData,
    foodItem: createFoodItem(subSectionData.foodItem),
  };
}

function createTemplateSection(sectionData: any): TemplateSection {
  return {
    ...sectionData,
    subSections: sectionData.subSections.map(createTemplateSubSection),
  };
}

function createTemplate(templateData: any): Template {
  return {
    ...templateData,
    sections: templateData.sections.map(createTemplateSection),
  };
}

// Define templates with multiple sections and subsections
export const templates: Template[] = [
  createTemplate({
    id: "keto001",
    name: "Ultimate Keto Diet",
    description:
      "A low-carb, high-fat diet designed to achieve ketosis and burn fat efficiently.",
    sections: [
      createTemplateSection({
        id: "keto-breakfast",
        name: "Breakfast",
        description: "Start your day with a ketogenic boost.",
        subSections: [
          createTemplateSubSection({
            name: "Keto Pancakes",
            description: "Low-carb pancakes topped with berries and cream.",
            macros: { protein: 8, fat: 20, carbs: 5, calories: 250 },
            quantity: 3,
            unit: UNIT_SERVING,
            foodItem: {
              id: "almond-flour",
              // ...additional almond flour details
            },
          }),
          createTemplateSubSection({
            name: "Avocado Smoothie",
            description: "A creamy smoothie with avocado and coconut milk.",
            macros: { protein: 4, fat: 15, carbs: 8, calories: 180 },
            quantity: 1,
            unit: UNIT_CUP,
            foodItem: {
              id: "cff68812-0405-4243-908d-947de9609a46",
              // ...additional avocado details
            },
          }),
        ],
      }),
      // ... additional sections for lunch, dinner, snacks
    ],
  }),

  createTemplate({
    id: "vegan002",
    name: "Plant-Powered Health",
    description: "A diverse and balanced diet entirely based on plant sources.",
    sections: [
      createTemplateSection({
        id: "vegan-lunch",
        name: "Lunch",
        description: "Nutritious and delicious vegan midday meals.",
        subSections: [
          createTemplateSubSection({
            name: "Chickpea Salad",
            description: "A hearty salad with chickpeas, veggies, and herbs.",
            macros: { protein: 10, fat: 10, carbs: 30, calories: 280 },
            quantity: 1,
            unit: UNIT_BOWL,
            foodItem: {
              id: "chickpeas",
              // ...additional chickpea details
            },
          }),
          // ... additional subsections
        ],
      }),
      // ... additional sections for breakfast, dinner, snacks
    ],
  }),

  createTemplate({
    id: "balanced003",
    name: "Balanced Diet Plan",
    description:
      "A balanced diet with a healthy mix of carbohydrates, proteins, and fats.",
    sections: [
      createTemplateSection({
        id: "balanced-dinner",
        name: "Dinner",
        description: "Enjoy a balanced and fulfilling end to your day.",
        subSections: [
          createTemplateSubSection({
            name: "Grilled Salmon with Quinoa",
            description: "Grilled salmon over a bed of quinoa and greens.",
            macros: { protein: 30, fat: 15, carbs: 35, calories: 400 },
            quantity: 1,
            unit: UNIT_PLATE,
            foodItem: {
              id: "salmon",
              // ...additional salmon details
            },
          }),
          // ... additional subsections
        ],
      }),
      // ... additional sections for breakfast, lunch, snacks
    ],
  }),

  // ... add two more templates with unique sections and subsections
];

export default templates;
