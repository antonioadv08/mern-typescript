import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { VideoList } from "./components/Videos/VideoList";
import { VideoForm } from "./components/Videos/VideoForm";
import "bootswatch/dist/pulse/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={VideoList} />
          <Route path="/new-video" component={VideoForm} />
          <Route path="/update/:id" component={VideoForm} />

        </Switch>
        <ToastContainer />
      </div>
    </BrowserRouter>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
