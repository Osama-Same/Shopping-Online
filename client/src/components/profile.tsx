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
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { toast } from "react-toastify";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Container from "@mui/material/Container";
import { _putUser } from "../service/putAllData";
import { AnyAaaaRecord } from "dns";
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
                    setSelectedUser(user);
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
      {selectedUser && (
        <ProfileForm
          open={open}
          setOpen={setOpen}
          profile={selectedUser}
          mainState={mainState}
          setMainState={setMainState}
        />
      )}
    </Container>
  );
}

interface ProfileFormProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  profile: UserType;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProfileForm({
  open,
  setOpen,
  profile,
  mainState,
  setMainState,
}: ProfileFormProps) {
  console.log("user", profile);

  const [id, setid] = useState(profile.id);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(profile.password);
  const [phone, setPhone] = useState(profile.phone);
  const [image, setImage] = useState<any>(profile.image);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!profile) return;
    setid(profile.id);
    setName(profile.name);
    setEmail(profile.email);
    setPassword(profile.password);
    setPhone(profile.phone);
    setImage(profile.image);
  }, [profile]);
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
        <Avatar sx={{ m: 1, width: 120, height: 140 }} src={image}>
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </Avatar>
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
            const fromData: any = new FormData();
            fromData.append("id", id);
            fromData.append("name", name);
            fromData.append("email", email);
            fromData.append("password", password);
            fromData.append("phone", phone);
            if (image) {
              fromData.append("image", image, image.name);
            }
            const res: any = await _putUser(id, fromData);

            mainState.allUsers = [res, ...mainState.allUsers];
            console.log("res", res);
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
