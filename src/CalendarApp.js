// React
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

//Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Full Calendar
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// Images
import guitar from "./img/guitar.png";

// MyCalendar Components
import EventAdd from "./EventAdd";
import EventEdit from "./EventEdit";
import Admin from "./Admin";

// Context
import { DataContext } from "./DataProvider";

const CalendarApp = () => {
  const navigate = useNavigate();
  const { state, actions } = useContext(DataContext);
  const setCurrentUser = actions.setCurrentUser;
  const currentUser = state.currentUser;

  const setEvents = actions.setEvents;
  const events = state.events;

  function logout() {
    let defaultuser = {
      loged: false,
      userName: "none",
      band: "none",
      type: "user",
    };
    setCurrentUser(defaultuser);
    localStorage.setItem("currentuser", JSON.stringify(defaultuser));
  }

  function AddEvent() {
    navigate("/add/");
  }

  function EditEvent(value) {
    navigate("/edit/" + value);
  }

  const MoveEvent = (idd, startDate, endDate) => {
    if (endDate != "") {
      events[parseInt(idd) - 1].start = startDate.slice(0, -6);
      events[parseInt(idd) - 1].end = endDate.slice(0, -6);
    } else {
      events[parseInt(idd) - 1].start = startDate;
      events[parseInt(idd) - 1].end = "";
    }
    localStorage.setItem("events", JSON.stringify(events));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <img className="Logo" src={guitar} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link href="/home">Kalendarz</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/add">
                <Nav.Link href="/add">Dodaj</Nav.Link>
              </LinkContainer>
              {currentUser.type == "admin" && (
                <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/logout">
                <Nav.Link onClick={logout} href="/logout">
                  Wyloguj
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <Routes>
          <Route
            path="/*"
            element={
              <div className="calendarContainer">
                <FullCalendar
                  plugins={[
                    timeGridPlugin,
                    bootstrap5Plugin,
                    interactionPlugin,
                  ]}
                  themeSystem="bootstrap5"
                  initialView="timeGridWeek"
                  height={"70vh"}
                  width={"80vw"}
                  events={state.events}
                  locale={"pl"}
                  firstDay={1}
                  selectable={true}
                  editable={true}
                  droppable={true}
                  eventClick={function (arg) {
                    EditEvent(arg.event.id);
                  }}
                  eventDrop={function (arg) {
                    MoveEvent(
                      arg.event.id,
                      arg.event.startStr,
                      arg.event.endStr
                    );
                  }}
                  eventResize={function (arg) {
                    MoveEvent(
                      arg.event.id,
                      arg.event.startStr,
                      arg.event.endStr
                    );
                  }}
                  select={function (arg) {
                    AddEvent();
                  }}
                />
              </div>
            }
          />
          <Route path="/add" element={<EventAdd />} />
          <Route path="/edit/:id" element={<EventEdit />} />
          {currentUser.type == "admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
        </Routes>
      </div>
    </>
  );
};

export default CalendarApp;
