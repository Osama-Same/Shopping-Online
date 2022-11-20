import {
  MainStateType,
  UserType,
  LikeType,
  commentType,
  productType,
  OrderType,
  SaveType,
  CheckOutType,
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
  });
   
  _allCheckOut.forEach((out:CheckOutType)=>{
    out.checkUser = _allUsers.find((u:UserType)=>u.id === out.iduser)
  })
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
