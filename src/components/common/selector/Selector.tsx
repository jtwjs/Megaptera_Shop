import { useState, useRef } from "react";

import * as S from "./Selector.styled";

export type Option = {
  name: string;
  id: string;
};

export interface SelectorProps {
  id: string;
  className?: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  disabled?: boolean;
  options: Option[];
  selectedOption?: Option;
  onValueChange: (value: string) => void;
}

export default function Selector({
  id,
  className,
  label,
  placeholder,
  isRequired = false,
  disabled = false,
  selectedOption,
  options,
  onValueChange,
}: SelectorProps) {
  const selectId = useRef(`select-${id}`);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (opt: Option) => () => {
    onValueChange(opt.id);
    setIsOpen(false);
  };

  return (
    <S.Selector className={className}>
      <S.TriggerBtn
        type="button"
        disabled={disabled}
        role="combobox"
        aria-label={label}
        aria-controls={selectId.current}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required={isRequired}
        onClick={handleOpenToggle}
      >
        {selectedOption?.name || placeholder}
      </S.TriggerBtn>
      {isOpen && (
        <S.ListBox
          id={selectId.current}
          role="listbox"
          aria-label={label}
          aria-hidden={!isOpen}
          aria-activedescendant={isOpen ? "focus_item" : ""}
        >
          {options.map((option) => (
            <li key={option.id}>
              <S.Option
                type="button"
                role="option"
                tabIndex={option.id === selectedOption?.id ? 0 : -1}
                aria-selected={option.id === selectedOption?.id}
                onClick={handleSelect(option)}
              >
                {option.name}
              </S.Option>
            </li>
          ))}
        </S.ListBox>
      )}
    </S.Selector>
  );
}
