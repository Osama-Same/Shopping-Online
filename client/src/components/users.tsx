import { MainStateType } from "./mainState";
import {
  _getAllUser,
  _getAllCategories,
  _getAllComment,
  _getAllContact,
  _getAllLike,
  _getAllNews,
  _getAllOrders,
  _getAllPost,
} from "../service/getAllData";

export async function updateUserState(
  mainState: MainStateType,
  setMainState: (m: MainStateType) => void
) {
  const { user } = mainState;
  const _allUsers = await _getAllUser();
  const _getCategories = await _getAllCategories();
  const _allComment = await _getAllComment();
  const _allLike = await _getAllLike();
  const _allNews = await _getAllNews();
  const _allOrders = await _getAllOrders();
  const _allPost = await _getAllPost();
  const _allContact = await _getAllContact();

  if (!user) {
    mainState.allUsers = _allUsers;
    mainState.allCategories = _getCategories;
    mainState.allComment = _allComment;
    mainState.allproduct = _allPost;
    mainState.allContact = _allContact;
    mainState.allNews = _allNews;
  }
  if (user?.authorization === "user") {
    mainState.allUsers = _allUsers.find((u: any) => u.id === user?.id);
    mainState.allCategories = _getCategories;
    mainState.allComment = _allComment;
    mainState.allproduct = _allPost;
    mainState.allContact = _allContact;
    mainState.allLike = _allLike;
    mainState.allNews = _allNews;
    mainState.allOrders = _allOrders;
  }
}
