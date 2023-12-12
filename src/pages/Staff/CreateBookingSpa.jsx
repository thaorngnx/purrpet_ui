import * as React from "react";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { BookingSpa } from "./BookingSpa";

export const CreateBookingSpa = () => {
  

  return (
    <>
      <HeaderStaff />
      <div style={{ display: 'flex'}}>
        <SideNavStaff />
       <BookingSpa/>
      </div>
    </>
  );
};