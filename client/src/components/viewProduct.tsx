import { MainStateType, commentType, LikeType } from "./mainState";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import Stack from "@mui/material/Stack";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlagIcon from "@mui/icons-material/Flag";
import { _insetComment, _insetLike } from "../service/postAllData";
import { _deleteLike } from "../service/deleteAllData";
interface ViewProductPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ViewProductPage({
  mainState,
  setMainState,
}: ViewProductPageProps) {
  const { selectProduct, user, allProducts } = mainState;
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);


  if (!selectProduct) return <div>No Prodcts</div>;
  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
        <Typography variant="h6" sx={{ mt: 10, mb: 3 }}>
          View Product
        </Typography>
        <Typography variant="body2" marginBottom="2%">
          Your messages are the secret of our development, so do not hesitate at
          all in any note or suggestion that will reach us and be of great
          interest to us.
        </Typography>
      </Container>
      <Container component="main" maxWidth="lg" sx={{ mt: 15, mb: 5 }}>
        <div className="row">
          <div className="col-md-8">
            <div className="row pt-3 pb-3">
              <div className="col-md-7">
                <Card>
                  <CardActionArea
                    onClick={() => {
                      console.log("osa,a");
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={selectProduct.images}
                      alt={selectProduct.images}
                    />
                  </CardActionArea>
                </Card>
              </div>

              <div className="col">
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <BrandingWatermarkIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectProduct.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <FlagIcon />{" "}
                      </ListItemIcon>
                      <ListItemText primary={selectProduct.country} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectProduct.date} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AttachMoneyIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectProduct.price} />
                    </ListItemButton>
                  </ListItem>
                </List>

                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectProduct.description} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
              {user && (
                <Stack mb={2} mt={2} spacing={2} direction="row">
                  <Button startIcon={<AddShoppingCartIcon />}>
                    Add to Cart
                  </Button>
                  <Button
                    startIcon={<CommentIcon />}
                    onClick={() => {
                      if (open === false) {
                        setOpen(true);
                      } else {
                        setOpen(false);
                      }
                    }}
                  >
                    Comment
                  </Button>
                  <Button
                    startIcon={<ThumbUpIcon />}
                    onClick={async () => {
                      setLoading(true);
                      const newLikee: LikeType = {
                        id: 0,
                        idproduct: selectProduct.id,
                        iduser: user?.id,
                        likee: "like",
                        likeNum: 1,
                        likeUser: user,
                      };
                      const find = selectProduct.likeeProduct.find(
                        (u: any) => u.iduser
                      );
                      if (find) {
                        console.log(find);
                        await _deleteLike(find.id);
                        mainState.allLike = [find, ...mainState.allLike];
                        mainState.selectProduct.likeeProduct =
                          mainState.allLike;
                      }
                      if (!find) {
                        await _insetLike(newLikee);
                        mainState.allLike = [newLikee, ...mainState.allLike];
                        mainState.selectProduct.likeeProduct = [
                          newLikee,
                          ...mainState.selectProduct.likeeProduct,
                        ];
                        setMainState({ ...mainState });
                      }
                    }}
                  >
                    Like {[mainState.selectProduct.likeeProduct.length]}
                  </Button>
                </Stack>
              )}
              <div className="row pt-3 pb-3">
                {user && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      fullWidth
                      name="comment"
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      placeholder="Comment .... "
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Avatar
                              src={user.image}
                              alt="Remy Sharp"
                              sx={{ width: 24, height: 24 }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              onClick={async () => {
                                setLoading(true);
                                const newComment: commentType = {
                                  iduser: user.id,
                                  idproduct: selectProduct.id,
                                  comment: comment,
                                  date: new Date().toString(),
                                  commentUser: user,
                                };

                                await _insetComment(newComment);

                                mainState.allComment = [
                                  newComment,
                                  ...mainState.allComment,
                                ];
                                mainState.selectProduct.CommentProduct = [
                                  newComment,
                                  ...mainState.selectProduct.CommentProduct,
                                ];
                                setMainState({ ...mainState });
                                setLoading(false);
                              }}
                            >
                              Comment
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      variant="standard"
                    />
                  </Box>
                )}
                {selectProduct.CommentProduct.map((e: any) => {
                  return (
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Avatar
                              src={e.commentUser?.image}
                              alt="Remy Sharp"
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={e.comment} secondary={e.date} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col">
            {allProducts.map((e) => {
              return (
                <div className="col pt-3 pb-3">
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
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
