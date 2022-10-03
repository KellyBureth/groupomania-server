import Cookie from "js-cookie";

const IsLogged = (cookiename) => {
  return Cookie.get(cookiename);
};

export default IsLogged;
