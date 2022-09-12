import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import MainContext from "./services/context/MainContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const store = createStore(userReducer);

root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <MainContext>
        <App />
      </MainContext>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
