import { Box, Grid, Pagination, Stack } from "@mui/material";
import { ProductCard } from "./ProducCard";
import { getActiveProducts } from "../../api/product";
import { useEffect, useState } from "react";

export const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getActiveProducts().then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);
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
        <Pagination count={10} shape="rounded" className="flex justify-end" />
      </Stack>
    </Box>
  );
};
