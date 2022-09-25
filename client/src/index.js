import React from "react";
// import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";

// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import IsLogged from "./components/Log/IsLogged";

if (IsLogged) {
  console.log("jwt", IsLogged);
} else {
  console.log("nocookie");
}

IsLogged("jwb");
// import cookie from "js-cookie";
// const GetCookie = (cookieName) => {
//   return Cookie.get(cookiename);
// }
// const isLogged = cookie.get("jwt");
// if (cookie) {
//   console.log("cookie", cookie, "islog", isLogged);
// } else {
//   console.log("no cookie");
// }
const middleware = [thunk];
const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(...middleware))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  //   </BrowserRouter>
  // </React.StrictMode>
);
