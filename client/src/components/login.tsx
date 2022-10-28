import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { _loginUser } from "../service/postAllData";
import { updateUserState } from "./users";
import Link from "@mui/material/Link";
import { MainStateType } from "./mainState";
interface LoginPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function LoginPage({ mainState, setMainState }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10, mb: 5 }}>
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
          Login
        </Typography>
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
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={async () => {
            setLoading(true);
            const user = { email: email, password: password };
            const res: any = await _loginUser(user);           
            mainState.user = res;
            setMainState({ ...mainState });
            setLoading(false);
          }}
        >
          {loading ? <CircularProgress color="inherit" /> : "Login"}
        </Button>
        <Typography component="body" variant="body2">
          Already have an account ?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              mainState.render = "register";
              setMainState({ ...mainState });
            }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
