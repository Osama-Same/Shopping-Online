import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MainStateType } from "./mainState";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import Stack from "@mui/material/Stack";
import { _insetContact } from "../service/postAllData";
import CircularProgress from "@mui/material/CircularProgress";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Container from "@mui/material/Container";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Card, Divider } from "@mui/material";
import Box from "@mui/material/Box";
export type locationtype = {
  longitude: string;
  latitude: string;
  city: string;
  country: string;
};

interface ContactPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ContactPage({ mainState, setMainState }: ContactPageProps) {
  const [email, setLEmail] = useState("");
  const [massage, setMassage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
        <Divider> Get in touch</Divider>
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Tell us about your needs. We'd love to hear from you.
      </Typography>
      <div className="row pt-3 pb-3">
        <div className="col-md-4 pt-3 pb-3">
          <Card>
            <Typography variant="h5" sx={{ mb: 3 }}>
              <ContactPhoneIcon fontSize="large" color="primary" />
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              (+962)799895632
            </Typography>
          </Card>
        </div>
        <div className="col-md-4 pt-3 pb-3">
          <Card>
            <Typography variant="h5" sx={{ mb: 3 }}>
              <EmailIcon fontSize="large" color="primary" />
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              osama.moh.salem@gmail.com
            </Typography>
          </Card>
        </div>
        <div className="col-md-4 pt-3 pb-3">
          <Card>
            <Typography variant="h5" sx={{ mb: 3 }}>
              <LocationOnIcon fontSize="large" color="primary" />
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Jordan - Amman
            </Typography>
          </Card>
        </div>
      </div>
      <div className="row pt-3 pb-3">
        <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
          <Divider> Contact Us</Divider>
        </Typography>
        <div className="col-md-6 pt-3 pb-3">
          <Stack
            direction="row"
            spacing={5}
            justifyContent="center"
            sx={{ mt: 1, mb: 6 }}
          >
            <FacebookRoundedIcon color="primary" sx={{ fontSize: 40 }} />
            <TwitterIcon color="primary" sx={{ fontSize: 40 }} />
            <InstagramIcon color="secondary" sx={{ fontSize: 40 }} />
            <WhatsAppIcon color="success" sx={{ fontSize: 40 }} />
            <LinkedInIcon color="primary" sx={{ fontSize: 40 }} />
          </Stack>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "100%",
              marginBottom: 0,
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              type={"email"}
              label={"Email"}
              onChange={(e) => setLEmail(e.target.value)}
              value={email}
              size="small"
            />
            <TextField
              margin="normal"
              fullWidth
              label={"Massage"}
              type={"text"}
              size="small"
              onChange={(e) => setMassage(e.target.value)}
              value={massage}
            />
            <Button
              sx={{ marginTop: "19px" }}
              fullWidth
              variant="contained"
              onClick={async () => {
                const data = { email: email, massage: massage };
                setLoading(true);
                await _insetContact(data);
                mainState.render = "contact";
                mainState.allContact = [data, ...mainState.allContact];
                setMainState({ ...mainState });
                setLoading(false);
              }}
            >
              {loading ? <CircularProgress /> : "Save"}
            </Button>
          </Box>
        </div>
        <div className="col-md-5 pt-3 pb-3">
          <img
            src="https://www.actualidadecommerce.com/wp-content/uploads/2017/11/El-comercio-electr%C3%B3nico-en-Espa%C3%B1a.jpg"
            height="300px"
            alt=""
          />
        </div>
      </div>
    </Container>
  );
}
