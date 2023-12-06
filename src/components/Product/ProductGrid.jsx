import {
  Box,
  Grid,
  Pagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ProductCard } from "./ProducCard";
import { getActiveProducts } from "../../api/product";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ProductGrid = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryCode = searchParams.get("category");
  const sort = searchParams.get("sort");
  const searchKey = searchParams.get("search");

  const handleChangeSort = (event) => {
    const value = event.target.value;
    console.log(value);
    setSelectedSort(value);
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("sort", value);
    const newUrl = `${location.pathname}?${currentParams.toString()}`;
    navigate(newUrl);
  };

  const [selectedSort, setSelectedSort] = useState(sort || "");
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = {
      page: page,
      key: categoryCode || searchKey,
      order: sort,
    };
    getActiveProducts(params).then((res) => {
      setProducts(res.data);
      setTotalPage(res.totalPage);
    });
  }, [page, categoryCode, sort, searchKey]);

  const handlePage = (event, value) => {
    setPage(value);
  };
  return (
    <Box className="min-h-screen w-[100%] flex-col">
      <Box className="mx-4 flex justify-end">
        <FormControl className="w-[150px]">
          <InputLabel id="select-label" className="text-sm">
            Sắp xếp
          </InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label="Sắp xếp"
            value={selectedSort}
            onChange={handleChangeSort}
            className="p-0 text-sm"
            inputProps={{
              className: "px-3 text-sm",
            }}
            in
          >
            <MenuItem value={"price.asc"}>Giá tăng dần</MenuItem>
            <MenuItem value={"price.desc"}>Giá giảm dần</MenuItem>
            <MenuItem value={"productName.asc"}>A đến Z</MenuItem>
            <MenuItem value={"productName.desc"}>Z đến A</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
      {products.length === 0 && (
        <Box className="flex h-[50vh] items-center justify-center">
          Không tìm thấy sản phẩm
        </Box>
      )}
      {products.length > 0 && (
        <Stack spacing={2}>
          <Pagination
            onChange={handlePage}
            page={page}
            count={totalPage}
            shape="rounded"
            className="flex justify-end"
          />
        </Stack>
      )}
    </Box>
  );
};
