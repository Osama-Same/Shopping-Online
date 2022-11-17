import { MainStateType} from "./mainState";
import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LoginIcon from "@mui/icons-material/Login";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logOut } from "../service/getAllData";
import Logout from "@mui/icons-material/Logout";
import {
  Avatar,
  Badge,
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

interface HeaderPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function HeaderPage({ mainState, setMainState }: HeaderPageProps) {
  const { allProducts, user } = mainState;
  const [search, setSearch] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <header>
      {!user && (
        <div>
          <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Button
                style={{
                  color: "orange",
                  fontStyle: "italic",
                  fontSize: "15px",
                }}
                onClick={() => {
                  setMainState({ ...mainState });
                }}
              >
                Shopping Online
              </Button>
              <Button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDarkDropdown"
                aria-controls="navbarNavDarkDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </Button>
              <div
                className="collapse navbar-collapse  "
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-left">
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<HomeIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "";
                      setMainState({ ...mainState });
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<InfoTwoToneIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "about";
                      setMainState({ ...mainState });
                    }}
                  >
                    About
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<ContactPhoneIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "contact";
                      setMainState({ ...mainState });
                    }}
                  >
                    Contact
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<CategoryIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "category";

                      setMainState({ ...mainState });
                    }}
                  >
                    Category
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<ShoppingBagIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "products";
                      setMainState({ ...mainState });
                    }}
                  >
                    Products
                  </Button>
                </ul>

                <div className="d-flex align-items-center">
                  <Button
                    sx={{ mr: 2 }}
                    size="small"
                    style={{ color: "white" }}
                    startIcon={<LoginIcon />}
                    onClick={() => {
                      mainState.render = "login";
                      setMainState({ ...mainState });
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    size="small"
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "register";
                      setMainState({ ...mainState });
                    }}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          {mainState.render === "" && (
            <div
              className="p-5 text-center "
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Shopping Online
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Marketing is one of the most important steps of commerce, and
                e-marketing or digital marketing is one of the most important
                modern marketing methods.
              </Typography>
              <Button
                sx={{ marginBottom: "60px" }}
                variant="outlined"
                onClick={() => {
                  mainState.render = "products";
                  setMainState({ ...mainState });
                }}
              >
                Visit Us to Know More
              </Button>
            </div>
          )}
          {mainState.render === "about" && (
            <div
              className="p-5 text-center bg-light"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                About
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                A site specialized in buying and selling that provides you with
                many important services
              </Typography>
            </div>
          )}
          {mainState.render === "contact" && (
            <div
              className="p-5 text-center bg-light"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Your messages are the secret of our development, so do not
                hesitate at all in any note or suggestion that will reach us and
                be of great interest to us.
              </Typography>
            </div>
          )}
          {mainState.render === "category" && (
            <div
              className="p-5 text-center bg-light"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Categories
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Your messages are the secret of our development, so do not
                hesitate at all in any note or suggestion that will reach us and
                be of great interest to us.
              </Typography>
            </div>
          )}
          {mainState.render === "products" && (
            <div
              className="p-5 text-center bg-dark"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "white",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Products
              </Typography>
              <Container maxWidth="md">
                <Stack
                  direction="row"
                  justifyContent="center"
                  sx={{ mt: 5, mb: 7, pt: 2 }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"search"}
                    placeholder="Search Name Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    color={"primary"}
                    focused
                  />

                  <Button
                    variant="contained"
                    onClick={() => {
                      let SearchProduct: any = allProducts.filter((e: any) => {
                        return (
                          e.name.toUpperCase().search(search.toUpperCase()) !==
                          -1
                        );
                      });

                      if (SearchProduct.length === 0) {
                        mainState.render = "products";
                        SearchProduct = mainState.allProducts;
                        console.log("SearchProduct", SearchProduct);
                        setMainState({ ...mainState });
                      }
                      mainState.allProducts = SearchProduct;
                      console.log("SearchProduct", SearchProduct);
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon style={{ color: "white" }} />
                  </Button>
                </Stack>
              </Container>
            </div>
          )}
        </div>
      )}
      {user && (
        <div>
          <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Button
                style={{
                  color: "orange",
                  fontStyle: "italic",
                  fontSize: "15px",
                }}
                onClick={() => {
                  setMainState({ ...mainState });
                }}
              >
                Shopping Online
              </Button>
              <Button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDarkDropdown"
                aria-controls="navbarNavDarkDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </Button>
              <div
                className="collapse navbar-collapse  "
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-left">
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<HomeIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "";
                      setMainState({ ...mainState });
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<InfoTwoToneIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "about";
                      setMainState({ ...mainState });
                    }}
                  >
                    About
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<ContactPhoneIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "contact";
                      setMainState({ ...mainState });
                    }}
                  >
                    Contact
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<CategoryIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "category";

                      setMainState({ ...mainState });
                    }}
                  >
                    Category
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    startIcon={<ShoppingBagIcon />}
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "products";
                      setMainState({ ...mainState });
                    }}
                  >
                    Products
                  </Button>
                </ul>

                <div className="d-flex align-items-center">
                  <IconButton
                    aria-label="cart"
                    style={{ color: "white" }}
                    onClick={() => {
                      mainState.render = "orders";
                      setMainState({ ...mainState });
                    }}
                  >
                    <Badge
                      badgeContent={
                        mainState.user?.orderUser &&
                        mainState.user?.orderUser.length
                      }
                      color="primary"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
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
                </div>
              </div>
            </div>
          </nav>

          {mainState.render === "" && (
            <div
              className="p-5 text-center "
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Shopping Online
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Marketing is one of the most important steps of commerce, and
                e-marketing or digital marketing is one of the most important
                modern marketing methods.
              </Typography>
              <Button
                sx={{ marginBottom: "60px" }}
                variant="outlined"
                onClick={() => {
                  mainState.render = "products";
                  setMainState({ ...mainState });
                }}
              >
                Visit Us to Know More
              </Button>
            </div>
          )}
          {mainState.render === "about" && (
            <div
              className="p-5 text-center bg-light"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                About
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                A site specialized in buying and selling that provides you with
                many important services
              </Typography>
            </div>
          )}
          {mainState.render === "contact" && (
            <div
              className="p-5 text-center bg-light"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Your messages are the secret of our development, so do not
                hesitate at all in any note or suggestion that will reach us and
                be of great interest to us.
              </Typography>
            </div>
          )}
          {mainState.render === "category" && (
            <div
              className="p-5 text-center bg-light"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "silver",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Categories
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Your messages are the secret of our development, so do not
                hesitate at all in any note or suggestion that will reach us and
                be of great interest to us.
              </Typography>
            </div>
          )}
          {mainState.render === "products" && (
            <div
              className="p-5 text-center bg-dark"
              style={{
                minHeight: "40vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "white",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Products
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 5, mb: 5, color: "silver" }}
              >
                A site specialized in buying and selling that provides you with
                many important services
              </Typography>
              <Container maxWidth="md">
                <Stack
                  direction="row"
                  justifyContent="center"
                  sx={{ mt: 5, mb: 7, pt: 2 }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type={"search"}
                    placeholder="Search Name Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    color={"primary"}
                    focused
                  />

                  <Button
                    variant="contained"
                    onClick={() => {
                      let SearchProduct: any = allProducts.filter((e: any) => {
                        return (
                          e.name.toUpperCase().search(search.toUpperCase()) !==
                          -1
                        );
                      });

                      if (SearchProduct.length === 0) {
                        mainState.render = "products";
                        SearchProduct = mainState.allProducts;
                        console.log("SearchProduct", SearchProduct);
                        setMainState({ ...mainState });
                      }
                      mainState.allProducts = SearchProduct;
                      console.log("SearchProduct", SearchProduct);
                      setMainState({ ...mainState });
                    }}
                  >
                    <SearchIcon style={{ color: "white" }} />
                  </Button>
                </Stack>
              </Container>
            </div>
          )}
          {mainState.render === "orders" && (
            <div
              className="p-5 text-center"
              style={{
                minHeight: "30vh",
                backgroundPosition: "center",
                backgroundSize: "cover",
                color: "white",
                background:
                  "linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)), url('https://motionarray.imgix.net/preview-1004604-7RBRX7k1QXWac3KH-large.jpg?w=1400&q=60&fit=max&auto=format')",
              }}
            >
              <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
                Orders
              </Typography>
              <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
                Your messages are the secret of our development, so do not
                hesitate at all in any note or suggestion that will reach us and
                be of great interest to us.
              </Typography>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
