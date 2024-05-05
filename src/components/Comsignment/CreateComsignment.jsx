import { Box, Button, Table, Typography,  TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { TextField } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import {createSupplier, getActiveSuppliers } from "../../api/supplier";
import { MenuItem } from "@mui/material";
import { getProducts } from "../../api/product";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { formatDateTime } from "../../utils/formatData";
import { set } from "date-fns";
import { UpdateSupplier } from "./UpdateSupplier";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { fi } from "date-fns/locale";



export const CreateComsignment = ({infoComsignment, createComsignment,err}
) => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState({
        supplierCode: false,
        productCode: false,
        quantity: false,
        cost: false,
        expiryDate: false,
        
    });
    const [supplierCode, setSupplierCode] = useState(infoComsignment.supplierCode);
    const [products, setProducts] = useState([]);
    const [productSelected, setProductSelected] = useState(infoComsignment.productList);
    const [quantity, setQuantity] = useState(0);
    const [cost, setCost] = useState(0);
    const [expiryDate, setExpiryDate] = useState("");
    const [openCreateSupplier, setOpenCreateSupplier] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
      if (Object.keys(err).length > 0) {
        setError(err);
      }
      const params = {
        limit: 1000,
      };
      getActiveSuppliers(params).then((res) => {
        setSuppliers(res.data);
      });
      
      getProducts(params).then((res) => {
        setProducts(res.data);
      });
    }, [err]);

    const handleChangeSupplier = (event) => {
        if (!event.target.value) {
          error.supplierCode = true;
        } else {
          error.supplierCode = false;
        }
        setSupplierCode(event.target.value);
      };
    const handleChangeProduct = (event) => {
        if (!event.target.value) {
          error.productCode = true;
        } else {
          error.productCode = false;
        }
        setProductSelected(event.target.value);
      };
    
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
      };
    const handleChangeCost = (event) => {
        setCost(event.target.value);
      };
    const handleExpiryDateChange = (date) => {
        setExpiryDate(date);
      };

    const handleAddProduct = () => {
        if (!productSelected) {
          error.productCode = true;
        }
        if (!quantity) {
          error.quantity = true;
        }
        if (!cost) {
          error.cost = true;
        }
        if (!expiryDate) {
          error.expiryDate = true;
        }
        if (
          error.productCode ||
          error.quantity ||
          error.cost ||
          error.expiryDate
        ) {
          setError(error);
          return;
        }

        const newProduct = products.find(
          (product) => product.purrPetCode === productSelected
        );
        console.log(infoComsignment)
        if(infoComsignment.productList){
          const newProductList = [...infoComsignment.productList, {
            expiryDate: expiryDate,
            productCode: newProduct.purrPetCode,
            quantity: quantity,
            cost: cost,
          }];
          createComsignment({
            supplierCode: supplierCode,
            productList: newProductList,
          });
        }else{
          const newProductList = [ {
            expiryDate: expiryDate,
            productCode: newProduct.purrPetCode,
            quantity: quantity,
            cost: cost,
          }];
          createComsignment({
            supplierCode: supplierCode,
            productList: newProductList,
          });
        }  
    };
    const handleClickCreateSupplier = () => {
      setOpenCreateSupplier(true);
    }
    const handleDataUpdateSupplier = (data) => {
      setSelectedSupplier(data);
    }
    const handleCloseAddDialog = () => {
      setOpenCreateSupplier(false);
    }
    const handleCreateSuplier = () => {
      createSupplier({
        supplierName: selectedSupplier.supplierName,
        email: selectedSupplier.email,
        phoneNumber: selectedSupplier.phoneNumber,
      }).then((res) => {
        if(res.err === 0){
        setOpenCreateSupplier(false);
        setSupplierCode(res.data.purrPetCode);
        getActiveSuppliers().then((res) => {
          setSuppliers(res.data);
        });
      }
      else{
        setError(res.err)
      }
      })
    }
    
  
    const handleSearchChange = (event) => {
      setSearchKeyword(event.target.value);
    };
  
    // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    console.log('filter',filteredProducts)
    
    return (
        <Box className="m-5 w-[500px] ">
          <Box className="flex flex-row justify-between items-start"> 
            <Typography className="font-bold ">
                Chọn nhà cung cấp
            </Typography>
            <Button onClick={handleClickCreateSupplier} className=" text-center font-bold " >
            Thêm NCC
          </Button>
          </Box>
       <TextField
        label="Danh sách nhà cung cấp"
        select
        required
        name="supplierCode"
        key={suppliers}
        value={supplierCode}
        onChange={handleChangeSupplier}
        error={supplierCode}
        helperText={
          error.supplierCode && "Nhà cung cấp không được để trống"
        }
        className="mb-3 w-full"
      >
        {suppliers.map((supplier) => (
          <MenuItem key={supplier.supplierName} value={supplier.purrPetCode}>
            {supplier.supplierName}
          </MenuItem>
        ))}
      </TextField>
     
      <Box>
      {/* <Box className="flex flex-row justify-between items-start"> 
          <Typography className="font-bold ">
          Sản phẩm
          </Typography>
          <Button onClick={handleClickCreateSupplier} className=" text-center font-bold " >
            Thêm SP mới
          </Button>
        </Box> */}
       <TextField
        label="Tìm kiếm sản phẩm"
        value={searchKeyword}
        onChange={handleSearchChange}
        className="mb-3 w-full"
      />
         <TextField
        label="Danh sách sản phẩm"
        select
        required
        name="productCode"
        value={productSelected}
        onChange={handleChangeProduct}
        className="mb-3 w-full"
      >
        {filteredProducts.map((product) => (
          <MenuItem key={product.purrPetCode} value={product.purrPetCode}>
            {product.productName}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="outlined-required"
        label="Số lượng"
        fullWidth
        value={quantity}
        onChange={handleChangeQuantity}
        error={error.quantity}
        helperText={error.quantity && "Số lượng không được để trống"}
        className="mb-3"
      />
       <TextField
        required
        id="outlined-required"
        label="Giá nhập"
        fullWidth
        value={cost}
        onChange={handleChangeCost}
        error={error.cost}
        helperText={error.cost && " Giá nhập không được để trống"}
        className="mb-3"
      />
       <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker
          label="Hạn sử dụng"
          name="expiryDate"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          views={["year", "month", "day"]}
          format="DD/MM/YYYY"
          minDate={dayjs()}
          className="mt-4"
          error={expiryDate}
          helperText={error.expiryDate && "Hạn sử dụng không được để trống"}
          />
       </LocalizationProvider>
      <Button onClick={handleAddProduct}>
        Thêm
      </Button>
      {
        infoComsignment.productList && (
        <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell className="font-bold">Hạn sử dụng</TableCell>
            <TableCell className="font-bold">Mã sản phẩm</TableCell>
            <TableCell align="center" className="font-bold">Số lượng</TableCell>
            <TableCell align="center" className="font-bold">Giá nhập</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infoComsignment.productList.map((DetailRow) => (
            <TableRow key={DetailRow.productCode}>
              <TableCell component="th" scope="row">
               {formatDateTime(DetailRow.expiryDate)}
              </TableCell>
              <TableCell >{DetailRow.productCode}</TableCell>
              <TableCell align="center">{DetailRow.quantity}</TableCell>
              <TableCell align="center"> {DetailRow.cost}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
        )
      }
      </Box>
      {
        openCreateSupplier && (
          <Dialog open={openCreateSupplier} onClose={handleCloseAddDialog}>
          <DialogTitle className="bg-gray-400 p-5 text-center font-bold">
            THÊM NHÀ CUNG CẤP
          </DialogTitle>
          <DialogContent className="pb-0">
            <UpdateSupplier
              supplier={selectedSupplier}
              updateSupplier={handleDataUpdateSupplier}
              err={error}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Hủy</Button>
            <Button onClick={handleCreateSuplier}>Tạo</Button>
          </DialogActions>
        </Dialog>
        )
      }
      </Box>
    )
}