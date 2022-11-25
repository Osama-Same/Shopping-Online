import {
  MainStateType,
  OrderType,
  CheckOutType,
  UserType,
  productType,
} from "./mainState";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardContent, Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import { _deleteOrders } from "../service/deleteAllData";
import { _putOrders } from "../service/putAllData";
import ConfirmDeleteDialog from "./common/ConfirmDeleteDialog";
import { _insetCheckOut } from "../service/postAllData";
import { _getAllOrders } from "../service/getAllData";
interface OrdersPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function OrdersPage({ mainState, setMainState }: OrdersPageProps) {
  const { user } = mainState;
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
  const [CreditCardNumber, setCreditCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedOrderUser, setSelectedOrderUser] = useState<OrderType | null>(
    null
  );
  /*   const getTotalPrice = ({ user }: any) => {
    let totalPrice = 0;
    if (!user) return totalPrice;
    user.orderUser.forEach((e: any) => {
      totalPrice += e.quantity * e.orderProduct.price;
    });
    return totalPrice;
  }; */
  if (!user) return <>Not User</>;
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <div className="row">
        <Container maxWidth="sm">
          <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
            <Divider textAlign="left"> List Orders</Divider>
          </Typography>
          {user &&
            user.userOrders.map((order: OrderType) => {
              return (
                <div className="col-md-14 pt-3 pb-3">
                  <Card>
                    <Stack direction="row" justifyContent="left" spacing={2}>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={order.orderProduct && order.orderProduct.images}
                        alt="Live from space album cover"
                      />
                      <CardContent>
                        <Typography mb={2} mt={2}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            mb={2}
                            mt={2}
                            spacing={2}
                          >
                            <Chip
                              icon={<FlagIcon />}
                              label={
                                order.orderProduct && order.orderProduct.country
                              }
                              variant="outlined"
                            />

                            <Chip
                              icon={<AttachMoneyIcon />}
                              label={
                                order.orderProduct && order.orderProduct.price
                              }
                              variant="outlined"
                            />
                            <Chip
                              icon={<CalendarTodayIcon />}
                              label={
                                order.orderProduct && order.orderProduct.name
                              }
                              variant="outlined"
                            />
                          </Stack>
                        </Typography>

                        <Stack spacing={1} direction="row">
                          <Button
                            onClick={async () => {
                              order.orderProduct = order.orderProduct;
                              order.quantity = order.quantity - 1;
                              await _putOrders(order.id, order);
                              mainState.allOrders = await _getAllOrders();
                              mainState.allUsers.forEach((user: UserType) => {
                                user.userOrders = mainState.allOrders.filter(
                                  (o: OrderType) => o.iduser === user.id
                                );
                                user.userOrders.forEach(
                                  (uo: OrderType) =>
                                    (uo.orderProduct =
                                      mainState.allProducts.find(
                                        (p: productType) =>
                                          p.id === uo.idproduct
                                      ))
                                );
                              });
                              setMainState({ ...mainState });
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button aria-label="reduce">{order.quantity}</Button>
                          <Button
                            onClick={async () => {
                              order.orderProduct = order.orderProduct;
                              order.quantity = order.quantity + 1;
                              await _putOrders(order.id, order);
                              mainState.allOrders = await _getAllOrders();
                              mainState.allUsers.forEach((user: UserType) => {
                                user.userOrders = mainState.allOrders.filter(
                                  (o: OrderType) => o.iduser === user.id
                                );
                                user.userOrders.forEach(
                                  (uo: OrderType) =>
                                    (uo.orderProduct =
                                      mainState.allProducts.find(
                                        (p: productType) =>
                                          p.id === uo.idproduct
                                      ))
                                );
                              });
                              setMainState({ ...mainState });
                            }}
                          >
                            <AddIcon />
                          </Button>
                          <Button
                            color="error"
                            onClick={async () => {
                              setopenConfirmDelDlg(true);
                              setSelectedOrderUser(order);
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </Card>

                  <ConfirmDeleteDialog
                    open={openConfirmDelDlg}
                    setopen={setopenConfirmDelDlg}
                    text={`Do ${selectedOrderUser?.orderProduct.name}  will be deleted permenantly, are you sure?`}
                    onConfirm={async () => {
                      if (!selectedOrderUser) return;
                      await _deleteOrders(selectedOrderUser.id);
                      user.userOrders = user.userOrders.filter(
                        (o: OrderType) => o.id !== selectedOrderUser.id
                      );

                      mainState.render = "orders";
                      setMainState({ ...mainState });
                    }}
                    mainState={mainState}
                    setMainState={setMainState}
                  />
                </div>
              );
            })}
        </Container>
        <div className="col">
          <Container maxWidth="sm">
            <Typography variant="h5" sx={{ mb: 5, color: "orange" }}>
              <Divider textAlign="left"> Check Out</Divider>
            </Typography>
            <div className="row pt-3 pb-3">
              <Card>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-around"
                  mb={2}
                  mt={2}
                  spacing={12}
                >
                  <Typography>Total:</Typography>
                  {/*  <Typography> {getTotalPrice({ user })}</Typography> */}
                </Stack>

                <Typography mb={2} mt={5} sx={{ fontSize: "40px" }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    mb={2}
                    mt={2}
                    spacing={3}
                  >
                    <i
                      className="fa fa-cc-visa"
                      style={{ color: "navy", fontSize: "50px;" }}
                    ></i>
                    <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                    <i
                      className="fa fa-cc-mastercard"
                      style={{ color: "red;" }}
                    ></i>
                    <i
                      className="fa fa-cc-discover"
                      style={{ color: "orange" }}
                    ></i>
                  </Stack>
                </Typography>

                <TextField
                  fullWidth
                  margin="normal"
                  type={"text"}
                  name="CreditCardNumber"
                  label="Credit card number"
                  placeholder="1111-2222-3333-4444"
                  onChange={(e) => setCreditCardNumber(e.target.value)}
                  value={CreditCardNumber}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  name="expMonth"
                  type={"date"}
                  onChange={(e) => setExpMonth(e.target.value)}
                  value={expMonth}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  id="demo-helper-text-aligned"
                  type={"text"}
                  label="CVV"
                  placeholder="352"
                  onChange={(e) => setCvv(e.target.value)}
                  value={cvv}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={async () => {
                    /*   let data: CheckOutType = {
                      iduser: user.id,
                      priceOut: getTotalPrice({ user }),
                      creditCardNumber: CreditCardNumber,
                      expMonth: expMonth,
                      cvv: cvv,
                    };
                    await _insetCheckOut(data);
                    mainState.allCheckOut = [data, ...mainState.allCheckOut]; */
                    setMainState({ ...mainState });
                  }}
                >
                  Check Out
                </Button>
              </Card>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  );
}
