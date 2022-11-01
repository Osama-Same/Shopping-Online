import { MainStateType } from "./mainState";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Carousel from "react-bootstrap/Carousel";
import Container from "@mui/material/Container";

interface HomePageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function HomePage({ mainState, setMainState }: HomePageProps) {
  return (
    <div>
       <CarouselFadeExample />
      <Container maxWidth="xl" sx={{ mt: 10, mb: 5 }}>
        <Typography variant="h4">Shopping Online</Typography>
        <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
          Marketing is one of the most important steps of commerce, and
          e-marketing or digital marketing is one of the most important modern
          marketing methods.
        </Typography>
        <Button sx={{ marginBottom: "60px" }} variant="outlined">
          Visit Us to Know More
        </Button>
        <div className="row pt-3 pb-3">
          <div className="col pt-3 pb-3">
            <h3>Mobile</h3>
            <img
              src="https://cdn.vatanbilgisayar.com/Upload/PRODUCT/apple/thumb/129876-1_large.jpg"
              alt=""
              className="card-img-top pt-3 pb-3"
              height="300px"
            />
            <Typography>Maximum productivity at the best price.</Typography>
          </div>
          <div className="col-md-4 pt-3 pb-3">
            <h3>Playstation</h3>
            <img
              src="https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21"
              alt=""
              className="card-img-top pt-3 pb-3"
              height="300px"
            />
            <Typography>
              Get the most out of your work or study day with a versatile and
              highly experienced device.
            </Typography>
          </div>
          <div className="col-md-4 pt-3 pb-3">
            <h3>Laptop</h3>
            <img
              src="https://www.tradeinn.com/f/13870/138709376/toshiba-satellite-pro-c40-j-106-14-i7-1165g7-8gb-256gb-ssd-laptop.jpg"
              alt=""
              className="card-img-top pt-3 pb-3"
              height="300px"
            />
            <Typography>Maximum productivity at the best price.</Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function CarouselFadeExample() {
  return (
    
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.revistagq.com/photos/5fac283dfa14a4b433f675ab/16:9/w_1280,c_limit/playstation-5-critica.jpg"
          alt="First slide"
          about="osama"
          height="400px"
        />
        <Carousel.Caption>
        
          <h3>Playstation 5</h3>
          <Typography>
            Get the most out of your work or study day with a versatile and
            highly experienced device.
          </Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.gizbot.com/images/2019-07/vivo-s1_156352984560.jpg"
          alt="Second slide"
          height="400px"
        />
        <Carousel.Caption>
          <h3>Mobile</h3>
          <Typography>Maximum productivity at the best price.</Typography>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://os-wordpress-media.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2022/04/11143838/gaming-laptops.jpeg"
          alt="Third slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3 className="text-Secondary">Laptop</h3>
          <Typography>Maximum productivity at the best price.</Typography>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
