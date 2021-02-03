import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { Role } from "../../../../interfaces/Models";
import { actionCreators } from "../../../../store/roles";
import { connect } from "react-redux";
import RoleVisualizer from "./Role";

const emptyRole: Role = {
  name: "",
  permissions: [],
};

interface AddRoleState {
  onAddRole: (role: Role) => void;
  visibility: boolean;
}

const AddRole: FunctionComponent<AddRoleState> = ({
  onAddRole,
  visibility,
}) => {
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
    <RoleVisualizer
      handleRoleChange={handleChange}
      role={role}
      handlePermissionClicked={handlePermissionClicked}
      handleSubmit={handleSubmit}
      btnText="Add role"
      style={{ visibility }}
    />
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
