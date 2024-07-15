import { useStore } from "zustand";
import { getAllFavorite } from "../../api/favorite";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { ProductCard } from "../Product/ProducCard";
import { useEffect, useState } from "react";

export const FavoriteProduct = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [page, setPage] = useState(1);

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

  return (
    <Box className="mx-5 flex  min-h-screen flex-col items-center">
      <Typography variant="h6" className="m-3 ml-5 font-bold">
        Sản phẩm yêu thích
      </Typography>
      <Grid
        container
        spacing={1}
        //max columns
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        }}
        className="flex justify-start"
      >
        {favoriteProducts?.map((product) => (
          <Grid item key={product.purrPetCode} className="">
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
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
            className="mb-2 flex justify-end"
          />
        </Stack>
      )}
    </Box>
  );
};
