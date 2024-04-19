import React, { useState } from "react";
import Select from "react-select";

const colourOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const TestPage = () => {
  const [selectedColors, setSelectedColors] = useState([
    colourOptions[2],
    colourOptions[3],
  ]);
  const [customColor, setCustomColor] = useState("");

  const handleChange = (selectedOptions) => {
    setSelectedColors(selectedOptions);
  };

  const handleInputChange = (newValue) => {
    setCustomColor(newValue);
  };

  const handleCreateOption = () => {
    if (
      customColor.trim() !== "" &&
      !colourOptions.some(
        (option) =>
          option.label.toLowerCase() === customColor.trim().toLowerCase()
      )
    ) {
      setSelectedColors([
        ...selectedColors,
        { label: customColor.trim(), value: customColor.trim() },
      ]);
      setCustomColor("");
    }
  };

  return (
    <Select
      value={selectedColors}
      isMulti
      onChange={handleChange}
      options={colourOptions.concat({ label: customColor, value: customColor })}
      onInputChange={handleInputChange}
      onCreateOption={handleCreateOption}
    />
  );
};

export default TestPage;
