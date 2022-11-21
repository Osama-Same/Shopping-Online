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
    user.userProduct = _allProducts.filter(
      (p: productType) => p.iduser === user.id
    );
    user.userLike = _allLike.filter((l:LikeType)=>l.iduser === user.id)
    user.userComment = _allComment.filter((c:commentType)=>c.iduser === user.id)
    user.userOrders = _allOrders.filter((o:OrderType)=>o.iduser === user.id)
    user.userSave = _allSave.filter((s:SaveType)=>s.iduser === user.id)
    user.userCheckOut = _allCheckOut.filter((c:CheckOutType)=>c.iduser === user.id)
  });

  _allProducts.forEach((product: productType) => {
    product.productUser = _allUsers.find(
      (u: UserType) => u.id === product.iduser
    );
    product.productCategory = _allCategories.find(
      (c: categoryType) => c.id === product.idcategory
    );
    product.productlike = _allLike.filter(
      (l: LikeType) => l.idproduct === product.id
    );
    product.productComment = _allComment.filter(
      (c: commentType) => c.idproduct === product.id
    );
    product.productOrders = _allOrders.filter(
      (c: OrderType) => c.idproduct === product.id
    );
    product.productSave = _allSave.filter(
      (c: SaveType) => c.idproduct === product.id
    );
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

  _allOrders.forEach((order: OrderType) => {
    order.orderUser = _allUsers.find((u: UserType) => u.id === order.iduser);
    order.orderProduct = _allProducts.find(
      (p: productType) => p.id === order.idproduct
    );
  });
  _allSave.forEach((save: SaveType) => {
    save.saveUser = _allUsers.find((u: UserType) => u.id === save.iduser);
    save.saveProduct = _allProducts.find(
      (p: productType) => p.id === save.idproduct
    );
  });
  _allCheckOut.forEach((out: CheckOutType) => {
    out.checkUser = _allUsers.find((u: UserType) => u.id === out.iduser);
  });
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
