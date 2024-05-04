import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Course from "./Components/Course";
import Profile from "./Components/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Course />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);

reportWebVitals();
