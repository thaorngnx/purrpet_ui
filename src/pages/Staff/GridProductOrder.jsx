import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import { getProducts } from '../../api/product';
import {  Button, FormControl} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { TiDeleteOutline } from "react-icons/ti";
import { VscDiffAdded } from "react-icons/vsc";
import { createOrder, updateStatusOrder } from '../../api/order';
import { Modal } from '@mui/base/Modal';
import {StyledBackdrop} from '../../components/Modal/StyledBackdrop';
import { ModalContent } from '../../components/Modal/ModalContent';
import * as CONST from "../../constants";


export const GridProductOrder = ({customer}) => {
  const [productlist, setProductlist] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [order, setOrder] = React.useState({});
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { key: inputValue };
        const response = await getProducts(params);
        setProductlist(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const totalPrice = selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    setTotalPrice(totalPrice);
    const quantity = selectedProducts.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
    setQuantity(quantity);
    console.log(selectedProducts);
    fetchProducts();
  }, [inputValue, selectedProducts]);

  const handleAddQuantity = (productName) => {
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.map((product) => {
        if (product.productName === productName) {
          const newQuantity = product.quantity + 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
  };
  
  const handleSubtractQuantity = (productName) => {
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.map((product) => {
        if (product.productName === productName && product.quantity > 1) {
          const newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
  };

  const handleDeleteProduct = (productName) => {
    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.filter((product) => product.productName !== productName);
    });
  };
  const columns = [
    { field: 'productName', headerName: 'Tên sản phẩm', width: 150 },
    {
      field: 'actions',
      headerName: 'Số lượng',
      width: 200,
      renderCell: (params) => (
        <>
          <FormControl variant="outlined" sx={{ width: '100%' }}>
            <div>
              <Button
                variant="contained"
                className="min-w-min bg-gray-300 p-2 text-black"
                onClick={() => handleSubtractQuantity(params.row.productName)}
              >
                <RemoveIcon />
              </Button>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={params.row.quantity}
                disabled
                sx={{ width: '100px' }}
                inputProps={{
                  style: { textAlign: 'center' },
                }}
              />
              <Button
                variant="contained"
                className="min-w-min bg-gray-300 p-2 text-black"
                onClick={() => handleAddQuantity(params.row.productName)}
              >
                <AddIcon />
              </Button>
            </div>
          </FormControl>
        </>
      ),
    },
    { field: 'productPrice', headerName: 'Giá sản phẩm', width: 200 },
    { field: 'deleteProduct', headerName: '', width: 200, renderCell: (params) =>  <TiDeleteOutline className="text-xl" onClick={() => handleDeleteProduct(params.row.productName)} /> },
  ];
  const rows = selectedProducts.map((product, index) => ({
    id: index + 1,
    productName: product.productName,
    productPrice: product.price * product.quantity,
    quantity: product.quantity,
  }));

  const handleAddProduct = () => {
    if (inputValue && !selectedProducts.some((product) => product.productName === inputValue)) {
      const selectedProduct = productlist.find((product) => product.productName === inputValue);
      if (selectedProduct) {
          setSelectedProducts([...selectedProducts, { ...selectedProduct, quantity: 1 }]);
        setInputValue('');
      } else {
        console.log('Sản phẩm không tồn tại');
      }
    } else {
      handleAddQuantity(inputValue);
    }
    setDisabled(false);
  };

  const handleCreateOrder = () => {
    const productCodes = selectedProducts.map((product) => product.purrPetCode);
    const quantities = selectedProducts.map((product) => product.quantity);
  
    const orderItems = productCodes.map((productCode, index) => ({
      productCode: productCode,
      quantity: quantities[index],
    }));
    const orderData = {
      orderItems: orderItems,
      customerCode: customer.purrPetCode,
    };
    createOrder(orderData)
      .then((res) => {
        setOrder(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      }); 
  };
  const handleCancelOrder = (purrPetCode) => {
    updateStatusOrder( purrPetCode, CONST.STATUS_ORDER.CANCEL
    ).then((res) => {
      setOpen(false);
      setSelectedProducts([]);
      setDisabled(true);
    })
  }
  const handlePayOrder = () => {
      updateStatusOrder( order.purrPetCode, CONST.STATUS_ORDER.PAID
      ).then((res) => {
        setOpen(false);
        setSelectedProducts([]);
        setDisabled(true);
      })
    }
  return (
    <div>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleAddProduct();
          }
        }}
        id="controllable-states-demo"
        options={productlist.map((product) => product.productName)}
        sx={{ width: 600 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiến sản phẩm"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {inputValue && !selectedProducts.includes(inputValue) && (
                    <Button onClick={handleAddProduct}>
                      <VscDiffAdded />
                    </Button>
                  )}
                </>
              ),
            }}
          />
        )}
      />
      {selectedProducts.length > 0 && (
        <div style={{display: 'flex'}}>
          <div style={{ height: 400, width: '600px' }}>
            <DataGrid hideFooter rows={rows} columns={columns} pageSize={5} />
          </div>
          <div style={{ width: '20%', marginLeft: '20px' }}>
          <div> Tổng sản phẩm: {quantity}</div>
          <div>Tổng giá tiền: {totalPrice}</div>
          </div>
        </div>
      )}
     <div style={{display: 'flex', justifyContent: 'center' }}>
      <Button type="button" disabled={disabled} onClick={handleCreateOrder} style={{background: '#3a74bb',color: '#ffff'}}>
        Xác nhận thanh toán
      </Button>
      <Modal
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Set a higher z-index value
      }}
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <ModalContent sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
        <h1 id="unstyled-modal-title">Đơn hàng của bạn đã được tạo</h1>
        <p id="unstyled-modal-description">
          Mã đơn hàng của bạn là: {order.purrPetCode}
        </p>
        <p id="unstyled-modal-description"> Khách hàng: {customer.name}</p>
        <p id="unstyled-modal-description">
          Tổng tiền: {order.orderPrice}
        </p>
        <Button onClick={() => handleCancelOrder(order.purrPetCode)}>Huỷ đơn hàng</Button>
        <Button onClick={() => handlePayOrder(order.purrPetCode)}>Thanh toán</Button>
      </ModalContent>
    </Modal>
    </div>
    </div>
  );
};