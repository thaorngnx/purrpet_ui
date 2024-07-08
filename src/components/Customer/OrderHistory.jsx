import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  Divider,
  Pagination,
} from "@mui/material";
import * as CONST from "../../constants";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/order";
import { Link } from "react-router-dom";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { MiniHoverButton } from "../Button/StyledButton";

export const OrderHistory = () => {
  const [resOrders, setResOrders] = useState([]);
  const [tabOrder, setTabOrder] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
      // key: categoryCode || searchKey,
      // order: sort,
    };
    //api get order
    getOrders(params).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setResOrders(res);
      }
    });
  }, [page]);

  const orders = resOrders.data;
  let totalPage = resOrders.totalPage;

  let orderByStatus = [];

  if (tabOrder === 0) {
    orderByStatus = orders;
  } else {
    const status = Object.values(CONST.STATUS_ORDER)[tabOrder - 1];
    orderByStatus = orders?.filter((order) => order.status === status) || [];
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Paper className="mb-10 w-[97%]">
      <Typography variant="h6" className="m-3 text-center text-lg font-bold">
        ĐƠN HÀNG
      </Typography>
      <Box className="flex flex-col">
        <Tabs
          value={tabOrder}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          onChange={(event, newValue) => {
            setTabOrder(newValue);
          }}
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab
            label="Tất cả"
            sx={{
              fontSize: "13px",
            }}
          />
          {Object.values(CONST.STATUS_ORDER).map((value) => {
            return (
              <Tab
                label={value}
                key={value}
                sx={{
                  fontSize: "13px",
                }}
              />
            );
          })}
        </Tabs>
        <Box className="flex max-h-96 flex-col overflow-auto">
          <List>
            <ListItem key="title" className="flex justify-around">
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
                className="  hidden w-1/5 text-center font-bold md:block"
              >
                SL sản phẩm
              </Typography>
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Tổng tiền
              </Typography>
              {tabOrder === 0 && (
                <Typography
                  variant="body1"
                  className="w-1/5 text-center font-bold"
                >
                  Trạng thái
                </Typography>
              )}
              <Typography
                variant="body1"
                className="w-1/5 text-center font-bold"
              >
                Thao tác
              </Typography>
            </ListItem>
            {orderByStatus?.length > 0 &&
              orderByStatus.map((order) => {
                return (
                  <ListItem
                    key={order.purrPetCode}
                    className="flex justify-around"
                  >
                    <Box className="flex w-full flex-col">
                      <Box className="mb-2 flex flex-row items-center justify-around">
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
                          className="hidden w-1/5 px-1 text-center md:block"
                        >
                          {order.orderItems.length}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="w-1/5 px-1 text-center"
                        >
                          {formatCurrency(order.orderPrice)}
                        </Typography>
                        {tabOrder === 0 && (
                          <Typography
                            variant="body1"
                            className="w-1/5 px-1 text-center"
                          >
                            {order.status}
                          </Typography>
                        )}
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
      {orderByStatus?.length === 0 && (
        <Typography variant="h6" className="m-3 text-center text-base italic">
          Không có dữ liệu
        </Typography>
      )}
      {totalPage > 0 && (
        <Box className="m-2 flex justify-end">
          <Pagination count={totalPage} onChange={handleChangePage} />
        </Box>
      )}
    </Paper>
  );
};
