import { MainStateType } from "./mainState";
import { HomePage } from "./home";
import { AboutPage } from "./about";
import { ContactPage } from "./contact";
import { CategoryPage } from "./categories";
import {ProductsPage} from "./products"
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
  return <div></div>;
}
