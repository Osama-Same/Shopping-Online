import axios from "axios";
import { toast } from "react-toastify";
//const url = "http://localhost:5000/";
const url = "https://shopping1234567.herokuapp.com/";

export async function _getAllUser() {
  const res = await axios.get(url + "users");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllContact() {
  const res = await axios.get(url + "contact");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }

}
export async function _getAllNews() {
  const res = await axios.get(url + "news");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllCategories() {
  const res = await axios.get(url + "categories");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllPost() {
  const res = await axios.get(url + "post");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllComment() {
  const res = await axios.get(url + "comment");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllLike() {
  const res = await axios.get(url + "like");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllOrders() {
  const res = await axios.get(url + "orders");
  if (res.data) {
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
