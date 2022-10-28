import axios from "axios";
import { toast } from "react-toastify";
//const url = "http://localhost:5000/";
const url = "https://shopping1234567.herokuapp.com/";

export async function _deleteUser(id) {
  const res = await axios.delete(url + `users/${id}`);
  if (res.data) {
    toast(`Delete Account`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}

export async function _deleteContact(id) {
  const res = await axios.delete(url + `contact/${id}`);
  if (res.data) {
    toast(`Delete Contact`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}

export async function _getAllNews(id) {
  const res = await axios.delete(url + `news/${id}`);
  if (res.data) {
    toast(`Delete news`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}

export async function _deleteCategories(id) {
  const res = await axios.delete(url + `categories/${id}`);
  if (res.data) {
    toast(`Delete news`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _getAllPost(id) {
  const res = await axios.delete(url + `products/${id}`);
  if (res.data) {
    toast(`Delete products`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _deleteComment(id) {
  const res = await axios.get(url + `comment/${id}`);
  if (res.data) {
    toast(`Delete comment`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}

export async function _deleteLike(id) {
  const res = await axios.delete(url + `like/${id}`);
  if (res.data) {
    toast(`Delete like`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
export async function _deleteOrders(id) {
  const res = await axios.get(url + `orders/${id}`);
  if (res.data) {
    toast(`Delete Order`);
    return res.data;
  } else {
    toast.error(`Error server`);
  }
}
