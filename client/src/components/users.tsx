import {
  MainStateType,
  UserType,
  LikeType,
  commentType,
  productType,
  OrderType,
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
  _getAllPost,
  _getAllSave,
  _getAllCheckOut,
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
  const _allProducts = await _getAllPost();
  const _allContact = await _getAllContact();
  const _allSave = await _getAllSave();
  const _allCheckOut = await _getAllCheckOut();
  _allProducts.forEach((product: any) => {
    product.category = _allCategories.find(
      (c: any) => c.id === product.idcategory
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
  /*     _allOrders.forEach((order: OrderType) => {
    order.orderUser = _allUsers.filter((o: UserType) => o.id === order.iduser);
    order.orderProduct = _allProducts.filter(
      (p: productType) => p.id === order.idproduct
    );
  });  */
  _allUsers.forEach((use: UserType) => {
    use.orderUser = _allOrders.filter((o: OrderType) => o.iduser === use.id);
    use.orderUser.forEach((uo: any) => {
      uo.orderProduct = _allProducts.find(
        (p: productType) => p.id === uo.idproduct
      );
    });
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
