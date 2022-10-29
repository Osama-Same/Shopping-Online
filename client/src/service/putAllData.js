import axios from "axios";
import { toast } from "react-toastify";
//const url = "http://localhost:5000/";
const url = "https://shopping1234567.herokuapp.com/";

export async function _putUser(id, user) {
  const res = await axios.put(url + `users/${id}`, user);
  console.log(res.data);
  if (res.data) {
    toast(`User Update sucessfully`);
    console.log(res.data);
    return res.data;
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
