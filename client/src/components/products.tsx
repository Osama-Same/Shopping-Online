import { MainStateType } from "./mainState";
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
import { _putProductSave } from "../service/putAllData";
interface ProductsPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ProductsPage({ mainState, setMainState }: ProductsPageProps) {
  const { allProducts } = mainState;
  const [loading, setLoading] = useState(false);
  if (!allProducts) return <div>{loading && <CircularProgress />}</div>;
  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 5 }}>
      <Typography variant="h4">Products</Typography>
      <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mt: 5, mb: 7, pt: 2 }}
        >
          <SearchIcon />
          <TextField
            fullWidth
            type={"search"}
            label="Search"
            placeholder="Search "
          />
        </Stack>
      </Typography>

      <div className="row">
        {allProducts.map((e) => {
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
                  <Button startIcon={<AddShoppingCartIcon />} size="small">
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
                      setLoading(false);
                     
                      
                      // await _putProductSave(e.save)
                    }}
                  >
                    {loading ? <CircularProgress /> : "save"}
                  </Button>
                </Stack>
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
