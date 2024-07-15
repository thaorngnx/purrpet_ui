import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { updateCustomer } from "../../api/customer";
import { useEffect, useState } from "react";
import { useStore } from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { BigHoverFitContentButton } from "../Button/StyledButton";
import { validatePhone } from "../../utils/validationData";

export const CustomerInfo = () => {
  const navigate = useNavigate();
  const customer = useStore((state) => state.customerState.data);

  const [error, setError] = useState({});
  const [editInfo, setEditInfo] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  //backup customer info when cancel edit
  const [backupCustomerInfo, setBackupCustomerInfo] = useState({});
  const [customerInfo, setCustomerInfo] = useState({
    purrPetCode: customer?.purrPetCode,
    name: customer?.name,
    phoneNumber: customer?.phoneNumber,
    address: {
      province: customer?.address?.province || "",
      district: customer?.address?.district || "",
      ward: customer?.address?.ward || "",
      street: customer?.address?.street || "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      );
      setProvinces(response.data);
      if (!customer) {
        navigate("/lookup");
      } else if (customer.address) {
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

  useEffect(() => {
    if (!editInfo) {
      console.log("cancel edit");
      console.log("cus", customerInfo);
      setBackupCustomerInfo({ ...customerInfo });
    }
  }, [editInfo]);

  const handleChangeCustomerInfo = (event) => {
    if (!event.target.value) {
      setError({ ...error, [event.target.name]: true });
    } else {
      setError({ ...error, [event.target.name]: false });
    }
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
      let err = {};
      if (!customerInfo.name) {
        err = { ...err, name: true };
      }
      if (
        !customerInfo.phoneNumber ||
        !validatePhone(customerInfo.phoneNumber)
      ) {
        err = { ...err, phoneNumber: true };
      }
      if (!customerInfo.address.street) {
        err = { ...err, street: true };
      }
      if (!customerInfo.address.province) {
        err = { ...err, province: true };
      }
      if (!customerInfo.address.district) {
        err = { ...err, district: true };
      }
      if (!customerInfo.address.ward) {
        err = { ...err, ward: true };
      }
      if (Object.keys(err).length > 0) {
        setError(err);
        return;
      }
      //api update customer
      updateCustomer(customerInfo).then((res) => {
        if (res.err === 0) {
          setEditInfo(false);
        }
      });
    }
  };

  const handleCancelEditInfo = () => {
    setEditInfo(false);
    setError({});
    if (provinces.length > 0) {
      const selectedProvince = provinces.find(
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
    setCustomerInfo({ ...backupCustomerInfo });
  };

  const handleProvinceChange = (e) => {
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
        setWards([]);
      }
    } else {
      setError({ ...error, province: true });
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
      setError({ ...error, district: true });
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
    } else {
      setError({ ...error, ward: true });
    }
  };

  return (
    <Box className=" flex min-h-screen  flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Thông tin cá nhân
      </Typography>
      <Paper className="mb-10 w-[90%]">
        <Box className="m-10 flex flex-col">
          <FormControl>
            <FormLabel className="my-2 font-bold text-black">Email:</FormLabel>
            <TextField
              required
              name="name"
              value={customer?.email}
              disabled={true}
              variant="outlined"
            />
            <FormLabel className="my-2 font-bold text-black">
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
            <FormLabel className="my-2 font-bold text-black">
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
              helperText={error.phoneNumber && "Số điện thoại không hợp lệ"}
            />
            <FormLabel className="my-2 font-bold text-black">
              Số nhà, tên đường:
            </FormLabel>
            <TextField
              required
              name="street"
              value={customerInfo.address?.street}
              disabled={!editInfo}
              onChange={handleChangeCustomerInfo}
              variant="outlined"
              error={error.street}
              helperText={
                error.street && "Số nhà, tên đường không được để trống"
              }
            />
          </FormControl>
          <Box className="flex flex-row justify-between">
            <FormControl className="w-1/3 pr-1">
              <FormLabel className="my-2 font-bold text-black">
                Tỉnh/thành phố:
              </FormLabel>
              <Select
                className="w-full"
                name="province"
                value={customerInfo.address?.province}
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
                value={customerInfo.address?.district}
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
                value={customerInfo.address?.ward}
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
            {editInfo && (
              <BigHoverFitContentButton onClick={handleCancelEditInfo}>
                Hủy
              </BigHoverFitContentButton>
            )}
            <BigHoverFitContentButton className="ml-5" onClick={handleEditInfo}>
              {!editInfo ? "Sửa" : "Xác nhận thông tin"}
            </BigHoverFitContentButton>
          </FormControl>
        </Box>
      </Paper>
    </Box>
  );
};
