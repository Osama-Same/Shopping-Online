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
import { _getAllUser } from "../service/getAllData";

interface ProfilePageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProfilePage({ mainState, setMainState }: ProfilePageProps) {
  const { user, allUsers } = mainState;
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 15, mb: 5 }}>
      {user && (
        <div>
          <Typography variant="h6" marginBottom="6%">
            Profile {user.name}
          </Typography>
          <div className="row">
            <div className="col-md-5 pt-3 pb-3">
              <img
                className="card-img-top pt-3 pb-3"
                src={user.image}
                height="200"
                width="140"
                alt={user.image}
              />

              <p className="font-weight-bold ">{user.name}</p>
              <p className="font-weight-bold ">{user.email}</p>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Edit Profile
                </Button>
                <Button variant="contained" color="error">
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

      {user && (
        <ProfileForm
          open={open}
          setOpen={setOpen}
          user={user}
          mainState={mainState}
          setMainState={setMainState}
          onUpdate={async () => {
            const _users = await _getAllUser();
            mainState.allUsers = _users;
          }}
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
  onUpdate: any;
}

export function ProfileForm({
  open,
  setOpen,
  user,
  mainState,
  setMainState,
  onUpdate,
}: ProfileFormProps) {
  const [id, setID] = useState<any>(user ? user.id : 0);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [image, setImage] = useState<any>(user ? user.image : null);
  const [loading, setLoading] = useState(false);
  const { allUsers } = mainState;
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setPhone(user.phone);
    setImage(user.image);
    setID(user.id);
  }, [user]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "5%", textAlign: "center" }}>
          Profile Form
        </DialogContentText>

        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginBottom: "5%",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            disabled
            margin="normal"
            label="Name"
            type={"number"}
            name="id"
            onChange={(e) => setName(e.target.value)}
            value={id}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            type={"taxt"}
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            fullWidth
            margin="normal"
            type={"email"}
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            fullWidth
            disabled
            margin="normal"
            type={"password"}
            label="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <TextField
            fullWidth
            margin="normal"
            type={"tel"}
            label="Phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <input
            className="form-control"
            style={{ marginTop: "10px" }}
            type="file"
            accept=".jpg,.png,.svg"
            multiple
            name="image"
            onChange={(e: any) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={async () => {
            setLoading(true);

            user.id = id;
            user.name = name;
            user.email = email;
            user.password = password;
            user.phone = phone;
            user.authorization = "user";
            user.id = id;
            const fromData = new FormData();

            if (image !== "") {
              user.image = image;
              fromData.append("image", user.image);
            } else {
              setImage(fromData.append("image", image, image.name));
            }

            user.image = image;
            const res: any = await _putUser(id, user);
            setLoading(true);
            const findUser :any = user.find((u:any) => u.id === res?.id);
            console.log("findUser", findUser);
            mainState.user = findUser;
            mainState.allUsers = [findUser, ...mainState.allUsers];
            setMainState({ ...mainState });
            setLoading(false);
            setOpen(false);
          }}
        >
          {loading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
