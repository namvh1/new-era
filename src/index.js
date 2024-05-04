import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import LeaderBoard from "./Components/LeaderBoard";
import Profile from "./Components/Profile";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import Course from "./Components/Course";
import CourseDetail from "./Components/CourseDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <Header />
        <div className="mt-16 p-4">
          <Switch>
            <Route exact path="/">
              <Course />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/leaderboard">
              <LeaderBoard />
            </Route>
            <Route path="/course/:slug">
              <CourseDetail />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);

reportWebVitals();
