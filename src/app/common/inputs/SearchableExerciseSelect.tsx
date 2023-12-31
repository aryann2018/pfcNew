import React from "react";
import { Select, components } from "chakra-react-select";
import { mergeUniqueObjects } from "@/app/utilities/utils";
import { create } from "zustand";
import { ExerciseType } from "@/app/dashboard/workoutplans/api/types";
interface ExercisesStore {
  exercises: ExerciseType[];
  setExercises: (Exercises: ExerciseType[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useExercisesStore = create<ExercisesStore>((set) => ({
  exercises: [],
  setExercises: (exercises: ExerciseType[]) => set({ exercises }),
  searchTerm: "",
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

const SelectOption = ({ children, ...props }: any) => (
  <components.Option {...props}>
    <div>{children}</div>
  </components.Option>
);

interface SearchableExerciseSelectProps {
  isLoadingOptions: boolean;
  selected?: ExerciseType;
  onSelect: (value: any) => void;
}

function SearchableExerciseSelect({
  selected,
  onSelect,
}: SearchableExerciseSelectProps) {
  const { exercises, isLoading } = useExercisesStore();

  let options = exercises?.map((item: ExerciseType) => ({
    value: item.id,
    label: item.name,
  }));

  options = mergeUniqueObjects(options!);

  return (
    <Select
      variant="unstyled"
      useBasicStyles={true}
      styles={{
        valueContainer: (provided: any) => ({
          ...provided,
          padding: "0px",
          paddingLeft: "0px",
          width: "100px",
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: "500",
          color: "#182230",
        }),
        placeholder: (provided: any) => ({
          ...provided,
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: "500",
          color: "#182230",
        }),
        dropdownIndicator: (provided: any) => ({
          ...provided,
          color: "#182230",
          display: "inline",
        }),
        singleValue: (provided: any) => ({
          ...provided,
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: "500",
          color: "#182230",
        }),
      }}
      isLoading={isLoading}
      selectedOptionStyle="color"
      options={options}
      isOptionSelected={(option) => {
        return option.value === selected?.id;
      }}
      placeholder={selected?.name}
      isSearchable={true}
      noOptionsMessage={() => "No results found"}
      onChange={({ value }: any) => {
        console.log(value);
        onSelect(exercises.find((item: ExerciseType) => item.id === value));
      }}
      components={{
        Option: SelectOption,
        IndicatorSeparator: () => null,
        SingleValue: (props) => <components.SingleValue {...props} />,
        SelectContainer: (props) => <components.SelectContainer {...props} />,
        MultiValueLabel: (props) => <components.MultiValueLabel {...props} />,
        Placeholder: (props) => <components.Placeholder {...props} />,
      }}
    />
  );
}

export default SearchableExerciseSelect;
