import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    List,
    ListItem,
    Divider,
    Button,
  } from "@mui/material";
  import * as CONST from "../../constants";
  import { useEffect, useState } from "react";
  import { getOrders } from "../../api/order";
  import { Link } from "react-router-dom";
  import { formatCurrency, formatDateTime } from "../../utils/formatData";
  import { HeaderStaff } from "../../components/Header/HeaderStaff";
  import { SideNavStaff } from "../../components/Nav/SideNavStaff";
  
  export const ManageOrder = () => {
    const handleTabOrderClick = (event) => {
      const status = event.target.innerText;
      for (const [key, value] of Object.entries(CONST.STATUS_ORDER)) {
        if (value.toUpperCase() === status) {
          const orderByStatus = orders.filter((order) => order.status === value);
          setOrderByStatus(orderByStatus);
        }
      }
    };
  
    const [orders, setOrders] = useState([]);
    const [orderByStatus, setOrderByStatus] = useState([]);
    const [tabOrder, setTabOrder] = useState(0);
  
    useEffect(() => {
      //api get status in constant by tab index
      const status = Object.values(CONST.STATUS_ORDER)[tabOrder];
      //api get order by customer
      getOrders().then((res) => {
        console.log(res);
        if (res.err === 0) {
          setOrders(res.data);
          const waittingForPayOrder = res.data.filter(
            (order) => order.status === status,
          );
          setOrderByStatus(waittingForPayOrder);
        }
      });
    }, []);
    return (
        <>
        <HeaderStaff />
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <SideNavStaff />
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
              return (
                <Tab label={value} key={value} onClick={handleTabOrderClick} />
              );
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
                          <Button
                            component={Link}
                            to={`${order.purrPetCode}`}
                            size="small"
                            sx={{
                              color: "black",
                              display: "block",
                              fontWeight: "bold",
                              border: "1px solid black",
                              textTransform: "none",
                              m: 1,
                              ":hover": {
                                backgroundColor: "black",
                                color: "white",
                              },
                              width: "fit-content",
                            }}
                          >
                            Chi tiết
                          </Button>
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
      </div>
      </>
    );
  };
  