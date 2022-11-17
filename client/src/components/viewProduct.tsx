import { MainStateType, commentType, LikeType, productType } from "./mainState";
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
import { _putLike } from "../service/putAllData";
import CircularProgress from "@mui/material/CircularProgress";
import { AlertDialog } from "./products";

interface ViewProductPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ViewProductPage({
  mainState,
  setMainState,
}: ViewProductPageProps) {
  const {
    selectedProductView,
    user,
    allProducts,
    selectedCommentProduct,
    allComment,
    allLike,
    selectedLikeProduct,
  } = mainState;

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!allProducts) return <div>{loading && <CircularProgress />}</div>;
  return (
    <div>
      <Container component="main" maxWidth="lg" sx={{ mt: 15, mb: 5 }}>
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
                      image={selectedProductView.images}
                      alt={selectedProductView.images}
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
                      <ListItemText primary={selectedProductView.name} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <FlagIcon />{" "}
                      </ListItemIcon>
                      <ListItemText primary={selectedProductView.country} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <CalendarTodayIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectedProductView.date} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AttachMoneyIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectedProductView.price} />
                    </ListItemButton>
                  </ListItem>
                </List>

                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectedProductView.description} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>

              <Stack mb={2} mt={2} spacing={2} direction="row">
                <Button
                  startIcon={<AddShoppingCartIcon />}
                  onClick={async () => {
                    if (!user) {
                      setOpen(true);
                    }
                  }}
                >
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
                    if (!user) {
                      setOpen(true);
                    }
                    setLoading(true);
                    const newLike: LikeType = {
                      iduser: user.id,
                      idproduct: selectedProductView.id,
                      likee: "like",
                      likeUser: user,
                      likeProduct: selectedProductView,
                    };

                    await _insetLike(newLike);
                    mainState.allLike = [newLike, ...mainState.allLike];
                    mainState.selectedLikeProduct = [
                      newLike,
                      ...mainState.selectedLikeProduct,
                    ];
                    setMainState({ ...mainState });
                  }}
                >
                  like {selectedLikeProduct.length}
                </Button>
              </Stack>

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
                                  comment: comment,
                                  date: new Date().toString(),
                                  idproduct: selectedProductView.id,
                                  commentProduct: selectedProductView,
                                  commentUser: user,
                                };
                                await _insetComment(newComment);
                                mainState.allComment = [
                                  newComment,
                                  ...mainState.allComment,
                                ];
                                mainState.selectedCommentProduct = [
                                  newComment,
                                  ...mainState.selectedCommentProduct,
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
                {selectedCommentProduct.map((comment: any) => {
                  return (
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Avatar
                              src={
                                comment.commentUser && comment.commentUser.image
                              }
                              alt={
                                comment.commentUser && comment.commentUser.image
                              }
                            />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.comment}
                          secondary={comment.date}
                        />
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
                        const findProduct: any = allProducts.find(
                          (p) => p.id === e.id
                        );
                        const findComment: any = allComment.filter(
                          (p) => p.idproduct === e.id
                        );
                        const findLike: any = allLike.filter(
                          (l) => l.idproduct === e.id
                        );
                        mainState.selectedProductView = findProduct;
                        mainState.selectedCommentProduct = findComment;
                        mainState.selectedLikeProduct = findLike;
                        mainState.render = "viewProductPage";
                        setMainState({ ...mainState });
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
      <AlertDialog open={open} setOpen={setOpen} mainState={mainState} setMainState={setMainState}/>
    </div>
  );
}
