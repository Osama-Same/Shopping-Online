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

  _getCategories.forEach((product:any) => {
    product.categoryProduct = _allProducts.filter(
      (c: any) => c.idcategory === product.id
    );
  });
  _allProducts.forEach((p: any) => {
    p.userProduct = _allUsers.find((u: any) => u.id === p.iduser);
    p.categoryProduct = _getCategories.find((c: any) => c.id === p.idcategory);
    p.CommentProduct = _allComment.filter((c: any) => c.idproduct === p.id);
  });

  _allComment.forEach((comment:any)=>{
     comment.commentUser = _allUsers.find((u:any)=>u.id === comment.iduser )
  })

  _allLike.forEach((likee:any)=>{
     likee.likeUser = _allUsers.find((u:any)=> u.id === likee.iduser)
  })

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
  }
}
