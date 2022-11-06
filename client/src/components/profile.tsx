import { MainStateType, UserType } from "./mainState";
import { useState, useEffect } from "react";
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
interface ProfilePageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProfilePage({ mainState, setMainState }: ProfilePageProps) {
  const { user, allUsers } = mainState;
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const findUser: any = allUsers.find((u) => u.id === user?.id);
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 15, mb: 5 }}>
      {user && (
        <div>
          <Typography variant="h6" marginBottom="6%">
            Profile {findUser.name}
          </Typography>
          <div className="row">
            <div className="col-md-5 pt-3 pb-3">
              <img
                className="card-img-top pt-3 pb-3"
                src={findUser.image}
                height="200"
                width="140"
                alt={user.image}
              />

              <p className="font-weight-bold ">{findUser.name}</p>
              <p className="font-weight-bold ">{findUser.email}</p>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpen(true);
                    setSelectedUser(user);
                    mainState.allUsers = [findUser, ...mainState.allUsers];
                    setMainState({ ...mainState });
                  }}
                >
                  Edit Profile
                </Button>
                <Button
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
                      <ListItemText primary={findUser.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Eamil :</ListItemIcon>
                      <ListItemText primary={findUser.email} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Password :</ListItemIcon>
                      <ListItemText primary={findUser.password} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="row mt-2">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>Phone :</ListItemIcon>
                      <ListItemText primary={findUser.phone} />
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

      {user && (
        <ProfileForm
          open={open}
          setOpen={setOpen}
          user={selectedUser}
          mainState={mainState}
          setMainState={setMainState}
          findUser={findUser}
        />
      )}
    </Container>
  );
}

interface ProfileFormProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  user: UserType | any;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
  findUser: any;
}

export function ProfileForm({
  open,
  setOpen,
  user,
  mainState,
  setMainState,
  findUser,
}: ProfileFormProps) {
  const [name, setName] = useState(user ? user.name : "");
  const [id, setID] = useState(user ? user.id : 0);
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.Password : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [image, setImage] = useState(user ? user.image : null);
  const [loading, setLoading] = useState(false);
  console.log(user);
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPhone(user.phone);
    setImage(user.image);
    console.log(user.image);
    setID(user.id);
  }, [user, findUser]);

  const handleImage = (e: any) => {
    if (image === "") {
      setImage(user.image);
    } else {
      setImage(e.target.files[0]);
    }
  };
  const handleSave = async () => {
    setLoading(true);
    user.id = id;
    const fromData: any = new FormData();
    fromData.append("id", id);
    fromData.append("name", name);
    fromData.append("email", email);
    fromData.append("phone", phone);
    if (image !== "") {
      user.image = image;
      fromData.append("image", user.image);
    } else {
      fromData.append("image", image, image.name);
    }
    setOpen(false);
    await _putUser(id, fromData);
    mainState.allUsers = [fromData, ...mainState.allUsers];
    setMainState({ ...mainState });
    setLoading(false);
  };
  return (
    <div>
      {open && user && (
        <div>
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
        </div>
      )}
    </div>
  );
}
