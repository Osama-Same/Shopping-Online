import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  categoryType,
  CheckOutType,
  commentType,
  ContactType,
  LikeType,
  MainStateType,
  NewsType,
  OrderType,
  productType,
  SaveType,
  UserType,
} from "../mainState";
import {
  _putUser,
  _putProducts,
  _putCategories,
  _putComment,
  _putLike,
  _putNews,
  _putOrders,
  _putContact,
  _putSave,
  _putCheckOut,
} from "../../service/putAllData";
import {
  _getAllUser,
  _getAllProducts,
  _getAllCategories,
  _getAllComment,
  _getAllCheckOut,
  _getAllLike,
  _getAllContact,
  _getAllNews,
  _getAllOrders,
  _getAllSave,
} from "../../service/getAllData";
interface EditUserPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  user: UserType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditUserPage({
  open,
  setopen,
  user,
  mainState,
  setMainState,
}: EditUserPageProps) {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPhone(user.phone);
    setImage(user.image);
  }, [user]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          User Form Edit
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <img
            src={user && user.image}
            alt={user.image}
            height="150"
            className="rounded-circle pt-3 pb-3"
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            disabled
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            value={phone}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <Button variant="contained" component="label">
            <input
              accept=".jpg,.png,.svg"
              multiple
              type="file"
              name="image"
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("name", name);
            fromData.append("email", email);
            fromData.append("password", password);
            fromData.append("phone", phone);
            fromData.append("userProduct", []);
            if (image !== "") {
              user.image = image;
              fromData.append("image", user.image);
            } else {
              fromData.append("image", image, image.name);
            }
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.image = image;
            user.userProduct = [];
            await _putUser(user.id, fromData);
            let getallUsers = await _getAllUser();
            mainState.allUsers = getallUsers;
            mainState.render = "users";
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditProductPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  product: productType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EidtProductPage({
  open,
  setopen,
  product,
  mainState,
  setMainState,
}: EditProductPageProps) {
  const [iduser, setIduser] = useState(product && product.iduser);
  const [idcategory, setIdCategory] = useState(product && product.iduser);
  const [name, setName] = useState(product ? product.name : "");
  const [country, setCountry] = useState(product ? product.country : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [date, setDate] = useState(product ? product.date : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [images, setImages] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!product) return;
    setName(product.name);
    setIduser(product.iduser);
    setIdCategory(product.idcategory);
    setCountry(product.country);
    setImages(product.images);
    setPrice(product.price);
    setDate(product.date);
    setDescription(product.description);
  }, [product]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Product Form Save
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <TextField
            fullWidth
            disabled
            label="iduser"
            onChange={(e: any) => setIduser(e.target.value)}
            name="iduser"
            value={iduser}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
            marginBottom: 2,
          }}
        >
          <TextField
            fullWidth
            disabled
            label="idcategory"
            onChange={(e: any) => setIdCategory(e.target.value)}
            name="idcategory"
            value={idcategory}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            value={country}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="price"
            onChange={(e: any) => setPrice(e.target.value)}
            name="price"
            value={price}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            onChange={(e) => setDate(e.target.value)}
            name="date"
            value={date}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <Button variant="contained" component="label">
            <input
              accept=".jpg,.png,.svg"
              multiple
              type="file"
              name="images"
              onChange={(e: any) => setImages(e.target.files[0])}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("iduser", iduser);
            fromData.append("idcategory", idcategory);
            fromData.append("name", name);
            fromData.append("country", country);
            fromData.append("price", price);
            fromData.append("date", date);
            fromData.append("description", description);
            if (images !== "") {
              product.images = images;
              fromData.append("images", product.images);
            } else {
              fromData.append("images", images, images.name);
            }
            await _putProducts(product.id, fromData);
            let getAllProducts = await _getAllProducts();
            mainState.allProducts = getAllProducts;
            mainState.render = "products";
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
interface EditCategoriesPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  category: categoryType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function EditCategoriesPage({
  open,
  setopen,
  category,
  mainState,
  setMainState,
}: EditCategoriesPageProps) {
  const [parentid, setParentid] = useState(category ? category.parentid : 0);
  const [name, setName] = useState(category ? category.name : "");
  const [logo, setLogo] = useState<any>(null);
  const [categorytype, setcategorytype] = useState(
    category ? category.categorytype : 0
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!category) return;
    setParentid(category.parentid);
    setName(category.name);
    setLogo(category.logo);
    setcategorytype(category.categorytype);
  }, [category]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Category Form Edit
        </DialogContentText>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="parentid"
            onChange={(e: any) => setParentid(e.target.value)}
            name="parentid"
            value={parentid}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            onChange={(e) => setName(e.target.value)}
            name="name"
            value={name}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="categorytype"
            onChange={(e: any) => setcategorytype(e.target.value)}
            name="categorytype"
            value={categorytype}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <Button variant="contained" component="label">
            <input
              accept=".jpg,.png,.svg"
              multiple
              type="file"
              name="logo"
              onChange={(e: any) => setLogo(e.target.files[0])}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("name", name);
            fromData.append("parentid", parentid);
            fromData.append("categorytype", categorytype);
            if (logo !== "") {
              category.logo = logo;
              fromData.append("logo", category.logo);
            } else {
              fromData.append("logo", logo, logo.name);
            }
            await _putCategories(category.id, fromData);
            let getAllCategories = await _getAllCategories();
            mainState.allCategories = getAllCategories;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditCommentPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  comments: commentType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditCommentPage({
  open,
  setopen,
  comments,
  mainState,
  setMainState,
}: EditCommentPageProps) {
  const [iduser, setIduser] = useState(comments.iduser);
  const [idproduct, setidProduct] = useState(comments.idproduct);
  const [comment, setComment] = useState(comments ? comments.comment : "");
  const [date, setDate] = useState(new Date().toString());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!comments) return;
    setIduser(comments.iduser);
    setidProduct(comments.idproduct);
    setComment(comments.comment);
    setDate(comments.date);
  }, [comments]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Comment Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="iduser"
            onChange={(e: any) => setIduser(e.target.value)}
            name="iduser"
            value={iduser}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="idproduct"
            onChange={(e: any) => setidProduct(e.target.value)}
            name="idproduct"
            value={idproduct}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="comment"
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            value={comment}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="date"
            onChange={(e) => setDate(date)}
            name="date"
            value={date}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
            setMainState({ ...mainState });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            comments.iduser = iduser;
            comments.idproduct = idproduct;
            comments.comment = comment;
            comments.date = date;

            await _putComment(comments.id, comments);
            let getAllComment = await _getAllComment();
            mainState.allComment = getAllComment;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
interface EditLikePageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  like: LikeType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditLikePage({
  open,
  setopen,
  like,
  mainState,
  setMainState,
}: EditLikePageProps) {
  const [iduser, setIduser] = useState(like.iduser);
  const [idproduct, setidProduct] = useState(like.idproduct);
  const [likee, setLike] = useState(like ? like.likee : 0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!like) return;
    setIduser(like.iduser);
    setidProduct(like.idproduct);
    setLike(like.likee);
  }, [like]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Like Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="iduser"
            onChange={(e: any) => setIduser(e.target.value)}
            name="iduser"
            value={iduser}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="idproduct"
            onChange={(e: any) => setidProduct(e.target.value)}
            name="idproduct"
            value={idproduct}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="likee"
            onChange={(e: any) => setLike(e.target.value)}
            name="likee"
            value={likee}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
            setMainState({ ...mainState });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            like.iduser = iduser;
            like.idproduct = idproduct;
            like.likee = likee;
            await _putLike(like.id, like);
            let getAllLike = await _getAllLike();
            mainState.allLike = getAllLike;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditNewsPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  news: NewsType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditNewsPage({
  open,
  setopen,
  news,
  mainState,
  setMainState,
}: EditNewsPageProps) {
  const [email, setEmail] = useState(news ? news.email : "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!news) return;
    setEmail(news.email);
  }, [news]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Like Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            news.email = email;
            await _putNews(news.id, news);
            let getAllNews = await _getAllNews();
            mainState.allNews = getAllNews;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditOrderPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  order: OrderType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditOrderPage({
  open,
  setopen,
  order,
  mainState,
  setMainState,
}: EditOrderPageProps) {
  const [iduser, setIduser] = useState(order.iduser);
  const [idproduct, setidProduct] = useState(order.idproduct);
  const [quantity, setQuantity] = useState(order ? order.quantity : 0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!order) return;
    setIduser(order.iduser);
    setidProduct(order.idproduct);
    setQuantity(order.quantity);
  }, [order]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Order Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="iduser"
            onChange={(e: any) => setIduser(e.target.value)}
            name="iduser"
            value={iduser}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="idproduct"
            onChange={(e: any) => setidProduct(e.target.value)}
            name="idproduct"
            value={idproduct}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="quantity"
            onChange={(e: any) => setQuantity(e.target.value)}
            name="quantity"
            value={quantity}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
            setMainState({ ...mainState });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            order.iduser = iduser;
            order.idproduct = idproduct;
            order.quantity = quantity;
            await _putOrders(order.id, order);
            let getAllOrder = await _getAllOrders();
            mainState.allOrders = getAllOrder;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditContactPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  contact: ContactType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditContactPage({
  open,
  setopen,
  contact,
  mainState,
  setMainState,
}: EditContactPageProps) {
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [massage, setMassage] = useState(contact ? contact.massage : "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!contact) return;
    setEmail(contact.email);
    setMassage(contact.massage);
  }, [contact]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Like Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="massage"
            onChange={(e) => setMassage(e.target.value)}
            name="massage"
            value={massage}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            contact.email = email;
            contact.massage = massage;
            await _putContact(contact.id, contact);
            let getAllContacts = await _getAllContact();
            mainState.allContact = getAllContacts;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditSavePageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  savee: SaveType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function EditSavePage({
  open,
  setopen,
  savee,
  mainState,
  setMainState,
}: EditSavePageProps) {
  const [iduser, setIduser] = useState(savee.iduser);
  const [idproduct, setidProduct] = useState(savee.idproduct);
  const [save, setSave] = useState(savee ? savee.save : "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!savee) return;
    setIduser(savee.iduser);
    setidProduct(savee.idproduct);
    setSave(savee.save);
  }, [savee]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Comment Form Save
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="iduser"
            onChange={(e: any) => setIduser(e.target.value)}
            name="iduser"
            value={iduser}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            disabled
            label="idproduct"
            onChange={(e: any) => setidProduct(e.target.value)}
            name="idproduct"
            value={idproduct}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Save</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={save}
              label="Save"
              name="save"
              onChange={(e) => setSave(e.target.value)}
            >
              <MenuItem value={"save"}>save</MenuItem>
              <MenuItem value={"unsave"}>unsave</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setopen(false);
            setMainState({ ...mainState });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setopen(true);
            savee.iduser = iduser;
            savee.idproduct = idproduct;
            savee.save = save;
            await _putSave(savee.id, savee);
            let getAllSave = await _getAllSave();
            mainState.allSave = getAllSave;
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface EditCheckOutPageProps {
  open: boolean;
  setopen: (b: boolean) => void;
  checkOut: CheckOutType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function EditCheckOutPage({
  open,
  setopen,
  checkOut,
  mainState,
  setMainState,
}: EditCheckOutPageProps) {
  const [iduser, setIduser] = useState(checkOut.iduser);
  const [priceOut, setpriceOut] = useState(checkOut ? checkOut.priceOut : 0);
  const [CreditCardNumber, setCreditCardNumber] = useState(
    checkOut ? checkOut.CreditCardNumber : ""
  );
  const [expMonth, setExpMonth] = useState(checkOut ? checkOut.expMonth : "");
  const [cvv, setCvv] = useState(checkOut ? checkOut.cvv : "");
  const [selectedUser, setselectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!checkOut) return;
    setIduser(checkOut.iduser)
    setpriceOut(checkOut.priceOut);
    setCreditCardNumber(checkOut.CreditCardNumber);
    setExpMonth(checkOut.expMonth);
    setCvv(checkOut.cvv);
    setselectedUser(
      mainState.allUsers.find((u: UserType) => u.id === checkOut.iduser)
    );
  }, [checkOut]);
  return (
    <Dialog open={open} onClose={() => setopen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          Check Out Form
        </DialogContentText>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">users</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="users"
              name="iduser"
              onChange={(e: any) => setIduser(e.target.value)}
              value={iduser}
            >
              {mainState.allUsers.map((user: UserType) => {
                return (
                  <MenuItem value={user.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={user.image} /> <span>{user.name}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="priceOut"
            type="text"
            onChange={(e: any) => {
              setpriceOut(e.target.value);
            }}
            name="priceOut"
            value={priceOut}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="CreditCardNumber"
            type="text"
            onChange={(e) => setCreditCardNumber(e.target.value)}
            name="password"
            value={CreditCardNumber}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            type="date"
            onChange={(e) => setExpMonth(e.target.value)}
            name="expMonth"
            value={expMonth}
          />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
          }}
        >
          <TextField
            fullWidth
            label="cvv"
            type="text"
            onChange={(e) => setCvv(e.target.value)}
            name="cvv"
            value={cvv}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setopen(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            checkOut.iduser = iduser;
            checkOut.priceOut = priceOut;
            checkOut.CreditCardNumber = CreditCardNumber;
            checkOut.expMonth = expMonth;
            checkOut.cvv = cvv;
            checkOut = selectedUser;
            await _putCheckOut(checkOut.id, checkOut);
            /* let allCheckOut = await _getAllCheckOut();
            mainState.allCheckOut = allCheckOut; */
            mainState.allCheckOut.filter(
              (u: CheckOutType) => u.id === checkOut.id
            );
            mainState.render = "checkOut";
            setMainState({ ...mainState });
            setLoading(false);
            setopen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
