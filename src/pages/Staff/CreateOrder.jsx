import * as React from "react";
import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { GridProductOrder } from "./GridProductOrder";
import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { getCustomerByEmail, createCustomerByStaff } from "../../api/customer";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

export const CreateOrder = () => {
  const [inputValue, setInputValue] = React.useState("khachle@gmail.com");
  const [customer, setCustomer] = React.useState({});
  const [showNameInput, setShowNameInput] = React.useState(false);
  const [nameValue, setNameValue] = React.useState("");
  

  useEffect(() => {
    getCustomerByEmail({ email: inputValue }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      } else {
        setShowNameInput(true);
      }
    });
  }, [inputValue]);

  const handleEmailChange = (e) => {
    if (e.key === "Enter") {
      setInputValue(e.target.value);
    }
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleClose = () => {
    setShowNameInput(false);
  };

  const handleSubscribe= () => {
    createCustomerByStaff({name: nameValue, email: inputValue, address:({
      street: "Số 1 Võ Văn Ngân" ,
      ward: "Linh Chiểu",
      district: "Thủ Đức",
      province:"TP Hồ Chí Minh" ,
    })}).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
        console.log("Đã them khách hàng vào db: ", res.data);
      } else {
       setInputValue('CUS_1');
      }
      setShowNameInput(false);
    });
    setShowNameInput(false);
  };
  return (
    <>
      <HeaderStaff />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <SideNavStaff />
        <Input placeholder="Enter email" onKeyDown={handleEmailChange} />
      </div>
          <GridProductOrder customer={customer} />
          
          <Dialog open={showNameInput} onClose={handleClose}>
           <DialogTitle>Subscribe</DialogTitle>
           <DialogContent>
             <DialogContentText>
               Tên của khách là: 
             </DialogContentText>
             <TextField
               autoFocus
               margin="dense"
               id="name"
               label="name"
               fullWidth
               variant="standard"
                onChange={handleNameChange}
             />
           </DialogContent>
           <DialogActions>
             <Button onClick={handleClose}>Cancel</Button>
             <Button onClick={handleSubscribe}>Subscribe</Button>
           </DialogActions>
         </Dialog>
    </>
  );
};