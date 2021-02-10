import React, {
  ChangeEvent,
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";
import Dropdown from "../../../Common/Controls/Dropdown";
import { actionCreators } from "../../../../store/users";
import { Role, User } from "../../../../interfaces/Models";
import Switch from "../../../Common/Controls/Switch";

interface EditUsersProps {
  users: {
    users: User[];
  };
  roles: {
    roles: Role[];
  };
  onUsersLoad: () => void;
  onUserEdited: (user: User) => void;
  visibility: boolean;
}

const EditUsers: FunctionComponent<EditUsersProps> = (props) => {
  const { onUsersLoad, visibility, onUserEdited } = props;
  const users = props.users.users;
  const roles = props.roles.roles;
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleItemChosen = (username: string) => {
    setSelectedUser(users.find((user) => user.username === username));
  };

  const handlePermissionClicked = (e: ChangeEvent<HTMLInputElement>) => {
    const role = e.currentTarget.name;
    const index =
      selectedUser && selectedUser.roles && selectedUser.roles.indexOf(role);

    if (index === -1)
      selectedUser &&
        selectedUser.roles &&
        setSelectedUser({
          ...selectedUser,
          roles: [...selectedUser.roles, role],
        });
    else
      selectedUser &&
        selectedUser.roles &&
        setSelectedUser({
          ...selectedUser,
          roles: selectedUser.roles.filter((role) => role !== role),
        });
  };

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onUserEdited(selectedUser!);
  };

  useEffect(() => onUsersLoad(), []);

  return (
    <div style={{ display: visibility ? "grid" : "none", width: "100%" }}>
      <Dropdown
        items={users.map((user) => user?.username)}
        handleItemChosen={handleItemChosen}
      />
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        }}
      >
        {roles?.map((role) => {
          return (
            <Switch
              key={role.id}
              label={role.name}
              name={role.id}
              isChecked={
                selectedUser ? selectedUser.roles?.includes(role.id!) : false
              }
              handleChange={handlePermissionClicked}
            />
          );
        })}
      </div>
      <button className="fut-btn" onClick={handleBtnClick}>
        Edit user's roles
      </button>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return { users: state.users, roles: state.roles };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onUsersLoad: () => {
      dispatch(actionCreators.loadUsers());
    },
    onUserEdited: (user: User) => {
      dispatch(actionCreators.updateUserRoles(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers);
