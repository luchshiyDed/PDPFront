import React, { useState } from 'react';

const InputWithOptions = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [possibleValues, setPossibleValues] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'custom') {
      setSelectedValue('');
    } else {
      setSelectedValue(selectedOption);
    }
  };

  const handleInputChange = (e) => {
    setCustomValue(e.target.value);
    setSelectedValue('custom');
  };

  const handleAddOption = () => {
    if (customValue.trim() !== '' && !possibleValues.includes(customValue)) {
      setPossibleValues([...possibleValues, customValue]);
      setCustomValue('');
    }
  };

  return (
    <div>
      <label>Select an option or enter custom text:</label>
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {possibleValues.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
        <option value="custom">Enter custom text</option>
      </select>

      {selectedValue === 'custom' && (
        <div>
          <input
            type="text"
            value={customValue}
            onChange={handleInputChange}
            placeholder="Enter custom text..."
          />
          <button onClick={handleAddOption}>Add Option</button>
        </div>
      )}

      <p>Selected value: {selectedValue === 'custom' ? customValue : selectedValue}</p>
    </div>
  );
};

export default InputWithOptions;