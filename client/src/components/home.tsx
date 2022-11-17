import { MainStateType } from "./mainState";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card } from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";
import { Stack } from "@mui/system";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CardMedia from "@mui/material/CardMedia";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PeopleIcon from "@mui/icons-material/People";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
interface HomePageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function HomePage({ mainState, setMainState }: HomePageProps) {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <div className="row  pt-3 pb-3">
          <div className="col-md-6 pt-3 pb-3">
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              <Typography variant="h4" sx={{ mb: 5, color: "orange" }}>
                Shopping Online
              </Typography>
              is a form of electronic commerce which allows consumers to
              directly buy goods or services from a seller over the Internet
              using a web browser or a mobile app. Consumers find a product of
              interest by visiting the website of the retailer directly or by
              searching among alternative vendors using a shopping search
              engine, which displays the same product's availability and pricing
              at different e-retailers. As of 2020, customers can shop online
              using a range of different computers and devices, including
              desktop computers, laptops, tablet computers and smartphones.
            </Typography>
            <Typography sx={{ mt: 3 }}>
              <Stack direction="row" spacing={2}>
                <Button startIcon={<AppleIcon />} variant="contained">
                  App Store
                </Button>
                <Button startIcon={<AndroidIcon />} variant="contained">
                  Play Store
                </Button>
              </Stack>
            </Typography>
          </div>
          <div className="col">
            <img
              src="https://www.justbemac.com/wp-content/uploads/2019/10/coque-iPhone-X-1024x1024.jpg"
              alt=""
              height={300}
              width={450}
            />
          </div>
        </div>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <Typography variant="h4" sx={{ mb: 5, color: "orange" }}>
          Services
        </Typography>
        <div className="row">
          <div className="col-md-4 pt-3 pb-3">
            <Card>
              <Typography variant="h5" sx={{ mb: 3 }}>
                <InsertPhotoIcon fontSize="large" color="primary" />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Photo Services
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "silver" }}>
                Photo Center Prints Cards Gifts
              </Typography>
            </Card>
          </div>
          <div className="col-md-4 pt-3 pb-3">
            <Card>
              <Typography variant="h5" sx={{ mb: 3 }}>
                <PeopleIcon fontSize="large" color="primary" />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Support Your Community
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "silver" }}>
                For Community For Nonprofits Spark Good
              </Typography>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Typography variant="h5" sx={{ mb: 5 }}>
                <LocalShippingIcon fontSize="large" color="primary" />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Delivery to your address
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "silver" }}>
                You will get your order delivered as soon as possible
              </Typography>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 pt-3 pb-3">
            <Card>
              <Typography variant="h5" sx={{ mb: 3 }}>
                <LocalAtmIcon fontSize="large" color="primary" />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Financial Services
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "silver" }}>
                Money Transfer and Walmart Credit Card and Walmart MoneyCard and
                Reloadable Debit Cards and Gift Cards
              </Typography>
            </Card>
          </div>
          <div className="col-md-4 pt-3 pb-3">
            <Card>
              <Typography variant="h5" sx={{ mb: 3 }}>
                <HealthAndSafetyIcon fontSize="large" color="primary" />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Health & Wellness
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "silver" }}>
                Pharmacy and Affordable Immunizations and Vision Center and
                Health Center and Pet Pharmacy and Hearing
              </Typography>
            </Card>
          </div>
          <div className="col pt-3 pb-3">
            <Card>
              <Typography variant="h5" sx={{ mb: 3 }}>
                <RedeemIcon fontSize="large" color="primary" />
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Registry, Lists, & Gifts
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "silver" }}>
                Lists and Gift Cards and Gift Finder and Registries and Wedding
                Registry and Baby Registry
              </Typography>
            </Card>
          </div>
        </div>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <div className="row  pt-3 pb-3">
          <div className="col">
            <Card>
              <CardMedia
                component="img"
                height="240"
                image="https://res.heraldm.com/phpwas/restmb_idxmake.php?idx=621&simg=/content/image/2020/04/27/20200427000581_0.jpg"
                alt="green iguana"
              />
            </Card>
          </div>
          <div className="col-md-7 pt-3 pb-3">
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
                Stay tuned!
              </Typography>
              Prefer online shopping offers and discounts from time to time
              throughout the year. All festivals and special days are the right
              time to get discounts and special offers. Customers can choose
              from a variety of discounts and offers available on the portal.
              So, go ahead and grab your golden opportunity to save some money
              and get the products you have always wanted.
            </Typography>
            <Typography sx={{ mt: 3 }}>
              <Stack direction="row" spacing={2}>
                <Button startIcon={<AppleIcon />} variant="contained">
                  App Store
                </Button>
                <Button startIcon={<AndroidIcon />} variant="contained">
                  Play Store
                </Button>
              </Stack>
            </Typography>
          </div>
        </div>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <Typography sx={{ mb: 3 }}>
          We’d love to hear what you think!
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            mainState.render = "contact";

            setMainState({ ...mainState });
          }}
        >
          Give feedback
        </Button>
      </Container>
    </div>
  );
}
