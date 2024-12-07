import React, { useState } from 'react';
import styled from 'styled-components';

// Define colors for the dropdown
const colors = {
  primary: '#0a0a0a',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
};

// Styled components for dropdown
const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid ${colors.secondary};
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  font-size: 1rem;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 150px;
  overflow-y: auto;
  background-color: ${colors.primary}; /* Black background */
  border: 1px solid ${colors.secondary};
  border-radius: 4px;
  z-index: 1;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Option = styled.li`
  padding: 0.75rem;
  cursor: pointer;
  color: ${colors.primary}; /* White text */

  &:hover {
    background-color: ${colors.primary}; /* Highlight option */
    color: ${colors.primary}; /* Black text on hover */
  }
`;

const EditableDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSelect = (option) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    setIsOpen(true);
  };

  return (
    <DropdownWrapper>
      <DropdownInput
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Select or type..."
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <OptionsList>
          {options.map((option, index) => (
            <Option key={index} onClick={() => handleSelect(option)}>
              {option}
            </Option>
          ))}
        </OptionsList>
      )}
    </DropdownWrapper>
  );
};

export default EditableDropdown;
