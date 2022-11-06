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
  _getAllSave,
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
  const _allProducts = await _getAllPost();
  const _allContact = await _getAllContact();
  const _allSave = await _getAllSave();

  _getCategories.forEach((product: any) => {
    product.categoryProduct = _allProducts.filter(
      (c: any) => c.idcategory === product.id
    );
  });
  _allProducts.forEach((p: any) => {
    p.userProduct = _allUsers.find((u: any) => u.id === p.iduser);
    p.categoryProduct = _getCategories.find((c: any) => c.id === p.idcategory);
    p.CommentProduct = _allComment.filter((c: any) => c.idproduct === p.id);
    p.likeeProduct = _allLike.filter((l: any) => l.idproduct === p.id);
    p.SaveProduct = _allSave.filter((s: any) => s.idproduct === p.id);
  });

  _allUsers.forEach((user: any) => {
    user.saveUser = _allSave.filter((s: any) => s.iduser === user.id);
    user.commentUser = _allComment.filter((c: any) => c.iduser === user.id);
    user.likeUser = _allLike.filter((l: any) => l.iduser === user.id);
    user.productUser = _allProducts.filter((p: any) => p.iduser === user.id);
    user.orderUser = _allOrders.filter((o: any) => o.iduser === user.id);
    user.orderUser.forEach((order: any) => {
      order.orderProduct = _allProducts.find(
        (p: any) => p.id === order.idproduct
      );
    });
  });

  if (!user) {
    mainState.allUsers = _allUsers;
    mainState.allCategories = _getCategories;
    mainState.allComment = _allComment;
    mainState.allProducts = _allProducts;
    mainState.allContact = _allContact;
    mainState.allLike = _allLike;
    mainState.allNews = _allNews;
    mainState.allOrders = _allOrders;
    mainState.allSave = _allSave;
  }
  if (user?.authorization === "user") {
    mainState.allUsers = _allUsers;
    mainState.allCategories = _getCategories;
    mainState.allComment = _allComment;
    mainState.allProducts = _allProducts;
    mainState.allContact = _allContact;
    mainState.allLike = _allLike;
    mainState.allNews = _allNews;
    mainState.allOrders = _allOrders;
    mainState.allSave = _allSave;
    mainState.user = user;
    mainState.user = _allUsers.find((u: any) => u.id === user?.id);
  }
}
