export type MainStateType = {
  allUsers: UserType[];
  allCategories: categoryType[];
  allComment: commentType[];
  allContact: ContactType[];
  allProducts: productType[];
  allLike: LikeType[];
  allNews: NewsType[];
  allOrders: OrderType[];
  allSave: SaveType[];
  user: UserType | null | any;
  render: string;
  dark: string;
  selectedProductView: productType | null | any;
  selectedLikeProduct: LikeType | null | any;
  selectedCommentProduct: commentType | null | any;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  authorization?: string;
  orderUser?: OrderType[];
  saveUser?: SaveType[];
  commentUser?: commentType[];
  likeUser?: LikeType[];
};
export type ContactType = {
  id?: number;
  email: string;
  massage: string;
};
export type NewsType = {
  id: number;
  email: string;
};
export type categoryType = {
  id: number;
  parentid: number;
  name: string;
  logo: string;
  cloudinary_id: string;
  categorytype: number;
  categoryProduct?: categoryType[];
};
export type productType = {
  id: number;
  iduser: number;
  idcategory: number;
  name: string;
  country: string;
  images?: string;
  price: number;
  date: string;
  description: string;
  cloudinary_id?: string;
  commentProduct: commentType[];
  likeeProduct: LikeType[];
  SaveProduct: SaveType[];
};
export type LikeType = {
  id?: number;
  iduser: number;
  idproduct: number;
  likee: string;
  likeUser?: UserType[];
  likeProduct?: productType[];
};
export type commentType = {
  id?: number;
  iduser: number;
  idproduct: number;
  comment: string;
  date: string;
  commentUser?: UserType[];
  commentProduct?: productType[];
};
export type OrderType = {
  id: number;
  iduser: number;
  idproduct: number;
  quantity: number;
  orderUser: UserType[];
};
export type SaveType = {
  id: number;
  iduser: number;
  idproduct: number;
  save: string;
  saveUser: UserType[];
};
