import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../store";
import Dropdown from "../../../Common/Controls/Dropdown";
import { actionCreators } from "../../../../store/users";
import { Role, User } from "../../../../interfaces/Models";

interface EditUsersProps {
  users: {
    users: User[];
  };
  roles: {
    roles: Role[];
  };
  onUsersLoad: () => void;
  visibility: boolean;
}

const EditUsers: FunctionComponent<EditUsersProps> = (props) => {
  debugger;
  const { onUsersLoad, visibility } = props;
  const users = props.users.users;
  const roles = props.roles.roles;
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleItemChosen = (username: string) => {
    setSelectedUser(users.find((user) => user.username === username));
  };

  useEffect(() => onUsersLoad(), []);

  return (
    <div style={{ display: visibility ? "grid" : "none" }}>
      <Dropdown
        items={users.map((user) => user.username)}
        handleItemChosen={handleItemChosen}
      />
      {selectedUser &&
        selectedUser.roles?.map((role) => {
          return <div key={role}>{role}</div>;
        })}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers);
