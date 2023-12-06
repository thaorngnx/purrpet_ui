import { Box, Typography } from "@mui/material";
import { OrderHistory } from "./OrderHistory";
import { SpaHistory } from "./SpaHistory";
import { HomeHistory } from "./HomeHistory";

export const History = () => {
  return (
    <Box className=" flex min-h-screen w-3/4 flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Lịch sử mua hàng
      </Typography>
      <OrderHistory />
      <SpaHistory />
      <HomeHistory />
    </Box>
  );
};
