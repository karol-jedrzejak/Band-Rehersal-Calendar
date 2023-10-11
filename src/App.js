// React Components
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CalendarApp Components
import CalendarApp from "./CalendarApp";
import Login from "./Login";
import Register from "./Register";

// Styles
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Context
import { DataContext } from "./DataProvider";

function App() {
  const { state, actions } = useContext(DataContext);

  function loginCheck() {
    if (state.currentUser.loged === true) {
      return (
        <BrowserRouter>
          <CalendarApp />
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route
              path="/register"
              element={
                <div class="margin">
                  <Register></Register>
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div class="margin">
                  <Login></Login>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      );
    }
  }

  return <div className="App">{loginCheck()}</div>;
}

export default App;
