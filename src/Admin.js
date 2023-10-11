// React Components
import React from "react";
import { useContext } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// Context
import { DataContext } from "./DataProvider";

const Admin = () => {
  const { state, actions } = useContext(DataContext);
  const users = state.users;
  const setUsers = actions.setUsers;

  const activeUser = (userlogin) => {
    const index = users.findIndex((object) => {
      return object.login === userlogin;
    });
    var newusers = users.slice();
    newusers[index].active = true;
    setUsers(newusers);
    localStorage.setItem("users", JSON.stringify(newusers));
  };

  const deactiveUser = (userlogin) => {
    const index = users.findIndex((object) => {
      return object.login === userlogin;
    });
    if (users[index].type == "admin") {
      alert("Nie można zdeaktywować konta admina !");
    } else {
      var newusers = users.slice();
      newusers[index].active = false;
      setUsers(newusers);
      localStorage.setItem("users", JSON.stringify(newusers));
    }
  };

  return (
    <>
      <div className="component appstyle">
        <br></br>
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Login</th>
              <th>Typ Konta</th>
              <th>Aktywny</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ login, band, active, type }) => (
              <tr>
                <td>{login}</td>
                <td>{band}</td>
                <td>{type}</td>
                <td>
                  {active ? (
                    <Button
                      variant="danger"
                      type="submit"
                      className="button"
                      onClick={() => deactiveUser(login)}
                    >
                      Deaktywuj
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      type="submit"
                      className="button"
                      onClick={() => activeUser(login)}
                    >
                      Aktywuj
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br></br>
      </div>
    </>
  );
};

export default Admin;
