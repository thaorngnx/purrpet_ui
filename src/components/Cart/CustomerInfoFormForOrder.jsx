import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  FormLabel,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { createCustomer, updateCustomer } from "../../api/customer";
import { sendOtp, verifyOtp } from "../../api/otp";
import { useStore } from "../../zustand/store";

export const CustomerInfoFormForOrder = ({ customer, confirmInfo }) => {
  const customerState = useStore((state) => state.customerState.data);

  const handleChangeCustomerInfo = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    if (event.target.name === "customerPhone") {
      customer({ ...customerInfo, customerPhone: event.target.value });
      setCustomerInfo({
        ...customerInfo,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.name === "customerNote") {
      // customerNote(event.target.value);
      customer({ ...customerInfo, customerNote: event.target.value });
      setCustomerInfo({
        ...customerInfo,
        [event.target.name]: event.target.value,
      });
    }
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendOTPCLick = () => {
    console.log("send otp");
    //api send otp
    sendOtp({ email: customerInfo.customerEmail }).then((res) => {
      if (res.err === 0) {
        console.log(res);
        setOtpClick(true);
      }
    });
  };

  const handleValidOTPCLick = () => {
    console.log("send otp");
    //api check otp
    verifyOtp({
      email: customerInfo.customerEmail,
      otp: customerInfo.otp,
    }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOtpValid(true);
        if (res.data === null) {
          setExistCustomer(false);
          setEditInfo(true);
        } else {
          setExistCustomer(true);
          setEditInfo(true);
          setHasAddress(false);
          let address = {
            street: "",
            province: "",
            district: "",
            ward: "",
          };
          if (res.data.address) {
            setEditInfo(false);
            setHasAddress(true);
            confirmInfo(true);
            const selectedProvince = provinces.find(
              (province) => province.Name === res.data.address.province,
            );
            const selectedDistrict = selectedProvince.Districts.find(
              (district) => district.Name === res.data.address.district,
            );
            setDistricts(selectedProvince.Districts);
            setWards(selectedDistrict.Wards);
            address = {
              street: res.data.address.street,
              province: res.data.address.province,
              district: res.data.address.district,
              ward: res.data.address.ward,
            };
          }
          customer({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
            customerName: res.data.name,
            customerPhone: res.data.phoneNumber,
            customerAddress: address,
          });
          setCustomerInfo({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
            customerName: res.data.name,
            customerPhone: res.data.phoneNumber,
            customerAddress: address,
          });
        }
      } else {
        setEditInfo(true);
        confirmInfo(false);
      }
    });
  };

  const handleEditInfo = () => {
    if (existCustomer && !editInfo) {
      setEditInfo(true);
      confirmInfo(false);
    } else if (existCustomer && editInfo) {
      console.log("edit customer");
      //api update customer
      updateCustomer({
        purrPetCode: customerInfo.customerCode,
        name: customerInfo.customerName,
        phoneNumber: customerInfo.customerPhone,
        address: customerInfo.customerAddress,
      }).then((res) => {
        if (res.err === 0) {
          console.log(res);
        }
      });
      //oke
      setEditInfo(false);
      confirmInfo(true);
    } else if (!existCustomer && editInfo) {
      console.log("create customer");
      //api create customer
      createCustomer({
        phoneNumber: customerInfo.customerPhone,
        email: customerInfo.customerEmail,
        name: customerInfo.customerName,
        address: customerInfo.customerAddress,
      }).then((res) => {
        if (res.err === 0) {
          setCustomerInfo({
            ...customerInfo,
            customerCode: res.data.purrPetCode,
          });
          customer({ ...customerInfo, customerCode: res.data.purrPetCode });
        }
      });
      //oke
      setExistCustomer(true);
      setEditInfo(false);
      confirmInfo(true);
    }
  };

  const handleCancleEditInfo = () => {
    setEditInfo(false);
    confirmInfo(true);
  };

  const handleChangeStreet = (e) => {
    customer({
      ...customerInfo,
      customerAddress: {
        ...customerInfo.customerAddress,
        street: e.target.value,
      },
    });
    setCustomerInfo({
      ...customerInfo,
      customerAddress: {
        ...customerInfo.customerAddress,
        street: e.target.value,
      },
    });
  };

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;

    if (provinceName) {
      const selectedProvince = provinces.find(
        (province) => province.Name === provinceName,
      );

      if (selectedProvince) {
        customer({
          ...customerInfo,
          customerAddress: {
            ...customerInfo.customerAddress,
            province: selectedProvince.Name,
            district: "",
            ward: "",
          },
        });
        setCustomerInfo({
          ...customerInfo,
          customerAddress: {
            ...customerInfo.customerAddress,
            province: selectedProvince.Name,
            district: "",
            ward: "",
          },
        });
        setDistricts(selectedProvince.Districts);
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;

    if (districtName) {
      const selectedDistrict = districts.find(
        (district) => district.Name === districtName,
      );

      if (selectedDistrict) {
        customer({
          ...customerInfo,
          customerAddress: {
            ...customerInfo.customerAddress,
            district: selectedDistrict.Name,
          },
        });
        setCustomerInfo({
          ...customerInfo,
          customerAddress: {
            ...customerInfo.customerAddress,
            district: selectedDistrict.Name,
          },
        });
        setWards(selectedDistrict.Wards);
      }
    } else {
      setWards([]);
    }
  };

  const handleWardChange = (e) => {
    const wardName = e.target.value;
    if (wardName) {
      const selectedWard = wards.find((ward) => ward.Name === wardName);

      if (selectedWard) {
        customer({
          ...customerInfo,
          customerAddress: {
            ...customerInfo.customerAddress,
            ward: selectedWard.Name,
          },
        });
        setCustomerInfo({
          ...customerInfo,
          customerAddress: {
            ...customerInfo.customerAddress,
            ward: selectedWard.Name,
          },
        });
      }
    }
  };

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [otpClick, setOtpClick] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [existCustomer, setExistCustomer] = useState(false);
  const [editInfo, setEditInfo] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    customerPhone: "",
    otp: "",
    customerName: "",
    customerEmail: "",
    customerAddress: {
      street: "",
      province: "",
      district: "",
      ward: "",
    },
    customerNote: "",
    customerCode: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      );
      setProvinces(response.data);
      if (customerState != null) {
        setExistCustomer(true);
        setOtpValid(true);
        if (customerState.address) {
          customer({
            ...customerInfo,
            customerCode: customerState.purrPetCode,
            customerAddress: customerState.address,
          });
          setCustomerInfo({
            ...customerInfo,
            customerCode: customerState.purrPetCode,
            customerName: customerState.name,
            customerPhone: customerState.phoneNumber,
            customerAddress: customerState.address,
          });
          setEditInfo(false);
          setHasAddress(true);
          confirmInfo(true);
          const selectedProvince = response.data.find(
            (province) => province.Name === customerState.address.province,
          );
          const selectedDistrict = selectedProvince.Districts.find(
            (district) => district.Name === customerState.address.district,
          );
          setDistricts(selectedProvince.Districts);
          setWards(selectedDistrict.Wards);
        } else {
          customer({
            ...customerInfo,
            customerCode: customerState.purrPetCode,
          });
          setCustomerInfo({
            ...customerInfo,
            customerCode: customerState.purrPetCode,
            customerName: customerState.name,
            customerPhone: customerState.phoneNumber,
          });
          setEditInfo(true);
          setHasAddress(false);
          confirmInfo(false);
        }
      }
    };

    fetchData();
  }, [customerState]);

  const [error, setError] = useState({});
  return (
    <Paper
      sx={{
        width: "90%",
        ml: "auto",
        mr: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        p: 5,
        mt: 5,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        className="text-center font-bold"
      >
        Thông tin khách hàng {customerState?.purrPetCode} {!otpValid && "✔️"}
      </Typography>
      {customerState == null && (
        <>
          <FormControl>
            <FormLabel className="font-bold text-black">Email:</FormLabel>
            <TextField
              required
              name="customerEmail"
              value={customerInfo.customerEmail}
              disabled={otpValid}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.customerEmail}
              helperText={error.customerPhone && "Email không được để trống"}
            />
            {!otpValid && (
              <Button
                variant="outlined"
                className="w-fit"
                onClick={handleSendOTPCLick}
              >
                {otpClick ? "Gửi lại OTP" : "Gửi OTP"}
              </Button>
            )}
          </FormControl>

          {otpClick && !otpValid && (
            <FormControl>
              <FormLabel className="font-bold text-black">OTP:</FormLabel>
              <TextField
                required
                name="otp"
                type="number"
                value={customerInfo.otp}
                onChange={handleChangeCustomerInfo}
                variant="outlined"
                error={error.otp}
                helperText={error.otp && "OTP không được để trống"}
              />
              <Button
                variant="outlined"
                className="w-fit"
                onClick={handleValidOTPCLick}
              >
                Xác thực
              </Button>
            </FormControl>
          )}
        </>
      )}

      {otpValid && (
        <>
          <FormControl>
            <FormLabel className="font-bold text-black">
              Tên khách hàng:
            </FormLabel>
            <TextField
              required
              name="customerName"
              value={customerInfo.customerName}
              disabled={!editInfo}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.customerName}
              helperText={
                error.customerName && "Tên khách hàng không được để trống"
              }
            />
            <FormLabel className="font-bold text-black">
              Số điện thoại:
            </FormLabel>
            <TextField
              required
              name="customerPhone"
              value={customerInfo.customerPhone}
              disabled={!editInfo}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.customerPhone}
              helperText={
                error.customerPhone && "Số điện thoại không được để trống"
              }
            />
            <FormLabel className="font-bold text-black">
              Số nhà, tên đường:
            </FormLabel>
            <TextField
              required
              name="customerAddress"
              value={customerInfo.customerAddress?.street}
              disabled={!editInfo}
              onChange={handleChangeStreet}
              variant="outlined"
              error={error.customerAddress}
              helperText={
                error.customerAddress && "Địa chỉ không được để trống"
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel className="font-bold text-black">
              Tỉnh/thành phố:
            </FormLabel>
            <Select
              className="w-full"
              value={customerInfo.customerAddress?.province}
              onChange={handleProvinceChange}
              variant="outlined"
              disabled={!editInfo}
            >
              {provinces.map((province) => (
                <MenuItem key={province.Name} value={province.Name}>
                  {province.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel className="font-bold text-black">Quận/huyện:</FormLabel>
            <Select
              className="w-full"
              value={customerInfo.customerAddress?.district}
              onChange={handleDistrictChange}
              variant="outlined"
              disabled={!editInfo}
            >
              {districts.map((district) => (
                <MenuItem key={district.Name} value={district.Name}>
                  {district.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel className="font-bold text-black">Phường/xã:</FormLabel>
            <Select
              className="w-full"
              value={customerInfo.customerAddress?.ward}
              onChange={handleWardChange}
              variant="outlined"
              disabled={!editInfo}
            >
              {wards.map((ward) => (
                <MenuItem key={ward.Name} value={ward.Name}>
                  {ward.Name}
                </MenuItem>
              ))}
            </Select>

            {existCustomer && editInfo && hasAddress && (
              <Button
                variant="outlined"
                className="w-fit"
                onClick={handleCancleEditInfo}
              >
                Hủy
              </Button>
            )}
            <Button
              variant="outlined"
              className="w-fit"
              onClick={handleEditInfo}
            >
              {!editInfo ? "Sửa" : "Xác nhận thông tin"}
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel className="font-bold text-black">Ghi chú:</FormLabel>
            <TextField
              required
              name="customerNote"
              value={customerInfo.customerNote}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
            />
          </FormControl>
        </>
      )}
    </Paper>
  );
};
