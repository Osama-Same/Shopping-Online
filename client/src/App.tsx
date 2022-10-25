import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { MainPage } from "./components/mainPage";
import { MainStateType } from "./components/mainState";
import { ToastContainer } from "react-toastify";
import { updateUserState } from "./components/users";
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
    allproduct: [],
    render: "",
    user: null,
  });
  useEffect(() => {
    updateUserState(mainState,setMainState);
  }, [mainState]);
  console.log("mainState", mainState);

  return (
    <div className="App">
      <ToastContainer />
      <Navigation mainState={mainState} setMainState={setMainState} />
      <Stack>
        <MainPage mainState={mainState} setMainState={setMainState} />
      </Stack>
    </div>
  );
};

export default App;
