import { MainStateType } from "./mainState";
import { HomePage } from "./home";
import { AboutPage } from "./about";
import { ContactPage } from "./contact";
import { CategoryPage } from "./categories";
import { ProductsPage } from "./products";
import { RegisterPage } from "./register";
import { LoginPage } from "./login";
import { ProfilePage } from "./profile";
import { ViewProductPage } from "./viewProduct";
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
  if (render === "viewProductPage") {
    return <ViewProductPage mainState={mainState} setMainState={setMainState} />;
  }
  return <div></div>;
}
