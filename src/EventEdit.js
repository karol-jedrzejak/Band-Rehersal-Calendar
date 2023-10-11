// React Components
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Context
import { DataContext } from "./DataProvider";

const EventEdit = () => {
  const { id } = useParams();
  const index = id - 1;
  const ref = useRef(null);

  const { state, actions } = useContext(DataContext);

  const currentUser = state.currentUser;
  const events = state.events;

  const navigate = useNavigate();

  const EditEvent = () => {
    let StartValue = document.getElementById("start").value;
    let EndValue = document.getElementById("end").value;
    if (StartValue == EndValue) {
      events[index].start = StartValue.slice(0, -6);
      events[index].end = "";
    } else {
      events[index].start = StartValue;
      events[index].end = EndValue;
    }
    localStorage.setItem("events", JSON.stringify(events));
    navigate("/home");
  };

  if (
    events[index].title === currentUser.band ||
    currentUser.type === "admin"
  ) {
    return (
      <>
        <div className="component appstyle">
          <br></br>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Data Rozpoczęcia</Form.Label>
              <Form.Control
                type="datetime-local"
                id="start"
                ref={ref}
                defaultValue={
                  events[index].end != 0
                    ? events[index].start
                    : events[index].start + "T00:00"
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Data Zakończenia</Form.Label>
              <Form.Control
                type="datetime-local"
                id="end"
                ref={ref}
                defaultValue={
                  events[index].end != 0
                    ? events[index].end
                    : events[index].start + "T00:00"
                }
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="button"
              onClick={EditEvent}
            >
              Zmień
            </Button>
          </Form>{" "}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="loginform" className="component loginstyle">
          <br></br>
          <h1>
            Nie możesz edytować wydarzenia cudzego zespołu (chyba że jesteś
            administratorem).
          </h1>
          <br></br>
        </div>
        ;
      </>
    );
  }
};

export default EventEdit;
