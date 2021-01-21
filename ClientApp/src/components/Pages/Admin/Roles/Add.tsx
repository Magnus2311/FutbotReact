import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { Role } from "../../../../interfaces/Models";
import { Roles } from "../../../../interfaces/Roles";
import Switch from "../../../Common/Controls/Switch";
import TextBox from "../../../Common/Controls/TextBox";
import { actionCreators } from "../../../../store/roles";
import { connect } from "react-redux";

const emptyRole: Role = {
  name: "",
  permissions: [],
};

interface AddRoleState {
  onAddRole: (role: Role) => void;
}

const AddRole: FunctionComponent<AddRoleState> = ({ onAddRole }) => {
  const [role, setRole] = useState(emptyRole);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAddRole(role);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRole({ ...role, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handlePermissionClicked = (e: ChangeEvent<HTMLInputElement>) => {
    const permission = e.currentTarget.name;
    const index = role.permissions.indexOf(permission);

    if (index === -1)
      setRole({ ...role, permissions: [...role.permissions, permission] });
    else
      setRole({
        ...role,
        permissions: role.permissions.filter((perm) => perm !== permission),
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add role</h4>
      <TextBox
        handleChange={handleChange}
        label="Role name"
        name="name"
        placeholder="Enter role name"
        value={role.name}
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
                    isChecked={role.permissions.includes(rolePermission)}
                    handleChange={handlePermissionClicked}
                  />
                );
              })}
            </div>
            <hr />
          </>
        );
      })}
      <button className="fut-btn">Add role</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddRole: (role: Role) => {
      dispatch(actionCreators.addRole(role));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(AddRole);
