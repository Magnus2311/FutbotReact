import React, { ChangeEvent, FunctionComponent } from "react";
import "./TextBox.css";

interface TextBoxProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  value?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextBox: FunctionComponent<TextBoxProps> = ({
  label,
  name,
  placeholder,
  handleChange,
  type,
  value,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextBox;
