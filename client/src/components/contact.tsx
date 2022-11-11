import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MainStateType } from "./mainState";
import Typography from "@mui/material/Typography";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
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
    <Container maxWidth="xl" sx={{ mt: 15, mb: 5 }}>
      <Typography variant="h4">Contact Us</Typography>
      <Typography variant="body2" sx={{ mt: 5, mb: 5 }}>
        Your messages are the secret of our development, so do not hesitate at
        all in any note or suggestion that will reach us and be of great
        interest to us.
      </Typography>
      <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 5, mb: 7, pt: 2 }}
        >
          <BottomNavigation showLabels sx={{ width: 1000 }}>
            <BottomNavigationAction
              label="(+962)799895632"
              icon={<ContactPhoneIcon />}
            />
            <BottomNavigationAction
              label="osama.moh.salem@gmail.com"
              icon={<EmailIcon />}
            />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Stack>

        <div className="row">
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

            <TextField
              margin="normal"
              fullWidth
              type={"email"}
              label={"Email"}
              onChange={(e) => setLEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              fullWidth
              label={"Massage"}
              type={"text"}
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
          </div>
          <div className="col">
            <img
              src="https://worldlivestories.com/wp-content/uploads/2021/03/Buy-Online.jpg"
              width="100%"
              height="340px"
              alt=""
            />
          </div>
        </div>
      </Container>
    </Container>
  );
}
