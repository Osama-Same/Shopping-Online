import axios from "axios";
import { toast } from "react-toastify";
//const url = "http://localhost:5000/";
const url = "https://shopping1234567.herokuapp.com/";

export async function _putUser(id, user) {
  const res = await axios.put(url + `users/${id}`, user);
  if (res.data) {
    console.log(res.data);
    toast(`User Update sucessfully`);
    return res.data;
  }
  if (res.data.err) {
    toast.error(`${res.data.err}`);
    return res.data;
  }
  if (res.data.error) {
    toast.error(`${res.data.error}`);
    return res.data;
  }
}
