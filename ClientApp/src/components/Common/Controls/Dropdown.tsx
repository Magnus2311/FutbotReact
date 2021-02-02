import React, {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  MouseEvent,
  useState,
} from "react";
import "./Dropdown.css";

interface DropdownProps {
  items: string[];
  handleItemChosen: (item: string) => void;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  items,
  handleItemChosen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleInputFocus = (e: FocusEvent<HTMLDivElement>) => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleItemClick = (e: MouseEvent<HTMLInputElement>) => {
    debugger;
    setIsDropdownOpen(false);
    handleItemChosen(e.currentTarget.innerText);
  };

  return (
    <div onFocus={handleInputFocus}>
      <input value={inputText} onChange={handleInputChange} />
      <div
        className="dropdown-items-container"
        style={{
          maxHeight: isDropdownOpen ? "200px" : "0px",
        }}
      >
        {items.map((item) => (
          <div
            className="dropdown-item"
            key={item}
            onClick={handleItemClick}
            style={{
              maxHeight: isDropdownOpen ? "30px" : "0px",
              visibility: isDropdownOpen ? "visible" : "collapse",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
