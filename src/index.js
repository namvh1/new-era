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
      <div className="bg-gray-900 p-4">
        <div>
          {/*nav component*/}
        </div>
        <div>
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
        </div>

      </div>

    </NextUIProvider>
  </React.StrictMode>
);

reportWebVitals();
