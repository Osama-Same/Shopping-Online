import { MainStateType, productType } from "./mainState";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea } from "@mui/material";
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
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { _putSave } from "../service/putAllData";
import { _insetSave, _insetOrders } from "../service/postAllData";
import AutoCompleteSelect from "./common/AutoCompleteSelect";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface ProductsPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProductsPage({ mainState, setMainState }: ProductsPageProps) {
  const { allProducts, user } = mainState;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProductCategory, setselectedProductCategory] = useState<
    productType[] | null
  >(null);

  const [search, setSearch] = useState("");
  if (!allProducts) return <div>{loading && <CircularProgress />}</div>;
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <Typography variant="h4">Products</Typography>
      <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt: 5, mb: 7, pt: 2 }}
        >
          <Button
            variant="outlined"
            style={{ color: "white" }}
            onClick={() => {
              let SearchProduct: any = allProducts.filter((e: any) => {
                return e.name.toUpperCase().search(search.toUpperCase()) !== -1;
              });

              if (SearchProduct.length === 0) {
                mainState.render = "products";
                SearchProduct = mainState.allProducts;
                console.log("SearchProduct", SearchProduct);
                setMainState({ ...mainState });
                setselectedProductCategory(allProducts);
              }
              mainState.allProducts = SearchProduct;
              console.log("SearchProduct", SearchProduct);
              setMainState({ ...mainState });
            }}
          >
            <SearchIcon />
          </Button>
          <TextField
            fullWidth
            type={"search"}
            label="Search"
            placeholder="Search Name Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <AutoCompleteSelect
            textLabel="Categories"
            options={mainState.allCategories}
            selectedOption={selectedProductCategory}
            onChange={(category: any) => {
              let findProduct: any = allProducts.filter(
                (p: any) => p.idcategory === category.id
              );
              if (findProduct.length === 0) {
                mainState.render = "products";
                findProduct = mainState.allProducts;
                setMainState({ ...mainState });
                setselectedProductCategory(allProducts);
              }
              mainState.allProducts = findProduct;
              setMainState({ ...mainState });
              setselectedProductCategory(mainState.allProducts);
              console.log("findProduct", findProduct);
            }}
            labelOption="name"
            labelImage="logo"
          />
        </Stack>
      </Typography>

      <div className="row">
        {allProducts.map((e: any) => {
          return (
            <div className="col-md-4 pt-3 pb-3">
              <Card>
                <CardActionArea
                  onClick={() => {
                    console.log("osa,a");
                  }}
                >
                  <CardMedia
                    component="img"
                    height="230"
                    image={e.images}
                    alt={e.images}
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
                    size="small"
                    onClick={async () => {
                      if (!user) {
                        setOpen(true)
                      }
                      if (user) {
                        const data: any = {
                          iduser: user.id,
                          idproduct: e.id,
                          quantity: 1,
                        };
                        await _insetOrders(data);
                        mainState.allOrders = [data, ...mainState.allOrders];
                        setMainState({ ...mainState });
                        mainState.user.orderUser = [
                          data,
                          ...mainState.user.orderUser,
                        ]
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    startIcon={<ReadMoreIcon />}
                    size="small"
                    onClick={() => {
                      const findProduct: any = allProducts.find(
                        (p) => p.id === e.id
                      );

                      console.log("findProduct", findProduct);
                      mainState.selectProduct = findProduct;
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
                      const data: any = {
                        iduser: e.iduser,
                        idproduct: e.id,
                        save: "save",
                      };
                      const Findsave = mainState.allSave.find(
                        (s) => s.idproduct === e.id
                      );

                      if (Findsave === undefined) {
                        await _insetSave(data);
                        console.log("Findsave", Findsave);
                        mainState.allSave = [data, ...mainState.allSave];
                        setMainState({ ...mainState });
                        e.SaveProduct = [data, ...e.SaveProduct];
                      } else if (Findsave.save === "save") {
                        const data: any = {
                          iduser: e.iduser,
                          idproduct: e.id,
                          save: "unsave",
                        };
                        await _putSave(Findsave.id, data);
                        console.log("Findsave", Findsave);
                        mainState.allSave = [data, ...mainState.allSave];
                        setMainState({ ...mainState });
                        e.SaveProduct = [data, ...e.SaveProduct];
                      } else {
                        const data: any = {
                          iduser: e.iduser,
                          idproduct: e.id,
                          save: "save",
                        };
                        await _putSave(Findsave.id, data);
                        console.log("Findsaveaaa", Findsave);
                        mainState.allSave = [data, ...mainState.allSave];
                        setMainState({ ...mainState });
                        e.SaveProduct = [data, ...e.SaveProduct];
                      }
                    }}
                  >
                    save
                  </Button>
                </Stack>
              </Card>
            </div>
          );
        })}
      </div>
      <AlertDialog open={open} setOpen={setOpen} />
    </Container>
  );
}
interface AlertDialogProps {
  open: boolean;
  setOpen: (b: boolean) => void;
}
export function AlertDialog({ open, setOpen }: AlertDialogProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button onClick={() => setOpen(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
