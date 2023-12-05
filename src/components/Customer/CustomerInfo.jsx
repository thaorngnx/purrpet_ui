import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { updateCustomer } from "../../api/customer";
import { useEffect, useState } from "react";
import { useStore } from "../../zustand/store";
import { useNavigate } from "react-router-dom";

export const CustomerInfo = () => {
  const navigate = useNavigate();
  const customer = useStore((state) => state.customerState.data);
  if (customer) {
    console.log("customer", customer);
  } else {
    console.log("no customer");
    navigate("/lookup");
  }
  const handleChangeCustomerInfo = (event) => {
    setError({ ...error, [event.target.name]: false });
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    }
    console.log("event.target.name", event.target.name);
    if (event.target.name === "street") {
      setCustomerInfo({
        ...customerInfo,
        address: {
          ...customerInfo.address,
          street: event.target.value,
        },
      });
      return;
    }
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditInfo = () => {
    if (!editInfo) {
      setEditInfo(true);
    } else if (editInfo) {
      console.log("edit customer");
      //api update customer
      console.log("customerInfo", customerInfo);
      updateCustomer(customerInfo).then((res) => {
        if (res.err === 0) {
          console.log(res);
        }
      });
      setEditInfo(false);
    }
  };

  const handleCancleEditInfo = () => {
    setEditInfo(false);
  };

  const handleProvinceChange = (e) => {
    console.log("customerInfo", customerInfo);
    const provinceName = e.target.value;

    if (provinceName) {
      const selectedProvince = provinces.find(
        (province) => province.Name === provinceName,
      );

      if (selectedProvince) {
        setCustomerInfo({
          ...customerInfo,
          address: {
            ...customerInfo.address,
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
        setCustomerInfo({
          ...customerInfo,
          address: {
            ...customerInfo.address,
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
        setCustomerInfo({
          ...customerInfo,
          address: {
            ...customerInfo.address,
            ward: selectedWard.Name,
          },
        });
      }
    }
  };
  const [error, setError] = useState({});
  const [editInfo, setEditInfo] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    purrPetCode: customer.purrPetCode,
    name: customer.name,
    phoneNumber: customer.phoneNumber,
    address: {
      province: customer.address?.province || "",
      district: customer.address?.district || "",
      ward: customer.address?.ward || "",
      street: customer.address?.street || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      );
      setProvinces(response.data);
      if (customer.address) {
        const selectedProvince = response.data.find(
          (province) => province.Name === customer.address.province,
        );
        if (selectedProvince) {
          setDistricts(selectedProvince.Districts);
          const selectedDistrict = selectedProvince.Districts.find(
            (district) => district.Name === customer.address.district,
          );
          if (selectedDistrict) {
            setWards(selectedDistrict.Wards);
          }
        }
      }
    };

    fetchData();
  }, []);

  //styled button
  const MyButton = styled(Button)({
    fontSize: "16px",
    color: "black",
    display: "block",
    width: "fit-content",
    fontWeight: "bold",
    border: "1px solid black",
    padding: "6px 15px",
    textTransform: "none",
    ":hover": {
      backgroundColor: "black",
      color: "white",
    },
  });

  return (
    <Box className=" flex min-h-screen w-3/4 flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Thông tin cá nhân
      </Typography>
      <Paper className="mb-10 w-[90%]">
        <Box className="m-10 flex flex-col">
          <FormControl>
            <FormLabel className="my-1 font-bold text-black">
              Tên khách hàng:
            </FormLabel>
            <TextField
              required
              name="name"
              value={customerInfo.name}
              disabled={!editInfo}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.name}
              helperText={error.name && "Tên khách hàng không được để trống"}
            />
            <FormLabel className="my-1 font-bold text-black">
              Số điện thoại:
            </FormLabel>
            <TextField
              required
              name="phoneNumber"
              value={customerInfo.phoneNumber}
              disabled={!editInfo}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.phoneNumber}
              helperText={
                error.phoneNumber && "Số điện thoại không được để trống"
              }
            />
            <FormLabel className="my-1 font-bold text-black">
              Số nhà, tên đường:
            </FormLabel>
            <TextField
              required
              name="street"
              value={customerInfo.address?.street}
              disabled={!editInfo}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.address}
              helperText={
                error.address && "Số nhà, tên đường không được để trống"
              }
            />
          </FormControl>
          <Box className="flex flex-row justify-between">
            <FormControl className="w-1/3 pr-1">
              <FormLabel className="my-1 font-bold text-black">
                Tỉnh/thành phố:
              </FormLabel>
              <Select
                className="w-full"
                value={customerInfo.address?.province}
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
            <FormControl className="w-1/3 px-1">
              <FormLabel className="my-1 font-bold text-black">
                Quận/huyện:
              </FormLabel>
              <Select
                className="w-full"
                value={customerInfo.address?.district}
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
            <FormControl className="w-1/3 pl-1">
              <FormLabel className="my-1 font-bold text-black">
                Phường/xã:
              </FormLabel>
              <Select
                className="w-full"
                value={customerInfo.address?.ward}
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
            </FormControl>
          </Box>
          <FormControl className="mt-3 flex flex-row justify-end">
            {editInfo && (
              <MyButton onClick={handleCancleEditInfo}>Hủy</MyButton>
            )}
            <MyButton className="ml-5" onClick={handleEditInfo}>
              {!editInfo ? "Sửa" : "Xác nhận thông tin"}
            </MyButton>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};
