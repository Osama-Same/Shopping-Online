import { useState, useEffect } from "react";
import { MainPage } from "./components/mainPage";
import { HeaderPage } from "./components/header";
import { MainStateType } from "./components/mainState";
import { ToastContainer } from "react-toastify";
import { updateUserState } from "./components/users";
import { FooterPage } from "./components/footer";
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
    listUserOrder: [],
    ListUserSave: [],
    ListCheckOut: [],
    ListLikeProduct: [],
    ListCommentProduct: [],
    ListOrdersProduct: [],
    ListCategoriesProducts: [],
    render: "",
    user: null,
    selectedProduct: null,
  });
  useEffect(() => {
    updateUserState(mainState, setMainState);
  }, [mainState]);

  console.log(mainState);

  return (
    <div className="App">
      <ToastContainer />
      <HeaderPage mainState={mainState} setMainState={setMainState} />
      <MainPage mainState={mainState} setMainState={setMainState} />

      <FooterPage mainState={mainState} setMainState={setMainState} />
    </div>
  );
};

export default App;
