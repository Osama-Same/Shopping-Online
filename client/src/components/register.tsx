import { MainStateType } from "./mainState";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { _insertUser } from "../service/postAllData";
import Link from "@mui/material/Link";
interface RegisterPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function RegisterPage({ mainState, setMainState }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "100%",
          marginBottom: 0,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          type={"text"}
          label="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          margin="normal"
          fullWidth
          name="email"
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <TextField
          margin="normal"
          fullWidth
          name="Phone"
          label="phone"
          type="tel"
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
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={async () => {
            setLoading(true);
            const fromData: any = new FormData();
            fromData.append("name", name);
            fromData.append("email", email);
            fromData.append("password", password);
            fromData.append("phone", phone);
            if (image) {
              fromData.append("image", image, image.name);
            }
            console.log(fromData);
            await _insertUser(fromData);
            setLoading(false);
            setMainState({ ...mainState });
          }}
        >
          {loading ? <CircularProgress color="inherit" /> : "Register"}
        </Button>

        <Typography component="body" variant="body2">
          Already have an account ?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              mainState.render = "login";
              setMainState({ ...mainState });
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
