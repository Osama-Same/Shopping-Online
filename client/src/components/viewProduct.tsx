import { MainStateType, commentType, LikeType, OrderType } from "./mainState";
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
import {
  _insetComment,
  _insetLike,
  _insetOrders,
} from "../service/postAllData";
import { _deleteLike } from "../service/deleteAllData";
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
        <div className="row pt-3 pb-3">
          <div className="col-md-8 pt-3 pb-3">
            <Container maxWidth="md">
              <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
                <Divider textAlign="left"> View Product</Divider>
              </Typography>
              <Card>
                <Stack direction="row" spacing={2}>
                  <CardMedia
                    sx={{ width: 250, height: 350 }}
                    component="img"
                    image={selectedProductView.images}
                    alt={selectedProductView.images}
                  />
                  <CardContent>
                    <List>
                      <ListItemButton>
                        <ListItemIcon>
                          <BrandingWatermarkIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedProductView.name} />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <FlagIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedProductView.country} />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <CalendarTodayIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedProductView.date} />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary={selectedProductView.price} />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={selectedProductView.description}
                        />
                      </ListItemButton>
                    </List>
                    <Stack
                      mb={2}
                      mt={2}
                      spacing={2}
                      direction="row"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        size="small"
                        onClick={async () => {
                          if (!user) return setOpen(true);
                          const newOrder: OrderType = {
                            iduser: user.id,
                            idproduct: selectedProductView.id,
                            quantity: 1,
                            orderProduct: selectedProductView,
                            orderUser: user,
                          };
                          console.log(newOrder);
                          await _insetOrders(newOrder);
                          mainState.allOrders = [
                            newOrder,
                            ...mainState.allOrders,
                          ];
                          mainState.user.orderUser = [
                            newOrder,
                            ...mainState.user.orderUser,
                          ];
                          setMainState({ ...mainState });
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<ThumbUpIcon />}
                        onClick={async () => {
                          if (!user){ return setOpen(true)};

                    
                            const newLike: LikeType = {
                              iduser: user.id,
                              idproduct: selectedProductView.id,
                              likee: 1,
                              likeProduct: selectedProductView,
                              likeUser : user
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
                  </CardContent>
                </Stack>
              </Card>

              <div className="row pt-3 pb-3">
                {user && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <TextField
                      fullWidth
                      defaultValue="Normal"
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
            </Container>
          </div>

          <div className="col pt-3 pb-3">
            <Container maxWidth="sm">
            <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
                <Divider textAlign="left"> List Product</Divider>
              </Typography>
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
                          <Typography variant="body2">
                            {e.description}
                          </Typography>
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
            </Container>
          </div>
        </div>
      </Container>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        mainState={mainState}
        setMainState={setMainState}
      />
    </div>
  );
}
