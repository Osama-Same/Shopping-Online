import {
  MainStateType,
  commentType,
  LikeType,
  OrderType,
  productType,
} from "./mainState";
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
import { _getAllLike } from "../service/getAllData";

interface ViewProductPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function ViewProductPage({
  mainState,
  setMainState,
}: ViewProductPageProps) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  /*  if (!allProducts) return <div>{loading && <CircularProgress />}</div>; */
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
                    image={mainState.selectedProduct.images}
                    alt={mainState.selectedProduct.images}
                  />
                  <CardContent>
                    <List>
                      <ListItemButton>
                        <ListItemIcon>
                          <BrandingWatermarkIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={mainState.selectedProduct.name}
                        />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <FlagIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={mainState.selectedProduct.country}
                        />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <CalendarTodayIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={mainState.selectedProduct.date}
                        />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={mainState.selectedProduct.price}
                        />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={mainState.selectedProduct.description}
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
                          if (!mainState.user) return setOpen(true);
                          const newOrder: OrderType = {
                            iduser: mainState.user.id,
                            idproduct: mainState.selectedProduct.id,
                            quantity: 1,
                            orderProduct: mainState.selectedProduct,
                            orderUser: mainState.user,
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
                          if (!mainState.user) {
                            return setOpen(true);
                          }
                          const newLike: LikeType = {
                            iduser: mainState.user.id,
                            idproduct: mainState.selectedProduct.id,
                            likee: 1,
                            likeProduct: mainState.selectedProduct,
                            likeUser: mainState.user,
                          };
                          const findLikeUser = mainState.ListLikeProduct.find(
                            (like: LikeType) =>
                              like.iduser === mainState.user.id
                          );
                          console.log("findLikeUser", findLikeUser?.iduser);
                          if (findLikeUser?.iduser) {
                            await _deleteLike(findLikeUser.likeUser.id);
                            mainState.allLike = await _getAllLike();
                            setMainState({ ...mainState });
                          } else {
                            await _insetLike(newLike);
                            mainState.allLike = [newLike, ...mainState.allLike];
                            mainState.ListLikeProduct = [
                              newLike,
                              ...mainState.ListLikeProduct,
                            ];
                            mainState.allLike = await _getAllLike();
                            setMainState({ ...mainState });
                          }
                        }}
                      >
                        like {mainState.ListLikeProduct.length}
                      </Button>
                    </Stack>
                  </CardContent>
                </Stack>
              </Card>

              <div className="row pt-3 pb-3">
                {mainState.user ? (
                  <div>
                    {" "}
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
                                src={mainState.user.image}
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
                                    iduser: mainState.user.id,
                                    comment: comment,
                                    date: new Date().toString(),
                                    idproduct: mainState.selectedProduct.id,
                                    commentProduct: mainState.selectedProduct,
                                    commentUser: mainState.user,
                                  };
                                  await _insetComment(newComment);
                                  mainState.allComment = [
                                    newComment,
                                    ...mainState.allComment,
                                  ];
                                  mainState.ListCommentProduct = [
                                    newComment,
                                    ...mainState.ListCommentProduct,
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
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        if (!mainState.user) {
                          return setOpen(true);
                        }
                        mainState.render = "viewProductPage";
                        setMainState({ ...mainState });
                      }}
                    >
                      Login Comment
                    </Button>
                  </div>
                )}

                {mainState.ListCommentProduct.map((comment: any) => {
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
              {mainState.allProducts.map((product: productType) => {
                return (
                  <div className="col pt-3 pb-3">
                    <Card>
                      <CardActionArea
                        onClick={() => {
                          const findProduct = mainState.allProducts.find(
                            (p: productType) => p.id === product.id
                          );

                          const findLike = mainState.allLike.filter(
                            (l: LikeType) => l.idproduct === product.id
                          );
                          const findComment = mainState.allComment.filter(
                            (p: commentType) => p.idproduct === product.id
                          );
                          mainState.selectedProduct = findProduct;
                          mainState.ListLikeProduct = findLike;
                          mainState.ListCommentProduct = findComment;
                          mainState.render = "viewProductPage";
                          setMainState({ ...mainState });
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="230"
                          image={product.images}
                          alt={product.images}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {product.name}
                          </Typography>
                          <Typography variant="body2">
                            {product.description}
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
                            label={product.date}
                            variant="outlined"
                          />
                          <Chip
                            icon={<FlagIcon />}
                            label={product.country}
                            variant="outlined"
                          />
                          <Chip
                            icon={<AttachMoneyIcon />}
                            label={product.price}
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
