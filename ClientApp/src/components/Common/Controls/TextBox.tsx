import React, { ChangeEvent, FunctionComponent } from "react";
import "./TextBox.css";

interface TextBoxProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
}

const TextBox: FunctionComponent<TextBoxProps> = ({
  label,
  name,
  placeholder,
  handleChange,
  type,
  value,
  ref,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        type={type ? type : "text"}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextBox;
