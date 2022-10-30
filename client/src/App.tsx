import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { MainPage } from "./components/mainPage";
import { MainStateType } from "./components/mainState";
import { ToastContainer } from "react-toastify";
import { updateUserState } from "./components/users";
import {
  createTheme,
  ThemeProvider,
  experimentalStyled as styled,
} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import "./App.css";
const App = () => {
  const [mainState, setMainState] = useState<MainStateType>({
    allUsers: [],
    allCategories: [],
    allComment: [],
    allContact: [],
    allLike: [],
    allOrders: [],
    allNews: [],
    allProducts: [],
    render: "",
    user: null,
    selectProduct: null,
    dark: "light",
  });
  useEffect(() => {
    updateUserState(mainState, setMainState);
  }, [mainState]);
  console.log("mainState", mainState);
  const theme = createTheme({
    palette: {
      mode: mainState.dark === "light" ? "dark" : "light",
    },
  });
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Navigation mainState={mainState} setMainState={setMainState} />
        <Stack>
          <Item>
            <MainPage mainState={mainState} setMainState={setMainState} />
          </Item>
        </Stack>
      </ThemeProvider>
    </div>
  );
};

export default App;
