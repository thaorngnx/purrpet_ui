import { useStore } from "../../zustand/store";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { MiniHoverButton } from "../Button/StyledButton";
import { useNavigate } from "react-router-dom";
import { DeleteForever } from "@mui/icons-material";

export const FavoriteProduct = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const { favoriteProduct } = useStore();
  const favoriteProducts = useStore((state) => state.favoriteDetailState.data);
  const { pagination } = useStore((state) => state.favoriteDetailState);

  const { getFavoriteProductDetail } = useStore();

  useEffect(() => {
    const params = {
      limit: 10,
      page: page,
    };
    getFavoriteProductDetail(params);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleUnfavorite = (product) => {
    favoriteProduct(product);
    getFavoriteProductDetail({ limit: 10, page });
  };
  const handleAddtoCart = (product) => {
    addToCart({
      productCode: product,
      quantity: 1,
    });
  };
  return (
    <Box className="mx-5 flex  min-h-screen flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Sản phẩm yêu thích
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="font-bold">
                Hình ảnh
              </TableCell>
              <TableCell align="center" className="font-bold">
                Tên sản phẩm
              </TableCell>
              <TableCell align="center" className="font-bold">
                Giá
              </TableCell>
              <TableCell align="center" className="font-bold">
                Trạng thái
              </TableCell>
              <TableCell align="center" className="font-bold"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favoriteProducts?.map((row) => (
              <TableRow
                key={row.purrPetCode}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={row.images[0]?.path}
                    alt=""
                    className="h-[100px] w-[100px] object-cover"
                  />
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
                  <Box className="flex flex-row">
                    <MiniHoverButton
                      onClick={() => {
                        navigate(`/product/${row.purrPetCode}`);
                      }}
                    >
                      Chi tiết
                    </MiniHoverButton>
                    <MiniHoverButton
                      onClick={() => handleAddtoCart(row.purrPetCode)}
                      className="mx-1"
                    >
                      Thêm vào giỏ hàng
                    </MiniHoverButton>
                    <DeleteForever
                      color="error"
                      onClick={() => handleUnfavorite(row.purrPetCode)}
                    />
                  </Box>
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
            count={pagination.total ? pagination.total : 1}
            shape="rounded"
            className="mb-2 mt-5 flex justify-end"
          />
        </Stack>
      )}
    </Box>
  );
};
