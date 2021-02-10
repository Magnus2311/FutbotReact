import React, { FunctionComponent, MouseEvent, useState } from "react";

export interface RadioButton {
  name: string;
  isActive: boolean;
  Component: any;
  props?: any;
}

interface RadioButtonsContainerProps {
  radioButtons: RadioButton[];
}

const RadioButtonsContainer: FunctionComponent<RadioButtonsContainerProps> = ({
  radioButtons,
}) => {
  const [buttons, setButtons] = useState([...radioButtons]);

  const handleButtonClicked = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setButtons([
      ...buttons.map((btn) =>
        btn.name === e.currentTarget.name
          ? { ...btn, isActive: true }
          : { ...btn, isActive: false }
      ),
    ]);
  };

  return (
    <>
      <div
        className={`btn-group btn-group-toggle`}
        style={{ margin: "0.125rem 0 1.625rem 0" }}
      >
        {buttons.map((btn) => {
          return (
            <label
              key={btn.name}
              className={`btn btn-secondary ${btn.isActive && "active"}`}
            >
              <input
                type="radio"
                name={btn.name}
                autoComplete="off"
                onClick={handleButtonClicked}
              />{" "}
              {btn.name}
            </label>
          );
        })}
      </div>
      {buttons.map((btn) => {
        return (
          <btn.Component
            id={btn.name}
            {...btn.props}
            visibility={btn.isActive}
          />
        );
      })}
    </>
  );
};

export default RadioButtonsContainer;
