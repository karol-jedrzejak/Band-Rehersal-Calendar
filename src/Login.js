// React Components
import React from "react";
import { useContext } from "react";

// React Router Components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Image
import guitar from "./img/guitar.png";

// Context
import { DataContext } from "./DataProvider";

const Login = () => {
  const { state, actions } = useContext(DataContext);

  const currentUser = state.currentUser;
  const users = state.users;
  const setCurrentUser = actions.setCurrentUser;

  const navigate = useNavigate();

  const CheckIfLoginOK = () => {
    let willlog = false;
    let index;
    for (let i = 0; i < users.length; i++) {
      if (
        document.getElementById("login").value === users[i].login &&
        document.getElementById("password").value === users[i].pass &&
        users[i].active === true
      ) {
        willlog = true;
        index = i;
      }
    }
    if (willlog === true) {
      var newcurrentUser = {};
      const returnedTarget = Object.assign(newcurrentUser, currentUser);
      newcurrentUser.loged = true;
      newcurrentUser.band = users[index].band;
      newcurrentUser.userName = users[index].login;
      newcurrentUser.type = users[index].type;
      setCurrentUser(newcurrentUser);
      localStorage.setItem("currentuser", JSON.stringify(newcurrentUser));
      navigate("/home");
    } else {
      alert("Złe hasło");
    }
  };

  return (
    <>
      <div className="component loginstyle">
        <br></br>
        <img id="LogoLogin" src={guitar} />
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz swój login"
              id="login"
              name="login"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz swoje hasło"
              id="password"
              name="password"
            />
          </Form.Group>
          <Button variant="primary" className="button" onClick={CheckIfLoginOK}>
            Zaloguj
          </Button>
        </Form>{" "}
        <br></br>
        <div>
          Nie jesteś użytkownikiem - <Link to="/register">Zarejestruj Się</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
