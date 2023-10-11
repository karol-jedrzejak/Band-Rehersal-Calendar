// React Components
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Context
import { DataContext } from "./DataProvider";

const EventAdd = () => {
  const { state, actions } = useContext(DataContext);

  // const [starttime, setStarttime] = useState();

  const currentUser = state.currentUser;
  const events = state.events;
  const setEvents = actions.setEvents;
  const bands = state.bands;
  const bandcolors = state.bandcolors;

  const navigate = useNavigate();

  const AddEvent = () => {
    var newevents = events;
    let newid = events.length + 1;
    let endtime = document.getElementById("end").value;
    let starttime = document.getElementById("start").value;
    newevents.push({
      title: currentUser.band,
      start: starttime,
      end: endtime,
      backgroundColor: bandcolors[bands.indexOf(currentUser.band)],
      id: newid,
    });

    localStorage.setItem("events", JSON.stringify(newevents));
    setEvents(newevents);
    navigate("/home");
  };

  return (
    <>
      <div className="component appstyle">
        <br></br>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Data Rozpoczęcia</Form.Label>
            <Form.Control type="datetime-local" id="start" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Data Zakończenia</Form.Label>
            <Form.Control type="datetime-local" id="end" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="button"
            onClick={AddEvent}
          >
            Dodaj
          </Button>
        </Form>{" "}
      </div>
    </>
  );
};

export default EventAdd;
