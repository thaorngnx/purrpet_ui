import { SideNavAdmin } from "../../components/Nav/SideNavAdmin";
import { Box, Typography } from "@mui/material";
import { HeaderAdmin } from "../../components/Header/HeaderAdmin";
import React from "react";
import { BarProduct } from "../../components/Chart/BarProduct";
import { LineHomeStay } from "../../components/Chart/LineHomeStay";
import { PieSpa } from "../../components/Chart/PieSpa";

export const Dashboard = () => {
  return (
    <>
      <HeaderAdmin />
      <Box sx={{ display: "flex" }}>
        <SideNavAdmin />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" className="text-center text-2xl font-bold">
            Thống kê
          </Typography>
          <BarProduct />
          <LineHomeStay />
          <PieSpa />
        </Box>
      </Box>
    </>
  );
};
