import { HeaderStaff } from "../../components/Header/HeaderStaff";
import { SideNavStaff } from "../../components/Nav/SideNavStaff";
import { GridProductOrder } from "./GridProductOrder";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCustomerByEmail, createCustomerByStaff } from "../../api/customer";
import { BigHoverButton } from "../../components/Button/StyledButton";
import { validateEmail } from "../../utils/validationData";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";

export const CreateOrder = () => {
  const [inputValue, setInputValue] = useState("khachle@gmail.com");
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState({});
  const [showNameInput, setShowNameInput] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    getCustomerByEmail({ email: inputValue }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      } else {
        setShowNameInput(true);
      }
    });
  }, [inputValue]);

  const handleFind = () => {
    if (!email || !validateEmail(email)) {
      setError({ ...error, email: true });
      return;
    }
    setInputValue(email);
  };
  const handleEnterEmail = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      setInputValue(e.target.value);
    }
  };

  const handleNameChange = (e) => {
    if (!e.target.value) {
      setError({ ...error, name: true });
    } else {
      setError({ ...error, name: false });
    }
    setNameValue(e.target.value);
  };

  const handleClose = () => {
    setShowNameInput(false);
    setError({});
  };

  const handleSubscribe = () => {
    if (!nameValue) {
      setError({ ...error, name: true });
      return;
    }
    createCustomerByStaff({
      name: nameValue,
      email: inputValue,
      address: {
        street: "Số 1 Võ Văn Ngân",
        ward: "Linh Chiểu",
        district: "Thủ Đức",
        province: "TP Hồ Chí Minh",
      },
    }).then((res) => {
      if (res.err === 0) {
        setCustomer(res.data);
      } else {
        setInputValue("CUS_1");
      }
      setShowNameInput(false);
    });
    setShowNameInput(false);
  };

  const handleCompleteOrder = (customer) => {
    if (!customer) {
      setInputValue("khachle@gmail.com");
      setEmail("");
    }
  };
  return (
    <>
      <HeaderStaff />
      <Box className="flex w-full">
        <SideNavStaff />
        <Box className="flex w-full flex-col">
          <Typography
            variant="h4"
            className="m-5 text-center text-2xl font-bold"
          >
            Tạo đơn hàng
          </Typography>
          <Box className="mx-5 flex flex-col">
            <Typography variant="h6" className="text-base font-bold">
              Email khách hàng:
            </Typography>
            <Box className="mt-2 flex flex-row">
              <TextField
                className="w-1/2"
                placeholder="Nhập email khách hàng"
                value={email}
                onKeyDown={handleEnterEmail}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                helperText={error.email && "Email không hợp lệ"}
              />
              <BigHoverButton className="ml-5" onClick={handleFind}>
                Tìm kiếm
              </BigHoverButton>
            </Box>
          </Box>

          <GridProductOrder
            customer={customer}
            updateCustomer={handleCompleteOrder}
          />
        </Box>

        <Dialog open={showNameInput} onClose={handleClose}>
          <DialogTitle className=" bg-gray-400 text-center font-bold">
            THÊM KHÁCH HÀNG
          </DialogTitle>
          <DialogContent className="flex w-[400px] justify-center pb-0">
            <TextField
              autoFocus
              id="name"
              label="Tên khách hàng"
              type="text"
              onChange={handleNameChange}
              className="my-5 w-[90%]"
              error={error.name}
              helperText={error.name && "Tên khách hàng không được để trống"}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleSubscribe}>Tạo</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
