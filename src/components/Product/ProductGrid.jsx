import { Box, Grid, Pagination, Stack } from "@mui/material";
import { ProductCard } from "./ProducCard";
import { getActiveProducts } from "../../api/product";
import { useEffect, useState } from "react";

export const ProductGrid = ({ categoryCode, section }) => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      page: page,
      key: categoryCode,
      order: section,
    };
    getActiveProducts(params).then((res) => {
      setProducts(res.data);
      setTotalPage(res.totalPage);
    });
  }, [page, categoryCode, section]);

  const handlePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
  return (
    <Box className="w-4/5 flex-col">
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid
            item
            xs={3}
            sm={3}
            md={3}
            lg={3}
            key={product.purrPetCode}
            className="flex justify-center"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}>
        <Pagination
          onChange={handlePage}
          count={totalPage}
          shape="rounded"
          className="flex justify-end"
        />
      </Stack>
    </Box>
  );
};
