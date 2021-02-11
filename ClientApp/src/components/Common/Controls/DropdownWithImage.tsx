import React, {
  ChangeEvent,
  FocusEvent,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  useState,
} from "react";
import { Player } from "../../../interfaces/Models";
import "./DropdownWithImage.css";

interface DropdownWithImageProps {
  players: Player[];
  handleItemChosen: (player: Player) => void;
  src: string;
  placeholder: string;
  maxPriceRef: MutableRefObject<HTMLElement>;
}

const DropdownWithImage: FunctionComponent<DropdownWithImageProps> = ({
  players,
  handleItemChosen,
  src,
  placeholder,
  maxPriceRef,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [shownItems, setShownItems] = useState(players);
  const elemRefs = [] as HTMLElement[];

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
    setShownItems(
      players?.filter((players) =>
        players.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    );
    debugger;
  };

  const handleItemKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    const currIndex = e.currentTarget.tabIndex;
    elemRefs[currIndex].focus();
    if (currIndex >= 0) {
      if (e.keyCode === 40) {
        if (currIndex + 1 < elemRefs.length) elemRefs[currIndex + 1].focus();
      } else if (currIndex >= 1 && e.keyCode === 38) {
        if (elemRefs.length > currIndex) elemRefs[currIndex - 1].focus();
      } else if (e.keyCode === 13) {
        elemRefs[currIndex].click();
      } else if (e.keyCode === 9) {
        maxPriceRef?.current?.focus();
      } else {
        elemRefs[0].focus();
      }
    }
  };

  const handleItemClick = (e: MouseEvent<HTMLInputElement>) => {
    debugger;
    const playerClicked = players.filter(
      (player) =>
        player.id == e.currentTarget.attributes.getNamedItem("data-id")?.value!
    )[0];
    setInputText(playerClicked.name);
    handleItemChosen(playerClicked);
    setTimeout(() => setIsDropdownOpen(false), 50);
    maxPriceRef?.current?.focus();
  };

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    const playerClicked = players.filter(
      (player) =>
        player.id == e.currentTarget.attributes.getNamedItem("data-id")?.value!
    )[0];
    setInputText(playerClicked.name);
    handleItemChosen(playerClicked);
  };

  return (
    <div
      onFocus={handleInputFocus}
      //   onBlur={handleOnBlur}
      style={{
        position: "relative",
        width: "100%",
        marginBottom: "1.25rem",
      }}
    >
      <div className="form-group" style={{ marginBottom: "0" }}>
        <label>Choose player</label>
        <input
          className="dropdown-input form-control"
          placeholder={placeholder}
          onKeyDown={handleItemKeyUp}
          tabIndex={0}
          ref={(content) => (elemRefs[0] = content as HTMLElement)}
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div
        className="dropdown-items-container"
        style={{
          maxHeight: isDropdownOpen ? "300px" : "0px",
        }}
      >
        <div
          className="dropdown-item"
          style={{
            visibility: isDropdownOpen ? "visible" : "visible",
          }}
        ></div>
        {shownItems?.slice(0, 50).map((item, index) => (
          <div
            className="dropdown-item"
            tabIndex={index + 1}
            ref={(content) => (elemRefs[index + 1] = content as HTMLElement)}
            onKeyDown={handleItemKeyUp}
            key={item.id}
            data-id={item.id}
            onClick={handleItemClick}
            onFocus={handleFocus}
            style={{
              maxHeight: isDropdownOpen ? "38px" : "38px",
              visibility: isDropdownOpen ? "visible" : "visible",
              display: "inline-flex",
              position: "relative",
              paddingLeft: "0",
            }}
          >
            <img
              src={`${src}${item.name}${item.rating}.png`}
              style={{ width: "30px", height: "30px", marginRight: "15px" }}
            />
            <div style={{ width: "400px", textAlign: "left" }}>{item.name}</div>
            <div style={{ position: "absolute", right: "20px" }}>
              {item.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownWithImage;
