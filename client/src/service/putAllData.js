import axios from "axios";
import { toast } from "react-toastify";
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
export async function _putContact(id, contact) {
  const res = await axios.put(url + `contact/${id}`, contact);
  if (res.data) {
    console.log(res.data);
    toast(`Contact Update sucessfully`);
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
export async function _putNews(id, news) {
  const res = await axios.put(url + `contact/${id}`, news);
  if (res.data) {
    console.log(res.data);
    toast(`News Update sucessfully`);
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
export async function _putLike(id, like) {
  const res = await axios.put(url + `like/${id}`, like);
  if (res.data) {
    console.log(res.data);
    toast(`like Update sucessfully`);
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
export async function _putComment(id, comment) {
  const res = await axios.put(url + `comment/${id}`, comment);
  if (res.data) {
    console.log(res.data);
    toast(`Comment Update sucessfully`);
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
export async function _putCategories(id, categories) {
  const res = await axios.put(url + `categories/${id}`, categories);
  if (res.data) {
    console.log(res.data);
    toast(`categories Update sucessfully`);
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
export async function _putProducts(id, products) {
  const res = await axios.put(url + `products/${id}`, products);
  if (res.data) {
    console.log(res.data);
    toast(`products Update sucessfully`);
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
export async function _putProductSave(id, productsave) {
  const res = await axios.put(url + `products/${id}`, productsave);
  if (res.data) {
    console.log(res.data);
    toast(`Product Save  sucessfully`);
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
export async function _putOrders(id, orders) {
  const res = await axios.put(url + `orders/${id}`, orders);
  if (res.data) {
    console.log(res.data);
    toast(`orders Sucessfully`);
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
