import axios from "axios";
import { toast } from "react-toastify";
//const url = "http://localhost:5000/";
const url = "https://shopping1234567.herokuapp.com/";

export async function _insertUser(user) {
  const res = await axios.post(url + "users", user);
  if (res.data.result) {
    toast(`${res.data.result}`);
    return res.data.result;
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast.error(`Error server`);
  }
}

export async function _loginUser(user) {
  const res = await axios.post(url + "login", user);

  if (res.data.result) {
    toast(`User Login sucessfully`);
    const token = res.data.token;
    const result = res.data.result;
    localStorage.setItem("token", token);
    localStorage.getItem("result", result);
    return res.data.result[0];
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data.err;
  } else {
    toast.error(`Error server`);
  }
}

export async function _insetContact(contact) {
  const res = await axios.post(url + "contact", contact);
  if (res.data) {
    toast("Contact sucessfully");
    return res.data.result;
  } else if (res.data.err) {
    toast.error(`Error server`);
    return res.data.err;
  } else if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data.error;
  } else {
    toast.error(`Error server`);
  }
}
