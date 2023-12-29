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

interface SearchableFoodSelectProps {
  isLoadingOptions: boolean;
  selected?: ExerciseType;
  onSelect: (value: any) => void;
}

function SearchableFoodSelect({
  selected,
  onSelect,
}: SearchableFoodSelectProps) {
  const { exercises, setSearchTerm, isLoading } = useExercisesStore();

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
        placeholder: (provided: any) => ({
          ...provided,
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: "500",
          color: "#000000",
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
        onSelect(exercises.find((item: ExerciseType) => item.id === value));
      }}
      onInputChange={(value) => {
        setSearchTerm(value);
      }}
      // isOptionSelected={(option) => option.value === selected?.id}
      // hideSelectedOptions={false}
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

export default SearchableFoodSelect;
