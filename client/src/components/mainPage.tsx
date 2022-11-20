import { MainStateType } from "./mainState";
import { HomePage } from "./home";
import { AboutPage } from "./about";
import { ContactPage } from "./contact";
import { CategoryPage } from "./categories";
import { ProductsPage } from "./products";
import { RegisterPage } from "./register";
import { LoginPage } from "./login";
import { ProfilePage,SaveProfile ,OrderProfile} from "./profile";
import { ViewProductPage } from "./viewProduct";
import { OrdersPage } from "./orders";
interface MainPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function MainPage({ mainState, setMainState }: MainPageProps) {
  const { render } = mainState;
  if (render === "") {
    return <HomePage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "about") {
    return <AboutPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "contact") {
    return <ContactPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "category") {
    return <CategoryPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "products") {
    return <ProductsPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "register") {
    return <RegisterPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "login") {
    return <LoginPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "profile") {
    return <ProfilePage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "saveprofile") {
    return <SaveProfile mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "ordersprofile") {
    return <OrderProfile mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "viewProductPage") {
    return <ViewProductPage mainState={mainState} setMainState={setMainState} />;
  }
  if (render === "orders") {
    return <OrdersPage mainState={mainState} setMainState={setMainState} />;
  }
  return <div></div>;
}
