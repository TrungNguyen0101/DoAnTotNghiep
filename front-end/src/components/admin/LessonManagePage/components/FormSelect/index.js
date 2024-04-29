import React from "react";
import { Select } from "antd";
import "./styled.css";

const FormSelect = ({ setSelectValue, onChange }) => {
  //   const onChange = (value) => {
  //     setSelectValue(value);
  //     console.log(`selected ${value}`);
  //   };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <Select
      showSearch
      placeholder="Select lesson"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={[
        {
          value: "alphabet",
          label: "Learn Alphabet",
        },
        {
          value: "number",
          label: "Learn Number",
        },
        {
          value: "color",
          label: "Learn Color",
        },
        {
          value: "animal",
          label: "Learn Animal",
        },
      ]}
    />
  );
};
export default FormSelect;
