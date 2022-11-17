import { useState, useEffect, useMemo } from "react";
import { Navigation } from "./components/navigation";
import { MainPage } from "./components/mainPage";
import { HeaderPage } from "./components/header";
import { MainStateType } from "./components/mainState";
import { ToastContainer } from "react-toastify";
import { updateUserState } from "./components/users";
import { FooterPage } from "./components/footer";
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
    allSave: [],
    allCheckOut: [],
    render: "",
    user: null,
    selectedProductView: null,
    selectedLikeProduct: null,
    selectedCommentProduct: null,
  });
  useEffect(() => {
    updateUserState(mainState, setMainState);
  }, [mainState]);

  console.log(mainState);

  return (
    <div className="App">
      <ToastContainer />
      {/* <Navigation mainState={mainState} setMainState={setMainState} /> */}
      <HeaderPage mainState={mainState} setMainState={setMainState} />

      <MainPage mainState={mainState} setMainState={setMainState} />

      <FooterPage mainState={mainState} setMainState={setMainState} />
    </div>
  );
};

export default App;
