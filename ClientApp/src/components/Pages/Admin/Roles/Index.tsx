import React, { FunctionComponent, MouseEvent, useState } from "react";
import RadioButtonsContainer, {
  RadioButton,
} from "../../../Common/Controls/RadioButtonsContainer";
import Add from "./Add";
import Edit from "./Edit";
import EditUsers from "./EditUsers";

const Index: FunctionComponent = () => {
  const radioButtons = [
    { name: "Add role", isActive: true, Component: Add },
    { name: "Edit role", isActive: false, Component: Edit },
    { name: "Edit user's roles", isActive: false, Component: EditUsers },
  ] as RadioButton[];

  return (
    <>
      <h4>Roles related options</h4>
      <RadioButtonsContainer radioButtons={radioButtons} />
    </>
  );
};

export default Index;
