import * as React from "react";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { BookingSpa } from "./BookingSpa";
import { Box } from "@mui/material";

export const CreateBookingSpa = () => {
  return (
    <>
      <HeaderStaff />
      <Box style={{ display: "flex" }}>
        <SideNavStaff />
        <BookingSpa />
      </Box>
    </>
  );
};
