import { useStore } from "../../zustand/store";
import { favoriteProduct, getAllFavorite } from "../../api/favorite";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { MiniHoverButton } from "../Button/StyledButton";
import { useNavigate } from "react-router-dom";



export const FavoriteProduct = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
    };
    console.log(params);
    getAllFavorite(params).then((res) => {
      if (res.err === 0) {
        console.log(res.data);
        setFavoriteProducts(res.data);
        setTotalPage(res.pagination.total);
      }
    });
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleUnfavorite = (product) => {
    favoriteProduct(product).then((res) => {
      if (res.err === 0) {
        window.location.reload();
      }
    });
  };
  const handleAddtoCart = (product) => {
    addToCart({
      productCode: product,
      quantity: 1,
    });
  }
  return (
    <Box className="mx-5 flex  min-h-screen flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Sản phẩm yêu thích
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell align="left">Tên sản phẩm</TableCell>
            <TableCell align="right">Giá</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favoriteProducts.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <img  src={row.images[0]?.path} alt="" className="h-[100px] w-[100px] object-cover"/>
              </TableCell>
              <TableCell align="left">{row.productName}</TableCell>
              <TableCell align="right">
                {row.priceDiscount ? (
                  <div>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: "line-through" }}
                    >
                      {row.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                    <Typography variant="body1">
                      {row.priceDiscount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </div>
                ) : (
                  <Typography variant="body1">
                    {row.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                  {row.inventory > 0 ? (
                  <Typography
                    variant="body2"
                    className={
                      row.discountQuantity > 0
                        ? "text-[#ed8821]"
                        : "text-green-600"
                    }
                  >
                    {row.discountQuantity > 0
                      ? `Chỉ còn ${row.discountQuantity} ` 
                      : "Còn hàng"}
                  </Typography>
                ) : (
                  <Typography variant="body2" className="text-red-600">
                    Hết hàng
                  </Typography>
                )}

              </TableCell>
              <TableCell align="right">
                <MiniHoverButton onClick={() => {
                          navigate(`/product/${row.productCode}`);
                        }}>
                 Chi tiết
                </MiniHoverButton>
              </TableCell>
              <TableCell align="right">
                <MiniHoverButton onClick={()=> handleAddtoCart(row.purrPetCode)} >
                 Thêm vào giỏ hàng
                </MiniHoverButton>
              </TableCell>
              
              <TableCell align="right">
                <button className="text-blue-500" onClick={()=> handleUnfavorite(row.purrPetCode)}>Xóa</button>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


      {favoriteProducts?.length === 0 && (
        <Box className="flex h-[50vh] items-center justify-center">
          Không tìm thấy sản phẩm
        </Box>
      )}
      {favoriteProducts?.length > 0 && (
        <Stack spacing={2}>
          <Pagination
            onChange={handleChangePage}
            page={page}
            count={totalPage}
            shape="rounded"
            className="mb-2 flex justify-end mt-5"
          />
        </Stack>
      )}
    </Box>
  );
};
