import * as React from "react";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { BookingHome } from "./BookingHome";

export const CreateBookingHome = () => {
  return (
    <>
      <HeaderStaff />
      <div style={{ display: "flex" }}>
        <SideNavStaff />
        <BookingHome />
      </div>
    </>
  );
};
