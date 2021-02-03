import React, {
  ChangeEvent,
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
  const [shownItems, setShownItems] = useState(items);

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
    setShownItems(
      items.filter((item) =>
        item.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    );
  };

  const handleItemClick = (e: MouseEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.innerText);
    handleItemChosen(e.currentTarget.innerText);
  };

  const handleOnBlur = () => {
    setTimeout(() => setIsDropdownOpen(false), 50);
  };

  return (
    <div
      onFocus={handleInputFocus}
      onBlur={handleOnBlur}
      style={{
        position: "relative",
      }}
    >
      <input
        className="dropdown-input form-control"
        value={inputText}
        onChange={handleInputChange}
      />
      <div
        className="dropdown-items-container"
        style={{
          maxHeight: isDropdownOpen ? "200px" : "0px",
        }}
      >
        {shownItems.map((item, idx) => (
          <div
            className="dropdown-item"
            key={item + idx}
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
