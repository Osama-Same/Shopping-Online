import { MainStateType } from "./mainState";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
interface CategoryPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function CategoryPage({ mainState, setMainState }: CategoryPageProps) {
  const { allCategories } = mainState;
  if (!allCategories) return <div>No Products</div>;
  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <h3 className="text-center pt-3 pb-3">Categories</h3>
      <p style={{ paddingBottom: "50px" }}>
        Your messages are the secret of our development, so do not hesitate at
        all in any note or suggestion that will reach us and be of great
        interest to us.
      </p>
      <div className="row">
        {allCategories.map((e) => {
          return (
            <div className="col-md-4 pt-3 pb-3">
              <Card>
                <CardActionArea
                  onClick={() => {
                    /*
                    const findProduct: any = allProducts.filter(
                      (p) => p.idcategory === e.id
                    );
                    mainState.render = "products";
                    mainState.allProducts = findProduct;
                    setMainState({ ...mainState });
                     mainState.render = "userProductCard";
                mainState.userProfile = use;
                mainState.selectedUser = use;
                setMainState({ ...mainState }); */
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
    </div>
  );
}
