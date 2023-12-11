import * as React from "react";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { GridProductOrder } from "./GridProductOrder";
import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { getCustomers } from "../../api/customer";

export const CreateOrder = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [customer, setCustomer] = React.useState('CUS_1');
  
  useEffect(() => {
    const params = { key: inputValue || customer };
    getCustomers(params)
      .then((res) => {
        res.data.forEach((element) => {
          setCustomer(element);
        });
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(customer);
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