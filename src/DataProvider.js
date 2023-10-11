// React Components
import { useState } from "react";
import { createContext } from "react";

// Create Context
export const DataContext = createContext({ state: {}, actions: {} });

function DataProvider({ children }) {
  var bands = ["Metallica", "Guns N Roses", "U2", "Queen"];
  var bandcolors = ["red", "green", "blue", "black"];

  var localusers = JSON.parse(localStorage.getItem("users") || "[]");
  var defaultusers = [];

  if (localusers.length === 0) {
    defaultusers = [
      {
        login: "karol",
        pass: "123",
        mail: "kj@wp.pl",
        type: "admin",
        band: "Metallica",
        gender: "Pan",
        active: true,
      },
      {
        login: "magda",
        pass: "456",
        mail: "marcin@wp.pl",
        type: "user",
        band: "U2",
        gender: "Pani",
        active: true,
      },
    ];
  } else {
    defaultusers = localusers;
  }

  var [users, setUsers] = useState(defaultusers);

  var localevents = JSON.parse(localStorage.getItem("events") || "[]");
  var defaultevents = [];
  const Today = new Date();
  const Yesterday = new Date();
  const Tommorow = new Date();
  Yesterday.setDate(Today.getDate() - 1);
  Tommorow.setDate(Today.getDate() + 1);

  if (localevents.length === 0) {
    defaultevents = [
      {
        title: "Metallica",
        start: Yesterday.toJSON().slice(0, -14) + "T12:00",
        end: Yesterday.toJSON().slice(0, -14) + "T17:00",
        backgroundColor: "red",
        id: 1,
      },
      {
        title: "Guns N Roses",
        start: Today.toJSON().slice(0, -14) + "T09:00",
        end: Today.toJSON().slice(0, -14) + "T11:00",
        backgroundColor: "green",
        id: 2,
      },
      {
        title: "Queen",
        start: Today.toJSON().slice(0, -14) + "T12:00",
        end: Today.toJSON().slice(0, -14) + "T15:00",
        backgroundColor: "black",
        id: 3,
      },
      {
        title: "U2",
        start: Tommorow.toJSON().slice(0, -14) + "T11:00",
        end: Tommorow.toJSON().slice(0, -14) + "T13:00",
        backgroundColor: "blue",
        id: 4,
      },
      {
        title: "Queen",
        start: Tommorow.toJSON().slice(0, -14) + "T14:00",
        end: Tommorow.toJSON().slice(0, -14) + "T23:00",
        backgroundColor: "black",
        id: 5,
      },
    ];
  } else {
    defaultevents = localevents;
  }

  var [events, setEvents] = useState(defaultevents);

  var localcurrentuser = JSON.parse(
    localStorage.getItem("currentuser") || "[]"
  );
  var defaultcurrentuser = {};
  if (localcurrentuser.length === 0) {
    defaultcurrentuser = {
      loged: false,
      userName: "none",
      band: "none",
      type: "user",
    };
  } else {
    defaultcurrentuser = localcurrentuser;
  }

  const [currentUser, setCurrentUser] = useState(defaultcurrentuser);

  const value = {
    state: { currentUser, users, events, bands, bandcolors },
    actions: { setCurrentUser, setUsers, setEvents },
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataProvider;
