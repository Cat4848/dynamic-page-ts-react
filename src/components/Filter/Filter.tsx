import Select from "react-select";
import { useController, useForm } from "react-hook-form";

interface FilterProps {
  onFilter: (filter: string) => void
}

export function Filter({ onFilter }: FilterProps) {
  const { control } = useForm();

  const {
    field: { value: selectValue, onChange: selectOnChange, ...restSelectField }
  } = useController({ name: "filter", control });
  const filterOptions = [
    { value: "highRating", label: "High Rating" },
    { value: "medRating", label: "Medium Rating" },
    { value: "lowRating", label: "Low Rating" },
    { value: "all", label: "All" },
  ];

  return (
    <>
      <h4>Filter By</h4>
      <Select
        autoFocus={true}
        placeholder="Filter by"
        defaultValue={{ value: true, label: "All" }}
        options={filterOptions}
        value={
          selectValue
          ? filterOptions.find((filter) => filter.value === selectValue)
          : selectValue
        }
        onChange={(option) => {
          selectOnChange(option ? option.value : option);
          onFilter(option.value);
        }}
        {...restSelectField}
        />
    </>
  );
}
