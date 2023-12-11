import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getOrdersByCustomer } from "../../api/order";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton } from "../Button/StyledButton";

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [tabOrder, setTabOrder] = useState(0);

  useEffect(() => {
    //api get order by customer
    getOrdersByCustomer().then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOrders(res.data);
      }
    });
  }, []);

  const status = Object.values(CONST.STATUS_ORDER)[tabOrder];
  const orderByStatus = orders.filter((order) => order.status === status);

  return (
    <Paper className="mb-10 w-[90%]">
      <Typography variant="h6" className="m-3 text-center text-lg font-bold">
        ĐƠN HÀNG
      </Typography>
      <Box className="flex flex-col">
        <Tabs
          value={tabOrder}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={(event, newValue) => {
            setTabOrder(newValue);
          }}
        >
          {Object.values(CONST.STATUS_ORDER).map((value) => {
            return <Tab label={value} key={value} />;
          })}
        </Tabs>
        <Box className="flex max-h-96 flex-col overflow-auto">
          <List>
            <ListItem key="title" className="flex">
              <Typography variant="body1" className="w-1/5 font-bold">
                Mã ĐH
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Ngày đặt
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                SL sản phẩm
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Tổng tiền
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Thao tác
              </Typography>
            </ListItem>
            {orderByStatus.map((order) => {
              return (
                <ListItem
                  key={order.purrPetCode}
                  className="flex justify-center"
                >
                  <Box className="flex w-full flex-col">
                    <Box className="mb-2 flex flex-row items-center">
                      <Typography variant="body1" className="w-1/5 px-1">
                        {order.purrPetCode}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="w-1/5 px-1 text-center"
                      >
                        {formatDateTime(order.createdAt)}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="w-1/5 px-1 text-center"
                      >
                        {order.orderItems.length}
                      </Typography>
                      <Typography
                        variant="body1"
                        className="w-1/5 px-1 text-right"
                      >
                        {formatCurrency(order.orderPrice)}
                      </Typography>
                      <Box className="flex w-1/5 justify-center px-1 text-center">
                        <MiniHoverButton
                          component={Link}
                          to={`/order/${order.purrPetCode}`}
                        >
                          Chi tiết
                        </MiniHoverButton>
                      </Box>
                    </Box>
                    <Divider />
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Paper>
  );
};
