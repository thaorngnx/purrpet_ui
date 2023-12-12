import * as React from "react";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { GridProductOrder } from "./GridProductOrder";
import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { getCustomerByEmail } from "../../api/customer";

export const CreateOrder = () => {
  const [inputValue, setInputValue] = React.useState('khachle@gmail.com');
  const [customer, setCustomer] = React.useState({});
  
  useEffect(() => {
    getCustomerByEmail({email: inputValue}).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      }else{
      setInputValue('khachle@gmail.com');
      }
    });
  }, [inputValue]);
  const handleOnchange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <>
      <HeaderStaff />
      <div style={{ display: 'flex', justifyContent: 'space-around'}}>
        <SideNavStaff />
        <Input placeholder="Enter email" onChange={handleOnchange}/>
      </div>
      <div style={{ flex: '1', marginLeft: "6%" }}>
      <GridProductOrder customer={customer}/>
      </div>
     
      
    </>
  );
};