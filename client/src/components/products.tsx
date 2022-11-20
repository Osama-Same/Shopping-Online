import {
  categoryType,
  MainStateType,
  OrderType,
  productType,
  SaveType,
} from "./mainState";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Avatar, Box, Button, CardActionArea, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlagIcon from "@mui/icons-material/Flag";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import SaveIcon from "@mui/icons-material/Save";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Container from "@mui/material/Container";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { _putSave } from "../service/putAllData";
import { _insetSave, _insetOrders, _loginUser } from "../service/postAllData";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface ProductsPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProductsPage({ mainState, setMainState }: ProductsPageProps) {
  const { allProducts, user, allLike, allComment } = mainState;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  if (!allProducts) return <div>{loading && <CircularProgress />}</div>;
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      {mainState.allCategories.map((category: categoryType) => {
        return (
          <Chip
            sx={{ marginLeft: "10px", marginBottom: "10px" }}
            label={category.name}
            avatar={<Avatar alt="Natacha" src={category.logo} />}
            onClick={() => {
              let findProduct: any = allProducts.filter(
                (p: productType) => p.idcategory === category.id
              );
              if (findProduct.length === 0) {
                findProduct = mainState.allProducts;
                return setMainState({ ...mainState });
              }
              mainState.render = "products";
              mainState.allProducts = findProduct;
              setLoading(false);
              return setMainState({ ...mainState });
            }}
          />
        );
      })}

      <div className="row">
        {allProducts.map((e: any) => {
          return (
            <div className="col-md-4 pt-3 pb-3">
              <Card>
                <CardActionArea
                  onClick={() => {
                    const findProduct: any = allProducts.find(
                      (p) => p.id === e.id
                    );

                    const findLike: any = allLike.filter(
                      (l) => l.idproduct === e.id
                    );
                    const findComment: any = allComment.filter(
                      (p) => p.idproduct === e.id
                    );

                    mainState.selectedProductView = findProduct;
                    mainState.selectedLikeProduct = findLike;
                    mainState.selectedCommentProduct = findComment;
                    mainState.render = "viewProductPage";
                    setMainState({ ...mainState });
                  }}
                >
                  <CardMedia
                    component="img"
                    height="230"
                    image={e.images}
                    alt={e.images}
                    title="osama"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {e.name}
                    </Typography>
                    <Typography variant="body2">{e.description}</Typography>
                  </CardContent>
                  <Stack
                    mb={2}
                    mt={2}
                    spacing={2}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <Chip
                      icon={<CalendarTodayIcon />}
                      label={e.date}
                      variant="outlined"
                    />
                    <Chip
                      icon={<FlagIcon />}
                      label={e.country}
                      variant="outlined"
                    />
                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={e.price}
                      variant="outlined"
                    />
                  </Stack>
                </CardActionArea>
                <Stack
                  mb={2}
                  mt={2}
                  spacing={2}
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button
                    startIcon={<AddShoppingCartIcon />}
                    onClick={async () => {
                      if (!user) {return setOpen(true)};
                      const newOrder: OrderType = {
                        iduser: user.id,
                        idproduct: e.id,
                        quantity: 1,
                        orderProduct: e,
                        orderUser: user,
                      };
                      console.log(newOrder);
                      await _insetOrders(newOrder);
                      mainState.allOrders = [newOrder, ...mainState.allOrders];
                      mainState.user.orderUser = [
                        newOrder,
                        ...mainState.user.orderUser,
                      ];
                      setMainState({ ...mainState });
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    startIcon={<ReadMoreIcon />}
                    size="small"
                    onClick={() => {
                      const findProduct: any = allProducts.find(
                        (p: any) => p.id === e.id
                      );

                      const findLike: any = allLike.filter(
                        (l) => l.idproduct === e.id
                      );
                      const findComment: any = allComment.filter(
                        (p) => p.idproduct === e.id
                      );

                      mainState.selectedProductView = findProduct;
                      mainState.selectedLikeProduct = findLike;
                      mainState.selectedCommentProduct = findComment;
                      mainState.render = "viewProductPage";
                      setMainState({ ...mainState });
                    }}
                  >
                    See Details
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    size="small"
                    onClick={async () => {
                      if (!user) return setOpen(true);
                      const newSave: SaveType = {
                        iduser: e.iduser,
                        idproduct: e.id,
                        save: "unsave",
                      };
                      const Findsave: any = mainState.allSave.find(
                        (s) => s.idproduct === e.id
                      );
                      if (Findsave === undefined) {
                        await _insetSave(newSave);
                        mainState.allSave = [newSave, ...mainState.allSave];
                        user.saveUser = [newSave, ...user.save];
                        setMainState({ ...mainState });
                      }
                      if (Findsave.save === "save") {
                        const data: any = {
                          iduser: e.iduser,
                          idproduct: e.id,
                          save: "unsave",
                        };
                        await _putSave(e.SaveProduct.id, data);
                        console.log("Findsave", Findsave);
                        setMainState({ ...mainState });
                        e.SaveProduct = [data, ...e.SaveProduct];
                      }
                      const data: any = {
                        iduser: e.iduser,
                        idproduct: e.id,
                        save: "save",
                      };
                      await _putSave(e.SaveProduct.id, data);
                      console.log("Findsaveaaa", Findsave);
                      setMainState({ ...mainState });
                    }}
                  >
                    {e.save === undefined ? "save" : "unsave"}
                  </Button>
                </Stack>
              </Card>
            </div>
          );
        })}
      </div>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        mainState={mainState}
        setMainState={setMainState}
      />
    </Container>
  );
}
interface AlertDialogProps {
  open: boolean;
  setOpen: (b: boolean) => void;
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function AlertDialog({
  open,
  setOpen,
  mainState,
  setMainState,
}: AlertDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "5%", color: "black" }}>
            Login
          </DialogContentText>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginBottom: "5%",
            }}
          >
            <TextField
              fullWidth
              name="email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Box>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              marginBottom: "5%",
            }}
          >
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Box>
          <Typography variant="body2">
            Already have an account ?{" "}
            <Button
              component="button"
              onClick={() => {
                mainState.render = "register";
                setMainState({ ...mainState });
              }}
            >
              Register
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              setLoading(true);
              const user = { email: email, password: password };
              const res: any = await _loginUser(user);
              mainState.user = res;
              setMainState({ ...mainState });
              if (res.authorization === "user") {
                mainState.render = "products";
                setMainState({ ...mainState });
                setLoading(false);
              }
            }}
          >
            {loading ? <CircularProgress color="inherit" /> : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
