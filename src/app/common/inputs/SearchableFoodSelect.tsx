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
  console.log("selected", selected);
  const { foodIngridients, setSearchTerm, isLoading } =
    useFoodIngridientsStore();

  let options = foodIngridients?.map((item: FoodIngredient) => ({
    value: item.id,
    label: item.name,
  }));

  options = mergeUniqueObjects(options!);

  return (
    <Select
      variant="unstyled"
      useBasicStyles={true}
      // styles={{
      //   container: (provided, state) => ({
      //     ...provided,
      //     width: "100%",
      //     padding: "0px",
      //     borderRadius: "4px",
      //     boxShadow: "none",
      //     zIndex: 0,
      //     outline: "none",
      //     border: "none",
      //   }),
      //   menu: (provided, state) => ({
      //     ...provided,
      //     borderRadius: "4px",
      //     boxShadow: "none",
      //     background: "white",
      //     zIndex: 0,
      //   }),
      //   option: (provided, state) => ({
      //     ...provided,
      //     color: "black",
      //     background: state.isSelected ? "#E2E8F0" : "white",
      //     "&:hover": {
      //       background: "#E2E8F0",
      //     },
      //     zIndex: 0,
      //   }),
      //   valueContainer: (provided, state) => ({
      //     // ...provided,
      //     padding: "0px",
      //     zIndex: 0,
      //   }),
      //   placeholder: (provided, state) => ({
      //     ...provided,
      //     color: "black",
      //     zIndex: 0,
      //   }),
      // }}
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
      }}
    />
  );
}

export default SearchableFoodSelect;
