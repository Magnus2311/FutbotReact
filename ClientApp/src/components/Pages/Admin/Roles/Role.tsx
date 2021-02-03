import React, { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { Role } from "../../../../interfaces/Models";
import { Roles } from "../../../../interfaces/Roles";
import Switch from "../../../Common/Controls/Switch";
import TextBox from "../../../Common/Controls/TextBox";

interface RoleState {
  role: Role;
  btnText: string;
  handleRoleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handlePermissionClicked: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: {
    marginTop?: string;
    visibility: boolean;
  };
}

const RoleVisualizer: FunctionComponent<RoleState> = ({
  role,
  handleRoleChange,
  handleSubmit,
  handlePermissionClicked,
  btnText,
  style,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: style?.visibility ? "grid" : "none",
      }}
    >
      <h4 style={{ marginTop: style ? style.marginTop : "0" }}>{btnText}</h4>
      <TextBox
        handleChange={handleRoleChange}
        label="Role name"
        name="name"
        placeholder="Enter role name"
        value={role?.name}
      />
      <hr />
      {Object.keys(Roles).map((key) => {
        return (
          <>
            <h5 style={{ textAlign: "left" }}>{key}</h5>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              }}
            >
              {Roles[key].map((permission: string) => {
                const rolePermission = `${key}.${permission}`;
                return (
                  <Switch
                    key={rolePermission}
                    label={permission}
                    name={rolePermission}
                    isChecked={role.permissions?.includes(rolePermission)}
                    handleChange={handlePermissionClicked}
                  />
                );
              })}
            </div>
            <hr />
          </>
        );
      })}
      <button className="fut-btn">{btnText}</button>
    </form>
  );
};

export default RoleVisualizer;
