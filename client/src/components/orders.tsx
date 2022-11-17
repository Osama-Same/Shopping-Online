import { MainStateType, OrderType, CheckOutType } from "./mainState";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, CardActionArea, CardContent } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FlagIcon from "@mui/icons-material/Flag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import { _deleteOrders } from "../service/deleteAllData";
import { _putOrders } from "../service/putAllData";
import ConfirmDeleteDialog from "./common/ConfirmDeleteDialog";
import { _insetCheckOut } from "../service/postAllData";
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
  const [selectedUser, setSelectedUser] = useState<OrderType | null>(null);
  const getTotalPrice = ({ user }: any) => {
    let totalPrice = 0;
    if (!user) return totalPrice;
    user.orderUser.forEach((e: any) => {
      totalPrice += e.quantity * e.orderProduct.price;
    });
    return totalPrice;
  };
  if (!user) return <>Not User</>;
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <div className="row">
        <Container maxWidth="sm">
          {user.orderUser.map((order: any) => {
            return (
              <div className="col-md-12 pt-3 pb-3">
                <Card>
                  <CardActionArea
                    onClick={() => {
                      setMainState({ ...mainState });
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={order.orderProduct && order.orderProduct.images}
                        alt="Live from space album cover"
                      />
                      <CardContent sx={{ flex: "1 0 auto" }}>
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
                          </Stack>
                        </Typography>
                        <Typography mb={2} mt={2}>
                          <Chip
                            icon={<CalendarTodayIcon />}
                            label={
                              order.orderProduct &&
                              order.orderProduct.description
                            }
                            variant="outlined"
                          />
                        </Typography>
                        <Typography variant="h5">
                          <Button
                            aria-label="reduce"
                            onClick={async () => {
                              order.quantity = --order.quantity;
                              await _putOrders(order.id, order);
                              mainState.render = "orders";
                              setMainState({ ...mainState });
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <Button aria-label="reduce">{order.quantity}</Button>
                          <Button aria-label="increase">
                            <AddIcon
                              fontSize="small"
                              onClick={async () => {
                                order.quantity = ++order.quantity;
                                await _putOrders(order.id, order);
                                mainState.render = "orders";
                                setMainState({ ...mainState });
                              }}
                            />
                          </Button>
                        </Typography>
                        <Stack
                          justifyContent="center"
                          direction="row"
                          alignItems="center"
                          mt={3}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            onClick={async () => {
                              setopenConfirmDelDlg(true);
                              setSelectedUser(order);
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </CardContent>
                    </Stack>
                  </CardActionArea>
                </Card>
                {selectedUser && (
                  <ConfirmDeleteDialog
                    open={openConfirmDelDlg}
                    setopen={setopenConfirmDelDlg}
                    text={`Do ${selectedUser.id}  will be deleted permenantly, are you sure?`}
                    onConfirm={async () => {
                      if (!selectedUser) return;
                      await _deleteOrders(selectedUser.id);
                      mainState.render = "orders";
                      setMainState({ ...mainState });
                    }}
                    mainState={mainState}
                    setMainState={setMainState}
                  />
                )}
              </div>
            );
          })}
        </Container>
        <div className="col">
          <Container maxWidth="md">
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
                  <Typography> {getTotalPrice({ user })}</Typography>
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
                  type={"month"}
                  label="Exp Month"
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
                    let data: CheckOutType = {
                      iduser: user.id,
                      priceOut: getTotalPrice({ user }),
                      creditCardNumber: CreditCardNumber,
                      expMonth: expMonth,
                      cvv: cvv,
                    };
                    await _insetCheckOut(data);
                    mainState.allCheckOut = [data, ...mainState.allCheckOut];
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

/*  <div className="row pt-3 pb-3">
        <div className="col-md-8 pt-3 pb-3">
          {user.orderUser.map((order: OrderType | any) => {
            return (
              <div className="row pt-3 pb-3">
                <div className="col">
                  <Card>
                    <CardMedia
                      component="img"
                      height="185"
                      width="300"
                      image={order.orderProduct && order.orderProduct.images}
                      alt={order.orderProduct && order.orderProduct?.images}
                    />
                  </Card>
                </div>
                <div className="col-9 ">
                  <Card>
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
                        label={order.orderProduct && order.orderProduct.country}
                        variant="outlined"
                      />
                      <Chip
                        icon={<AttachMoneyIcon />}
                        label={order.orderProduct && order.orderProduct.price}
                        variant="outlined"
                      />
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={order.orderProduct && order.orderProduct.date}
                        variant="outlined"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      mb={2}
                      mt={1}
                      spacing={2}
                    >
                      <Chip
                        icon={<CalendarTodayIcon />}
                        label={
                          order.orderProduct && order.orderProduct.description
                        }
                        variant="outlined"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        aria-label="reduce"
                        onClick={async () => {
                          order.quantity = --order.quantity;
                          await _putOrders(order.id, order);
                          mainState.render = "orders";
                          setMainState({ ...mainState });
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button aria-label="reduce">{order.quantity}</Button>
                      <Button aria-label="increase">
                        <AddIcon
                          fontSize="small"
                          onClick={async () => {
                            order.quantity = ++order.quantity;
                            await _putOrders(order.id, order);
                            mainState.render = "orders";
                            setMainState({ ...mainState });
                          }}
                        />
                      </Button>
                    </Stack>

                    <Stack
                      justifyContent="flex-end"
                      direction="row"
                      alignItems="center"
                    >
                      <Button
                        onClick={async () => {
                          setopenConfirmDelDlg(true);
                          setSelectedUser(order);
                        }}
                      >
                        <ClearIcon />
                      </Button>
                    </Stack>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col pt-3 pb-3">
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
                <Typography> {getTotalPrice({ user })}</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                mb={2}
                mt={2}
                spacing={12}
              ></Stack>

              <Typography mb={2}>Check Out</Typography>
              <TextField
                fullWidth
                margin="normal"
                id="demo-helper-text-aligned"
                label="Card Number"
              />
              <TextField
                fullWidth
                margin="normal"
                id="demo-helper-text-aligned"
                label="Name"
              />
              <TextField
                fullWidth
                margin="normal"
                id="demo-helper-text-aligned"
                label="Name"
              />
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Check Out
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {selectedUser && (
        <ConfirmDeleteDialog
          open={openConfirmDelDlg}
          setopen={setopenConfirmDelDlg}
          text={`Do ${selectedUser.id}  will be deleted permenantly, are you sure?`}
          onConfirm={async () => {
            if (!selectedUser) return;
            await _deleteOrders(selectedUser.id);
            if (mainState.user && mainState.user.orderUser) {
              const userProduct = mainState.user.orderUser.find(
                (up: any) => up.id === selectedUser.idproduct
              );
              return (user.orderUser = userProduct);
            }
            mainState.render = "orders";
            setMainState({ ...mainState });
          }}
          mainState={mainState}
          setMainState={setMainState}
        />
      )}
    </Container> */
