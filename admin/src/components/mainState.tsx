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
  allCheckOut: CheckOutType[];

  render: string;
};

export type UserType = {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  authorization?: string;
  userProduct?: productType[] | any;
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
};
export type LikeType = {
  id: number;
  iduser: number;
  idproduct: number;
  likee: number;
};
export type commentType = {
  id: number;
  iduser: number;
  idproduct: number;
  comment: string;
  date: string;
};
export type OrderType = {
  id: number;
  iduser: number;
  idproduct: number;
  quantity: number;
};
export type SaveType = {
  id?: number;
  iduser: number;
  idproduct: number;
  save: string;
};
export type CheckOutType = {
  id?: number;
  iduser: number;
  priceOut: number;
  CreditCardNumber: string;
  expMonth: string;
  cvv: string;
  checkUser?: UserType | any;
};
