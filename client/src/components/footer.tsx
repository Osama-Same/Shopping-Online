import { MainStateType } from "./mainState";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { _insetNews } from "../service/postAllData";
import CircularProgress from "@mui/material/CircularProgress";
import { updateUserState } from "./users";
interface FooterPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}
export function FooterPage({ mainState, setMainState }: FooterPageProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Container maxWidth="xl" sx={{ py: 4, color: "white" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Shopping Online
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            component="p"
            marginBottom="3%"
          >
            A site specialized in buying and selling that provides you with
          </Typography>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        mainState.render = "";
                        setMainState({ ...mainState });
                      }}
                    >
                      <ListItemIcon>
                        <HomeIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        mainState.render = "about";
                        setMainState({ ...mainState });
                      }}
                    >
                      <ListItemIcon>
                        <InfoIcon  style={{ color: "white" }}/>
                      </ListItemIcon>
                      <ListItemText primary="About" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        mainState.render = "contact";
                        setMainState({ ...mainState });
                      }}
                    >
                      <ListItemIcon>
                        <ContactPhoneIcon  style={{ color: "white" }}/>
                      </ListItemIcon>
                      <ListItemText primary="Contact us" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="col-md-4">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <LocationOnIcon style={{ color: "white" }}/>
                      </ListItemIcon>
                      <ListItemText primary="Amman, Mecca Street" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <ContactPhoneIcon style={{ color: "white" }}/>
                      </ListItemIcon>
                      <ListItemText primary="(+962) 79 98 95632" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <EmailIcon style={{ color: "white" }}/>
                      </ListItemIcon>
                      <ListItemText primary="osama.moh.salem.com" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              <div className="col-md-4">
                <List>
                  <ListItem disablePadding>
                    <TextField
                      fullWidth
                      style={{ color: "white" }}
                      label="Newsletter"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </ListItem>
                  <br></br>
                  <ListItem disablePadding>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={async () => {
                        setLoading(true);
                        const data = { email: email };
                        await _insetNews(data);
                        setMainState({ ...mainState });
                        updateUserState(mainState, setMainState);
                        setLoading(false);
                      }}
                    >
                      {loading ? <CircularProgress /> : "Save"}
                    </Button>
                  </ListItem>
                </List>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </nav>
  );
}
