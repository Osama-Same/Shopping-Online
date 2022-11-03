export type MainStateType = {
  allUsers: UserType[];
  allCategories: categoryType[];
  allComment: commentType[];
  allContact: ContactType[];
  allProducts: productType[] ;
  allLike: LikeType[];
  allNews: NewsType[];
  allOrders: OrderType[];
  allSave: SaveType[];
  user: UserType | null;
  render: string;
  dark: string;
  selectProduct: productType | null | any;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  authorization?: string;
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
};
export type productType = {
  id: number;
  iduser: number;
  idcategory: number;
  name: string;
  country: string;
  images: string;
  price: number;
  date: string;
  description: string;
  cloudinary_id: string;
  userProduct: UserType[];
  categoryProduct: categoryType[];
  CommentProduct: commentType[];
  saveProduct: SaveType[];
  likeeProduct: LikeType[];
};
export type LikeType = {
  id?: number;
  iduser: number;
  idproduct: number;
  likee: string;
  likeNum: number;
  likeUser?: UserType;
};
export type commentType = {
  id?: number;
  iduser: number;
  idproduct: number;
  comment: string;
  date: string;
  commentUser?: UserType;
};
export type OrderType = {
  id: number;
  iduser: number;
  idproduct: number;
  quantity: number;
};
export type SaveType = {
  id: number;
  iduser: number;
  idproduct: number;
  save: number;
};
