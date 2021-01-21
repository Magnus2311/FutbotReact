import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { Role } from "../../../../interfaces/Models";
import { ApplicationState } from "../../../../store";
import { actionCreators } from "../../../../store/roles";
import RoleVisualizer from "./Role";

type EditRolesState = {
  roles: Role[];
  onLoadRoles: () => void;
  onEditRole: (role: Role) => void;
};

const EditRoles: FunctionComponent<EditRolesState> = ({
  roles,
  onLoadRoles,
  onEditRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role>({} as Role);

  useEffect(() => onLoadRoles(), []);

  const handleRoleClick = (e: MouseEvent<HTMLDivElement>) => {
    const currentRole = roles.filter(
      (r) => r.name === e.currentTarget.innerText
    )[0];

    setSelectedRole(currentRole);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onEditRole(selectedRole);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole({
      ...selectedRole,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handlePermissionClicked = (e: ChangeEvent<HTMLInputElement>) => {
    const permission = e.currentTarget.name;
    const index = selectedRole.permissions.indexOf(permission);

    if (index === -1)
      setSelectedRole({
        ...selectedRole,
        permissions: [...selectedRole.permissions, permission],
      });
    else
      setSelectedRole({
        ...selectedRole,
        permissions: selectedRole.permissions.filter(
          (perm) => perm !== permission
        ),
      });
  };

  return (
    <>
      <div>
        {roles.map((role) => {
          return (
            <div key={role.id} onClick={handleRoleClick}>
              {role.name}
            </div>
          );
        })}
      </div>
      {selectedRole.name && (
        <RoleVisualizer
          handleRoleChange={handleChange}
          role={selectedRole}
          handlePermissionClicked={handlePermissionClicked}
          handleSubmit={handleSubmit}
          btnText="Edit role"
        />
      )}
    </>
  );
};

const mapStateToProps = (state: ApplicationState) => state.roles;

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoadRoles: () => {
      dispatch(actionCreators.loadRoles());
    },
    onEditRole: (role: Role) => {
      dispatch(actionCreators.editRole(role));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoles);