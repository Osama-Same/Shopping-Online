import { MainStateType } from "./mainState";
import Button from "@mui/material/Button";
import { updateUserState } from "./users";
interface NavigationPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function Navigation({ mainState, setMainState }: NavigationPageProps) {
  const { allUsers, user } = mainState;
  const profile = allUsers.find((u) => u.id === user?.id);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {!profile && (
        <div className="container-fluid">
          <Button
            variant="text"
            onClick={() => {
              updateUserState(mainState, setMainState);
            }}
          >
            Shopping
          </Button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Button
                  style={{ color: "white" }}
                  onClick={() => {
                    mainState.render = "";
                    setMainState({ ...mainState });
                  }}
                >
                  Home
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  style={{ color: "white" }}
                  onClick={() => {
                    mainState.render = "about";
                    setMainState({ ...mainState });
                  }}
                >
                  About
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  style={{ color: "white" }}
                  onClick={() => {
                    mainState.render = "contact";
                    setMainState({ ...mainState });
                  }}
                >
                  Contact
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  style={{ color: "white" }}
                  onClick={() => {
                    mainState.render = "category";

                    setMainState({ ...mainState });
                  }}
                >
                  Category
                </Button>
              </li>
              <li className="nav-item">
                <Button
                  style={{ color: "white" }}
                  onClick={() => {
                    mainState.render = "products";

                    setMainState({ ...mainState });
                  }}
                >
                  Products
                </Button>
              </li>
            </ul>
            <div className="d-flex">
              <Button
                style={{ color: "white" }}
                onClick={() => {
                  mainState.render = "login";
                  setMainState({ ...mainState });
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  mainState.render = "register";
                  setMainState({ ...mainState });
                }}
              >
                Register
              </Button>
            </div>
          </div>
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
        </div>
      )}
    </nav>
  );
}
