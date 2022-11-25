import {
  MainStateType,
  UserType,
  LikeType,
  commentType,
  productType,
  OrderType,
  SaveType,
  CheckOutType,
  categoryType,
} from "./mainState";
import {
  _getAllUser,
  _getAllCategories,
  _getAllComment,
  _getAllContact,
  _getAllLike,
  _getAllNews,
  _getAllOrders,
  _getAllSave,
  _getAllCheckOut,
  _getAllProducts,
} from "../service/getAllData";

export async function updateUserState(
  mainState: MainStateType,
  setMainState: (m: MainStateType) => void
) {
  const { user } = mainState;
  const _allUsers = await _getAllUser();
  const _allCategories = await _getAllCategories();
  const _allComment = await _getAllComment();
  const _allLike = await _getAllLike();
  const _allNews = await _getAllNews();
  const _allOrders = await _getAllOrders();
  const _allProducts = await _getAllProducts();
  const _allContact = await _getAllContact();
  const _allSave = await _getAllSave();
  const _allCheckOut = await _getAllCheckOut();

  _allUsers.forEach((user: UserType) => {
    user.userOrders = _allOrders.filter((o: OrderType) => o.iduser === user.id);
    user.userOrders.forEach((order: OrderType) => {
      order.orderProduct = _allProducts.find(
        (p: productType) => p.id === order.idproduct
      );
    });
    user.userSave = _allSave.filter((s: SaveType) => s.iduser === user.id);
    user.userSave.forEach((save: SaveType) => {
      save.saveProduct = _allProducts.find(
        (p: productType) => p.id === save.idproduct
      );
    });
  });

  _allCategories.forEach((category: categoryType) => {
    category.categoryProduct = _allProducts.filter(
      (p: productType) => p.idcategory === category.id
    );
  });
  _allComment.forEach((comment: commentType) => {
    comment.commentUser = _allUsers.find(
      (u: UserType) => u.id === comment.iduser
    );
    comment.commentProduct = _allProducts.find(
      (p: productType) => p.id === comment.idproduct
    );
  });
  _allLike.forEach((like: LikeType) => {
    like.likeUser = _allUsers.find((u: UserType) => u.id === like.iduser);
    like.likeProduct = _allProducts.find(
      (p: productType) => p.id === like.idproduct
    );
  });

  _allCheckOut.forEach((out: CheckOutType) => {
    out.checkUser = _allUsers.find((u: UserType) => u.id === out.iduser);
  });
  if (!user) {
    mainState.allUsers = _allUsers;
    mainState.allCategories = _allCategories;
    mainState.allComment = _allComment;
    mainState.allProducts = _allProducts;
    mainState.allContact = _allContact;
    mainState.allLike = _allLike;
    mainState.allNews = _allNews;
    mainState.allOrders = _allOrders;
    mainState.allSave = _allSave;
    mainState.allCheckOut = _allCheckOut;
  }
  if (user?.authorization === "user") {
    mainState.allCheckOut = _allCheckOut;
    mainState.allUsers = _allUsers;
    mainState.allCategories = _allCategories;
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
