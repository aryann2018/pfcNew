import { Template } from "./TemplatePlanManager";

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const EMPTY_TEMPLATE: Template = {
  id: "",
  name: "",
  description: "",
  sections: weekdays.map((day) => ({
    id: "",
    name: day,
    subSections: [],
    preffered_day_of_week: day.toLowerCase(),
    isNew: true,
    description: `{% for exercise in exercises %}\n  {% if exercise.day == "${day.toLowerCase()}" %}\n    {{ exercise.name }}\n  {% endif %}\n{% endfor %}`,
  })),
};
