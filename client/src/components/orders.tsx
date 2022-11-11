import { MainStateType, OrderType } from "./mainState";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
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
import ConfirmDeleteDialog from "./common/ConfirmDeleteDialog";
interface OrdersPageProps {
  mainState: MainStateType;
  setMainState: (m: MainStateType) => void;
}

export function OrdersPage({ mainState, setMainState }: OrdersPageProps) {
  const { user } = mainState;
  const { orderUser } = user;
  const [openConfirmDelDlg, setopenConfirmDelDlg] = useState(false);
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
      <Typography variant="h4">Orders</Typography>

      <div className="row pt-3 pb-3">
        <div className="col-md-8 pt-3 pb-3">
          {orderUser.map((order: any) => {
            return (
              <div className="row pt-3 pb-3">
                <div className="col">
                  <Card>
                    <CardMedia
                      component="img"
                      height="190"
                      width="200"
                      image={order.orderProduct && order.orderProduct.images}
                      alt={order.orderProduct && order.orderProduct.images}
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
                      <Button aria-label="reduce">
                        <RemoveIcon fontSize="small" />
                      </Button>
                      <Button aria-label="reduce">{order.quantity}</Button>
                      <Button aria-label="increase">
                        <AddIcon fontSize="small" />
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
            mainState.user.orderUser = orderUser;
            setMainState({ ...mainState });
          }}
          mainState={mainState}
          setMainState={setMainState}
        />
      )}
    </Container>
  );
}
