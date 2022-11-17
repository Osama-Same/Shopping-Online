import { MainStateType } from "./mainState";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
interface AboutPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function AboutPage({ mainState, setMainState }: AboutPageProps) {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <div className="row pt-3 pb-3">
        <div className="col-md-6 pt-3 pb-3">
          <Typography
            variant="h4"
            sx={{ textAlign: "left", mb: 2, color: "orange" }}
          >
            Who Are We?
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left", mb: 2 }}>
            We are a team of professional and creative developers, designers, it
            specialists, marketers, and writers who will tailor the needs of
            your business. We are highly skilled and experienced in ensuring
            growth promotion, improved productivity and risk is minimised on all
            of our projects. Through high value leadership, an impeccable
            culture and the very best people in the industry, we strive to gain
            “intimate” knowledge and understanding of our clients to ensure all
            facets of our consulting services are delivered.
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left", mb: 2 }}>
            The Shopping Online was established with a singular objective: to
            offer cutting edge mobile technologies to all consumer segments,
            making sure that we fulfill the often-ignored promise of an
            unparalleled customer experience. Today, we serve a growing customer
            base through more than 3,200 points of sale, 13 showrooms and 15
            service centers across Palestine, Jordan and Iraq. We also launched
            an online store that was conceived to elevate the online shopping
            experience in the region by offering choice, ease-of-use, and
            security.
          </Typography>
        </div>
        <div className="col">
          <img
            width="100%"
            alt=""
            src="https://i.tribune.com.pk/media/images/1620444-onlineshopping-1517136975/1620444-onlineshopping-1517136975.jpg"
            height="300px"
          />
        </div>
      </div>
      <div className="row pt-3 pb-3">
        <div className="col">
          <img
            width="100%"
            alt=""
            src="https://www.alkhaleej.ae/sites/default/files/styles/d10_standard/public/2021-08/fdsfdf.jpg?h=d1ee6398&itok=-JKsR4dK"
            height="300px"
          />
        </div>
        <div className="col-md-6 pt-3 pb-3">
          <Typography
            variant="h4"
            sx={{ textAlign: "left", mb: 2, color: "orange" }}
          >
            innovative Technology
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left", mb: 2 }}>
            is an innovative Technology and digital solution provider helping
            clients in there digital transformation journey and building end to
            end IT Landscape . we have an innovative and agile way of servicing
            our customers and are driven to solve their business challenges by
            providing pragmatic and practical solutions. we utilises a reliable
            end to end solution delivery model that is robust, trusted and
            aligned to client objectives.
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left", mb: 2 }}>
            is an innovative Technology and digital solution provider helping
            clients in there digital transformation journey and building end to
            end IT Landscape . we have an innovative and agile way of servicing
            our customers and are driven to solve their business challenges by
            providing pragmatic and practical solutions. we utilises a reliable
            end to end solution delivery model that is robust, trusted and
            aligned to client objectives.
          </Typography>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 pt-3 pb-3">
          <div>
            <img
              src="https://images.pexels.com/photos/919436/pexels-photo-919436.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className="card-img-top pt-3 pb-3"
              height="300px"
              alt="..."
            />
            <div>
              <h5>Department Users</h5>
              <p>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 pt-3 pb-3">
          <div>
            <img
              src="https://image.similarpng.com/very-thumbnail/2020/11/3d-online-shopping-on-social-media-mobile-applications-or-websites-concepts-on-transparent-background-PNG.png"
              className="card-img-top pt-3 pb-3"
              height="300px"
              alt="..."
            />
            <div>
              <h5>Department Company</h5>
              <p>
                The company can make its own advertisement , And also Kamal can
                deal with the user directly
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 pt-3 pb-3">
          <div>
            <img
              src="https://inmobiliare.com/himalaya/wp-content/uploads/2020/12/Comercio_electronico.jpg"
              className="card-img-top pt-3 pb-3"
              height="300px"
              alt="..."
            />
            <div>
              <h5>Department User and Users</h5>
              <p>
                He can exchange the commodity through buying and selling from
                customer to customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
