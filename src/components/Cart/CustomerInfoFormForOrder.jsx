import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  FormControl,
  FormLabel,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import { createCustomer, updateCustomer } from "../../api/customer";
import { sendOtp, verifyOtp } from "../../api/otp";
import { useStore } from "../../zustand/store";
import { BigHoverFitContentButton } from "../Button/StyledButton";
import {
  validateEmail,
  validateOtp,
  validatePhone,
} from "../../utils/validationData";
import { formatCurrency } from "../../utils/formatData";

export const CustomerInfoFormForOrder = ({ customer, confirmInfo, totalPrice }) => {
  const customerState = useStore((state) => state.customerState.data);

  const { setCustomerState } = useStore();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [otpClick, setOtpClick] = useState(false);
  const [otpValid, setOtpValid] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  const [existCustomer, setExistCustomer] = useState(false);
  const [editInfo, setEditInfo] = useState(true);
  const [error, setError] = useState({});
  //backup customer info when cancel edit
  const [backupCustomerInfo, setBackupCustomerInfo] = useState({});
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
    customerUserPoint: 0,
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

  useEffect(() => {
    if (!editInfo) {
      setBackupCustomerInfo({ ...customerInfo });
    }
  }, [editInfo]);

  const handleChangeCustomerInfo = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
    customer({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSendOTPCLick = () => {
    console.log("send otp");
    if (
      !customerInfo.customerEmail ||
      !validateEmail(customerInfo.customerEmail)
    ) {
      setError({ ...error, customerEmail: true });
      return;
    }
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
    if (!customerInfo.otp || !validateOtp(customerInfo.otp)) {
      setError({ ...error, otp: true });
      return;
    }
    //api check otp
    verifyOtp({
      email: customerInfo.customerEmail,
      otp: customerInfo.otp,
    }).then((res) => {
      console.log(res);
      if (res.err === 0) {
        setOtpValid(true);
        setCustomerState({ data: res.data, error: null, loading: false });
        // if (res.data === null) {
        //   setExistCustomer(false);
        //   setEditInfo(true);
        // } else {
        //   setExistCustomer(true);
        //   setEditInfo(true);
        //   setHasAddress(false);
        //   let address = {
        //     street: "",
        //     province: "",
        //     district: "",
        //     ward: "",
        //   };
        //   if (res.data.address) {
        //     setEditInfo(false);
        //     setHasAddress(true);
        //     confirmInfo(true);
        //     const selectedProvince = provinces.find(
        //       (province) => province.Name === res.data.address.province,
        //     );
        //     const selectedDistrict = selectedProvince.Districts.find(
        //       (district) => district.Name === res.data.address.district,
        //     );
        //     setDistricts(selectedProvince.Districts);
        //     setWards(selectedDistrict.Wards);
        //     address = {
        //       street: res.data.address.street,
        //       province: res.data.address.province,
        //       district: res.data.address.district,
        //       ward: res.data.address.ward,
        //     };
        //   }
        //   customer({
        //     ...customerInfo,
        //     customerCode: res.data.purrPetCode,
        //     customerName: res.data.name,
        //     customerPhone: res.data.phoneNumber,
        //     customerAddress: address,
        //   });
        //   setCustomerInfo({
        //     ...customerInfo,
        //     customerCode: res.data.purrPetCode,
        //     customerName: res.data.name,
        //     customerPhone: res.data.phoneNumber,
        //     customerAddress: address,
        //   });
        //}
      } else {
        customerInfo.otp = "";
        setError({ ...error, otp: true });
      }
    });
  };

  const handleEditInfo = () => {
    if (existCustomer && !editInfo) {
      setEditInfo(true);
      confirmInfo(false);
    } else if (existCustomer && editInfo) {
      console.log("edit customer");
      let err = {};
      if (!customerInfo.customerName) {
        err = { ...err, customerName: true };
      }
      if (!customerInfo.customerPhone) {
        err = { ...err, customerPhone: true };
      }
      if (!customerInfo.customerAddress?.street) {
        err = { ...err, street: true };
      }
      if (!customerInfo.customerAddress?.province) {
        err = { ...err, province: true };
      }
      if (!customerInfo.customerAddress?.district) {
        err = { ...err, district: true };
      }
      if (!customerInfo.customerAddress?.ward) {
        err = { ...err, ward: true };
      }
      if (Object.keys(err).length > 0) {
        setError(err);
        return;
      }
      if (
        !customerInfo.customerName ||
        !customerInfo.customerPhone ||
        !customerInfo.customerAddress?.street
      ) {
        return;
      }
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
          // setCustomerInfo({
          //   ...customerInfo,
          //   customerCode: res.data.purrPetCode,
          // });
          // customer({ ...customerInfo, customerCode: res.data.purrPetCode });
          setCustomerState({ data: res.data, error: null, loading: false });
        }
      });
      //oke
      setExistCustomer(true);
      setEditInfo(false);
      confirmInfo(true);
    }
  };

  const handleCancelEditInfo = () => {
    setEditInfo(false);
    setError({});
    confirmInfo(true);
    if (provinces.length > 0) {
      const selectedProvince = provinces.find(
        (province) => province.Name === customerState.address.province,
      );
      const selectedDistrict = selectedProvince.Districts.find(
        (district) => district.Name === customerState.address.district,
      );
      setDistricts(selectedProvince.Districts);
      setWards(selectedDistrict.Wards);
    }
    customer({ ...backupCustomerInfo });
    setCustomerInfo({ ...backupCustomerInfo });
  };

  const handleChangeStreet = (e) => {
    if (!e.target.value) {
      setError({ ...error, street: true });
    } else {
      setError({ ...error, street: false });
    }
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
  const handleChangePoint = (e) => {
    if (e.target.value > customerState.point || e.target.value < 0 || e.target.value > totalPrice * 0.1) {
      setError({ ...error, customerUserPoint: true });
      e.target.value = 0;
    } else {
      setError({ ...error, customerUserPoint: false });
      customer({
        ...customerInfo,
        userPoint: e.target.value,
      });
    }
    
  }

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
        className="mb-3 text-center font-bold"
      >
        Thông tin khách hàng
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
              className="my-3"
              error={error.customerEmail}
              helperText={error.customerEmail && "Email không hợp lệ"}
              onBlur={() => {
                if (!validateEmail(customerInfo.customerEmail)) {
                  setError({ ...error, customerEmail: true });
                }
              }}
            />
            {otpClick && !otpValid && (
              <Typography className="text-sm italic text-blue-950">
                Mã OTP đã được gửi đến email của bạn và có hiệu lực trong 5 phút
              </Typography>
            )}
            {!otpValid && (
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <BigHoverFitContentButton onClick={handleSendOTPCLick}>
                  {otpClick ? "Gửi lại OTP" : "Gửi OTP"}
                </BigHoverFitContentButton>
              </Box>
            )}
          </FormControl>

          {otpClick && !otpValid && (
            <FormControl>
              <FormLabel className="my-2 font-bold text-black">OTP:</FormLabel>
              <TextField
                required
                name="otp"
                type="number"
                value={customerInfo.otp}
                onChange={handleChangeCustomerInfo}
                variant="outlined"
                className="mb-3"
                error={error.otp}
                helperText={error.otp && "OTP không hợp lệ"}
                onBlur={() => {
                  if (!validateOtp(customerInfo.otp)) {
                    setError({ ...error, otp: true });
                  }
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <BigHoverFitContentButton onClick={handleValidOTPCLick}>
                  Xác thực
                </BigHoverFitContentButton>
              </Box>
            </FormControl>
          )}
        </>
      )}

      {otpValid && (
        <>
          <FormControl>
            <FormLabel className="mb-2 font-bold text-black">
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
              onBlur={() => {
                if (!customerInfo.customerName) {
                  setError({ ...error, customerName: true });
                }
              }}
            />
            <FormLabel className="my-2 font-bold text-black">
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
              helperText={error.customerPhone && "Số điện thoại không hợp lệ"}
              onBlur={() => {
                if (!validatePhone(customerInfo.customerPhone)) {
                  setError({ ...error, customerPhone: true });
                }
              }}
            />
            <FormLabel className="my-2 font-bold text-black">
              Số nhà, tên đường:
            </FormLabel>
            <TextField
              required
              name="street"
              value={customerInfo.customerAddress?.street}
              disabled={!editInfo}
              onChange={handleChangeStreet}
              variant="outlined"
              error={error.street}
              helperText={error.street && "Địa chỉ không được để trống"}
              onBlur={() => {
                if (!customerInfo.customerAddress?.street) {
                  setError({ ...error, street: true });
                }
              }}
            />
          </FormControl>
          {/* <FormControl>
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
              <BigHoverFitContentButton
                variant="outlined"
                onClick={handleCancelEditInfo}
              >
                Hủy
              </BigHoverFitContentButton>
            )}
            <BigHoverFitContentButton
              variant="outlined"
              onClick={handleEditInfo}
            >
              {!editInfo ? "Sửa" : "Xác nhận thông tin"}
            </BigHoverFitContentButton>
          </FormControl> */}
          <Box className="flex flex-row justify-between">
            <FormControl className="w-1/3 pr-1">
              <FormLabel className="my-2 font-bold text-black">
                Tỉnh/thành phố:
              </FormLabel>
              <Select
                className="w-full"
                name="province"
                value={customerInfo.customerAddress?.province}
                onChange={handleProvinceChange}
                variant="outlined"
                disabled={!editInfo}
                error={error.province}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.Name} value={province.Name}>
                    {province.Name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className="text-red-600">
                {error.province && "Tỉnh/thành phố không được để trống"}
              </FormHelperText>
            </FormControl>
            <FormControl className="w-1/3 px-1">
              <FormLabel className="my-2 font-bold text-black">
                Quận/huyện:
              </FormLabel>
              <Select
                className="w-full"
                name="district"
                value={customerInfo.customerAddress?.district}
                onChange={handleDistrictChange}
                variant="outlined"
                disabled={!editInfo || districts.length === 0}
                error={error.district}
              >
                {districts.map((district) => (
                  <MenuItem key={district.Name} value={district.Name}>
                    {district.Name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className="text-red-600">
                {error.district && "Quận/huyện không được để trống"}
              </FormHelperText>
            </FormControl>
            <FormControl className="w-1/3 pl-1">
              <FormLabel className="my-2 font-bold text-black">
                Phường/xã:
              </FormLabel>
              <Select
                className="w-full"
                name="ward"
                value={customerInfo.customerAddress?.ward}
                onChange={handleWardChange}
                variant="outlined"
                disabled={!editInfo || wards.length === 0}
                error={error.ward}
              >
                {wards.map((ward) => (
                  <MenuItem key={ward.Name} value={ward.Name}>
                    {ward.Name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className="text-red-600">
                {error.ward && "Phường/xã không được để trống"}
              </FormHelperText>
            </FormControl>
          </Box>
          <FormControl className="mt-3 flex flex-row justify-end">
            {existCustomer && editInfo && hasAddress && (
              <BigHoverFitContentButton onClick={handleCancelEditInfo}>
                Hủy
              </BigHoverFitContentButton>
            )}
            <BigHoverFitContentButton className="ml-5" onClick={handleEditInfo}>
              {!editInfo ? "Sửa" : "Xác nhận thông tin"}
            </BigHoverFitContentButton>
          </FormControl>
          {
            customerState &&
          <FormControl>
          <FormLabel className="mb-2 font-bold text-black">
              Điểm sử dụng: (Bạn đang có {formatCurrency(customerState.point ) } điểm tích luỹ)
            </FormLabel>
            <TextField
              required
              name="customerUserPoint"
              type="number"
              onChange={handleChangePoint}
              variant="outlined"
              error={error.customerUserPoint}
              helperText={error.customerUserPoint && "Điểm sử dụng dưới 10% tổng đơn hàng và không vượt quá số điểm hiện có"}
              onBlur={() => {
                if (customerInfo.customerUserPoint > customerState.point || customerInfo.customerUserPoint < 0 || customerInfo.customerUserPoint > totalPrice * 0.1) {
                  setError({ ...error, customerUserPoint: true });
                }}
              }
            />
          </FormControl>
        }
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
