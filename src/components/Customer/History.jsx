import { Box, Button, Typography } from "@mui/material";
import { OrderHistory } from "./OrderHistory";
import { SpaHistory } from "./SpaHistory";
import { HomeHistory } from "./HomeHistory";
import { Link } from "react-router-dom";

export const History = () => {
  return (
    <Box className=" flex min-h-screen  flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Lịch sử mua hàng
      </Typography>
      <OrderHistory />
      <SpaHistory />
      <HomeHistory />
    </Box>
  );
};
