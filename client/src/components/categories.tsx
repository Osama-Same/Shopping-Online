import { MainStateType } from "./mainState";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Container from "@mui/material/Container";
interface CategoryPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function CategoryPage({ mainState, setMainState }: CategoryPageProps) {
  const { allCategories, allProducts } = mainState;
  if (!allCategories) return <div>No Products</div>;
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <div className="row">
        {allCategories.map((e) => {
          return (
            <div className="col-md-4 pt-3 pb-3">
              <Card>
                <CardActionArea
                  onClick={() => {
                    const findProduct: any = allProducts.filter(
                      (p: any) => p.idcategory === e.id
                    );
                    mainState.render = "products";
                    mainState.allProducts = findProduct;
                    setMainState({ ...mainState });
                  }}
                >
                  <CardMedia
                    component="img"
                    height="230"
                    image={e.logo}
                    alt={e.logo}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {e.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
