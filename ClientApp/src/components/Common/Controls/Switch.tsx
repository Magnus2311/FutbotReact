import React, {
  ChangeEvent,
  createRef,
  FunctionComponent,
  MouseEvent,
} from "react";
import "./Switch.css";

interface SwitchProps {
  label?: string;
  isChecked: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: FunctionComponent<SwitchProps> = ({
  label,
  isChecked,
  handleChange,
}) => {
  const element = createRef<HTMLInputElement>();

  const handleLabelClick = (e: MouseEvent<HTMLLabelElement>) => {
    element.current?.click();
  };

  return (
    <div>
      <label className="switch">
        <input
          ref={element}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="slider"></span>
      </label>
      <label
        style={{ paddingLeft: "10px", cursor: "pointer" }}
        onClick={handleLabelClick}
      >
        {label}
      </label>
    </div>
  );
};

export default Switch;
