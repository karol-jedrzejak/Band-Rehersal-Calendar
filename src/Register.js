// React Components
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Images
import guitar from "./img/guitar.png";

// Context
import { DataContext } from "./DataProvider";

const Register = () => {
  const navigate = useNavigate();

  const { state, actions } = useContext(DataContext);
  const bands = state.bands;
  const users = state.users;
  const setUsers = actions.setUsers;

  const UserRegister = () => {
    var newusers = users;
    let newlogin = document.getElementById("login").value;
    let newpass = document.getElementById("password").value;
    let newmail = document.getElementById("email").value;
    let newband = document.getElementById("band").value;

    let newgender = "Pan";
    if (document.getElementById("radio-2").checked) {
      newgender = "Pani";
    }

    let error = false;
    let errorMessage = "";

    if (newlogin.length < 5) {
      error = true;
      errorMessage += "Login jest za krótki. \n";
    }

    for (let i = 0; i < users.length; i++) {
      if (users[i].login === newlogin) {
        error = true;
        errorMessage += "Login jest zajęty. \n";
      }
    }

    if (newpass.length < 8) {
      error = true;
      errorMessage += "Hasło jest za krótkie. \n";
    }

    let upperCaseLetters = /[A-Z]/g;
    if (!newpass.match(upperCaseLetters)) {
      error = true;
      errorMessage += "Hasło nie zawiera dużej litery. \n";
    }

    let lowerCaseLetters = /[a-z]/g;
    if (!newpass.match(lowerCaseLetters)) {
      error = true;
      errorMessage += "Hasło nie zawiera małej litery. \n";
    }

    let numbers = /[0-9]/g;
    if (!newpass.match(numbers)) {
      error = true;
      errorMessage += "Hasło nie zawiera cyfry. \n";
    }

    let validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!newmail.match(validEmail)) {
      error = true;
      errorMessage += "Nipoprawny adres e-mail. \n";
    }

    let newuser = {
      login: newlogin,
      pass: newpass,
      mail: newmail,
      type: "user",
      band: newband,
      gender: newgender,
      active: false,
    };

    if (error == false) {
      newusers.push(newuser);

      setUsers(newusers);

      localStorage.setItem("users", JSON.stringify(newusers));

      alert(
        "Rejestracja udana :) Proszę poczekać na aktywację konta przez administratora."
      );
      navigate("/login");
    } else {
      alert("Rejestracja nieudana. Wystąpiły problemy: \n" + errorMessage);
    }
  };

  const ShowPass = () => {
    document.getElementById("passwordCheck").style.display = "block";
  };

  const HidePass = () => {
    document.getElementById("passwordCheck").style.display = "none";
  };

  const ShowLogin = () => {
    document.getElementById("loginCheck").style.display = "block";
  };

  const HideLogin = () => {
    document.getElementById("loginCheck").style.display = "none";
  };

  const ShowEmail = () => {
    document.getElementById("emailCheck").style.display = "block";
  };

  const HideEmail = () => {
    document.getElementById("emailCheck").style.display = "none";
  };

  const CheckLogin = () => {
    let login = document.getElementById("login");
    let LoginLength = document.getElementById("LoginLength");
    let LoginFree = document.getElementById("LoginFree");

    if (login.value.length > 4) {
      LoginLength.classList.remove("invalid");
      LoginLength.classList.add("valid");
    } else {
      LoginLength.classList.remove("valid");
      LoginLength.classList.add("invalid");
    }

    let avaible = true;

    for (let i = 0; i < users.length; i++) {
      if (users[i].login === login.value) {
        avaible = false;
      }
    }

    if (avaible == true) {
      LoginFree.classList.remove("invalid");
      LoginFree.classList.add("valid");
    } else {
      LoginFree.classList.remove("valid");
      LoginFree.classList.add("invalid");
    }
  };

  const CheckPass = () => {
    let password = document.getElementById("password");
    let PassLength = document.getElementById("PassLength");
    let PassBigLetter = document.getElementById("PassBigLetter");
    let PassSmallLetter = document.getElementById("PassSmallLetter");
    let PassNumb = document.getElementById("PassNumb");

    if (password.value.length > 7) {
      PassLength.classList.remove("invalid");
      PassLength.classList.add("valid");
    } else {
      PassLength.classList.remove("valid");
      PassLength.classList.add("invalid");
    }

    let upperCaseLetters = /[A-Z]/g;
    if (password.value.match(upperCaseLetters)) {
      PassBigLetter.classList.remove("invalid");
      PassBigLetter.classList.add("valid");
    } else {
      PassBigLetter.classList.remove("valid");
      PassBigLetter.classList.add("invalid");
    }

    let lowerCaseLetters = /[a-z]/g;
    if (password.value.match(lowerCaseLetters)) {
      PassSmallLetter.classList.remove("invalid");
      PassSmallLetter.classList.add("valid");
    } else {
      PassSmallLetter.classList.remove("valid");
      PassSmallLetter.classList.add("invalid");
    }

    let numbers = /[0-9]/g;
    if (password.value.match(numbers)) {
      PassNumb.classList.remove("invalid");
      PassNumb.classList.add("valid");
    } else {
      PassNumb.classList.remove("valid");
      PassNumb.classList.add("invalid");
    }
  };

  const CheckEmail = () => {
    let email = document.getElementById("email");
    let EmailValidated = document.getElementById("EmailValidated");

    var validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.value.match(validEmail)) {
      EmailValidated.classList.remove("invalid");
      EmailValidated.classList.add("valid");
    } else {
      EmailValidated.classList.remove("valid");
      EmailValidated.classList.add("invalid");
    }
  };

  return (
    <>
      <div className="component loginstyle">
        <br></br>
        <img id="LogoLogin" src={guitar} />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wpisz swój login"
              id="login"
              name="login"
              onBlur={HideLogin}
              onFocus={ShowLogin}
              onChange={CheckLogin}
            />
            <small id="loginCheck">
              <br></br>
              <p id="LoginFree" className="valid">
                - Czy Login jest dostępny?
              </p>
              <p id="LoginLength" className="invalid">
                - Minimum 5 znaków
              </p>
            </small>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Hasło</Form.Label>
            <Form.Control
              type="password"
              placeholder="Wpisz swoje hasło"
              id="password"
              name="password"
              onBlur={HidePass}
              onFocus={ShowPass}
              onChange={CheckPass}
            />
            <small id="passwordCheck">
              <br></br>
              <p id="PassBigLetter" className="invalid">
                - Przynajmniej 1 wielka litera
              </p>
              <p id="PassSmallLetter" className="invalid">
                - Przynajmniej 1 mała litera
              </p>
              <p id="PassNumb" className="invalid">
                - Przynajmniej 1 cyfra
              </p>
              <p id="PassLength" className="invalid">
                - Minimum 8 znaków
              </p>
            </small>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="e-mail"
              placeholder="Wpisz swój e-mail"
              id="email"
              name="email"
              onBlur={HideEmail}
              onFocus={ShowEmail}
              onChange={CheckEmail}
            />
            <small id="emailCheck">
              <br></br>
              <p id="EmailValidated" className="invalid">
                - Poprawny adres e-mail
              </p>
            </small>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Zespół</Form.Label>
            <Form.Select aria-label="Default select example" id="band">
              {bands.map((item, index) => (
                <option value={item}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="mb-3">
              <Form.Check
                inline
                label="Pan"
                name="genderRadio"
                type="radio"
                id="radio-1"
                checked
              />
              <Form.Check
                inline
                label="Pani"
                name="genderRadio"
                type="radio"
                id="radio-2"
              />
            </div>
          </Form.Group>
        </Form>

        <Button
          variant="primary"
          type="submit"
          className="button"
          onClick={UserRegister}
        >
          Zarejestruj
        </Button>
        <br></br>
        <br></br>
        <div>
          Jesteś użytkownikiem ? - <Link to="/login">Zaloguj Się</Link>
        </div>
      </div>
    </>
  );
};

export default Register;
