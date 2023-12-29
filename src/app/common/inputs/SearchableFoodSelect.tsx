import React from "react";
import { Select, components } from "chakra-react-select";
import { useGetFoodIngredients } from "@/app/dashboard/dietplans/api/hooks";
import { FoodIngredient, FoodItem } from "@/app/dashboard/dietplans/api/types";
import { mergeUniqueObjects } from "@/app/utilities/utils";
import { create } from "zustand";

interface FoodIngridientsStore {
  foodIngridients: FoodIngredient[];
  setFoodIngridients: (foodIngridients: FoodIngredient[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useFoodIngridientsStore = create<FoodIngridientsStore>((set) => ({
  foodIngridients: [],
  setFoodIngridients: (foodIngridients: FoodIngredient[]) =>
    set({ foodIngridients }),
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
  selected?: FoodIngredient;
  onSelect: (value: any) => void;
}

function SearchableFoodSelect({
  selected,
  onSelect,
}: SearchableFoodSelectProps) {
  const { foodIngridients, isLoading } = useFoodIngridientsStore();
  let options = foodIngridients?.map((item: FoodIngredient) => ({
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
        option: (provided: any, state: any) => ({
          ...provided,
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: "500",
          color: "#000000",
          backgroundColor: state.isSelected ? "#E2E8F0" : "#ffffff",
          ":hover": {
            backgroundColor: "#E2E8F0",
          },
          transition: " all 0.3s ease;" /* Smooth transition for all changes */,
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
        onSelect(
          foodIngridients.find((item: FoodIngredient) => item.id === value)
        );
      }}
      hideSelectedOptions={false}
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
