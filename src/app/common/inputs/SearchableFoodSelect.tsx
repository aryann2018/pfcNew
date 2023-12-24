import React from "react";
import { Select, components } from "chakra-react-select";
import { useGetFoodIngredients } from "@/app/dashboard/dietplans/api/hooks";
import { FoodIngredient, FoodItem } from "@/app/dashboard/dietplans/api/types";
import { mergeUniqueObjects } from "@/app/utilities/utils";

const SelectOption = ({ children, ...props }: any) => (
  <components.Option {...props}>
    <div>{children}</div>
  </components.Option>
);

interface SearchableFoodSelectProps {
  selected?: FoodIngredient;
  onSelect: (value: any) => void;
}

function SearchableFoodSelect({
  selected,
  onSelect,
}: SearchableFoodSelectProps) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { data, isLoading } = useGetFoodIngredients(searchTerm);

  let options = data?.data?.map((item: FoodIngredient) => ({
    value: item.id,
    label: item.name,
  }));

  options = mergeUniqueObjects(options!);

  return (
    <Select
      useBasicStyles={true}
      styles={{
        container: (provided, state) => ({
          ...provided,
          width: "100%",
          padding: "0px",
          borderRadius: "4px",
          boxShadow: "none",
          zIndex: 0,
        }),
        menu: (provided, state) => ({
          ...provided,
          borderRadius: "4px",
          boxShadow: "none",
          background: "white",
          zIndex: 0,
        }),
        option: (provided, state) => ({
          ...provided,
          color: "black",
          background: state.isSelected ? "#E2E8F0" : "white",
          "&:hover": {
            background: "#E2E8F0",
          },
          zIndex: 0,
        }),
        valueContainer: (provided, state) => ({
          ...provided,
          padding: "0px",
          zIndex: 0,
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: "black",
          zIndex: 0,
        }),
      }}
      isLoading={isLoading}
      selectedOptionStyle="color"
      options={options}
      isOptionSelected={(option) => option.value === selected?.id}
      placeholder={selected?.name}
      isSearchable={true}
      noOptionsMessage={() => "No results found"}
      onChange={(value) => {
        onSelect(value);
      }}
      onInputChange={(value) => {
        setSearchTerm(value);
      }}
      // isOptionSelected={(option) => option.value === selected?.id}
      // hideSelectedOptions={false}
      components={{
        Option: SelectOption,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        SingleValue: (props) => <components.SingleValue {...props} />,
        SelectContainer: (props) => <components.SelectContainer {...props} />,
        MultiValueLabel: (props) => <components.MultiValueLabel {...props} />,
      }}
    />
  );
}

export default SearchableFoodSelect;
