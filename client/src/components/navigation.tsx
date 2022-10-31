import { MainStateType } from "./mainState";
import { useState } from "react";
import Button from "@mui/material/Button";
import { updateUserState } from "./users";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { logOut } from "../service/getAllData";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
interface NavigationPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function Navigation({ mainState, setMainState }: NavigationPageProps) {
  const { user } = mainState;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {user?.authorization !== "user" && (
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
              <FormControlLabel
                style={{ color: "white" }}
                value="start"
                control={
                  <Switch
                    onClick={() => {
                      mainState.dark =
                        mainState.dark === "dark" ? "light" : "dark";
                      setMainState({ ...mainState });
                    }}
                  />
                }
                label={mainState.dark === "dark" ? "light" : "dark"}
                labelPlacement="start"
              />
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
      {user?.authorization === "user" && (
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
              <li>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Chip
                    style={{ color: "white" }}
                    avatar={<Avatar alt="Natacha" src={user.image} />}
                    label={user.email}
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      mainState.render = "profile";
                      setMainState({ ...mainState });
                    }}
                  >
                    <ListItemIcon>
                      <AccountBoxIcon fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logOut();
                      window.location.href = "/";
                      setMainState({ ...mainState });
                    }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </li>
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
