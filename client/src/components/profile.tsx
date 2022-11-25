import {
  commentType,
  LikeType,
  MainStateType,
  productType,
  SaveType,
  UserType,
} from "./mainState";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { _putUser } from "../service/putAllData";
import ConfirmDeleteDialog from "./common/ConfirmDeleteDialog";
import { _deleteUser } from "../service/deleteAllData";
import Tabs from "@mui/material/Tabs";
import FlagIcon from "@mui/icons-material/Flag";
import Tab from "@mui/material/Tab";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { OrdersPage } from "./orders";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Divider,
} from "@mui/material";
import { _getAllUser } from "../service/getAllData";
interface ProfilePageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProfilePage({ mainState, setMainState }: ProfilePageProps) {
  const { user } = mainState;
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <TopsPage mainState={mainState} setMainState={setMainState} />
      <Typography variant="h5" sx={{ mt: 10, mb: 5, color: "orange" }}>
        <Divider textAlign="left"> Profile {user.name}</Divider>
      </Typography>
      {user && (
        <div>
          <div className="row">
            <div className="col-md-5 pt-3 pb-3">
              <Card>
                <img
                  className="rounded-circle pt-3 pb-3"
                  src={user.image}
                  width="304"
                  height="236"
                  alt={user.image}
                />
                <CardContent>
                  <Typography sx={{ md: 2 }} variant="h5">
                    {user.name}
                  </Typography>
                  <Typography sx={{ md: 2, mt: 2 }}>{user.email}</Typography>
                  <Typography sx={{ md: 2, mt: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Button
                        startIcon={<EditIcon />}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setOpen(true);
                          setSelectedUser(user);
                          mainState.user = user;
                          setMainState({ ...mainState });
                        }}
                      >
                        Edit Profile
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setSelectedUser(user);
                          setopenConfirmDelDlg(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <div className="col pt-3 pb-3">
              <Typography variant="h6" marginBottom="4%">
                Information
              </Typography>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Name :</ListItemIcon>
                      <ListItemText primary={user.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Eamil :</ListItemIcon>
                      <ListItemText primary={user.email} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Password :</ListItemIcon>
                      <ListItemText primary={user.password} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Phone :</ListItemIcon>
                      <ListItemText primary={user.phone} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmDeleteDialog
        open={openConfirmDelDlg}
        setopen={setopenConfirmDelDlg}
        text={`do ${
          selectedUser && selectedUser.name
        }  will be deleted permenantly, are you sure?`}
        onConfirm={async () => {
          if (!selectedUser) return;
          await _deleteUser(selectedUser.id);
          mainState.allUsers = mainState.allUsers.filter(
            (u) => u.id !== selectedUser.id
          );
          window.location.href = "/";
          setMainState({ ...mainState });
        }}
        mainState={mainState}
        setMainState={setMainState}
      />

      <ProfileForm
        open={open}
        setOpen={setOpen}
        mainState={mainState}
        setMainState={setMainState}
      />
    </Container>
  );
}

interface ProfileFormProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProfileForm({
  open,
  setOpen,
  mainState,
  setMainState,
}: ProfileFormProps) {
  const { user } = mainState;
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [image, setImage] = useState(user ? user.image : null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e: any) => {
    if (image === "") {
      setImage(user.image);
    } else {
      setImage(e.target.files[0]);
    }
  };
  const handleSave = async () => {
    setLoading(true);
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.image = image;
    const fromData = new FormData();
    fromData.append("id", user.id);
    fromData.append("name", name);
    fromData.append("email", email);
    fromData.append("phone", phone);
    if (image !== "") {
      user.image = image;
      fromData.append("image", user.image);
    } else {
      fromData.append("image", image, image.name);
    }
    await _putUser(user.id, fromData);
    mainState.allUsers = await _getAllUser();
    mainState.user = mainState.allUsers.find(
      (u: UserType) => u.id === user?.id
    );
    setMainState({ ...mainState });
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
          User Form osama
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
            fullWidth
            disabled
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
              onChange={handleImage}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => handleSave()}>
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SaveProfileProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function SaveProfile({ mainState, setMainState }: SaveProfileProps) {
  const { user, allProducts, allComment, allLike } = mainState;
  if (!user) return <div>Not User</div>;
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <TopsPage mainState={mainState} setMainState={setMainState} />

      <Typography variant="h5" sx={{ mt: 10, mb: 5, color: "orange" }}>
        <Divider textAlign="left"> List Save</Divider>
      </Typography>
      <div className="row">
        {user.userSave.map((product: SaveType) => {
          return (
            <div className="col-md-4 pt-3 pb-3">
              <Card>
                <CardActionArea
                  onClick={() => {
                    const findProduct = allProducts.find(
                      (p: productType) => p.id === product.id
                    );

                    const findLike = allLike.filter(
                      (l: LikeType) => l.idproduct === product.id
                    );
                    const findComment = allComment.filter(
                      (p: commentType) => p.idproduct === product.id
                    );
                    mainState.selectedProduct = findProduct;
                    mainState.ListLikeProduct = findLike;
                    mainState.ListCommentProduct = findComment;
                    mainState.render = "viewProductPage";
                    setMainState({ ...mainState });
                  }}
                >
                  <CardMedia
                    component="img"
                    height="230"
                    image={product.saveProduct && product.saveProduct.images}
                    alt={product.saveProduct.images}
                    title="osama"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                    {product.saveProduct.name}
                    </Typography>
                    <Typography variant="body2">
                      {product.saveProduct.description}
                    </Typography>
                    <Stack
                      mb={2}
                      mt={2}
                      spacing={2}
                      direction="row"
                      justifyContent="space-around"
                      alignItems="center"
                    >
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={product.saveProduct.date}
                        variant="outlined"
                      />
                      <Chip
                        icon={<FlagIcon />}
                        label={
                          product.saveProduct.country
                        }
                        variant="outlined"
                      />
                      <Chip
                        icon={<AttachMoneyIcon />}
                        label={product.saveProduct.price}
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

interface TopsProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function TopsPage({ mainState, setMainState }: TopsProps) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Tabs value={value} onChange={handleChange} centered>
      <Tab
        label="Profile"
        onClick={() => {
          mainState.render = "profile";
          setMainState({ ...mainState });
        }}
      />
      <Tab
        label="save"
        onClick={() => {
          mainState.render = "saveprofile";
          setMainState({ ...mainState });
        }}
      />
      <Tab
        label="Orders"
        onClick={() => {
          mainState.render = "ordersprofile";
          setMainState({ ...mainState });
        }}
      />
    </Tabs>
  );
}

export function OrderProfile({ mainState, setMainState }: TopsProps) {
  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <TopsPage mainState={mainState} setMainState={setMainState} />
        <OrdersPage mainState={mainState} setMainState={setMainState} />
      </Container>
    </div>
  );
}
