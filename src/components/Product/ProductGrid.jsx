import {
  Box,
  Grid,
  Pagination,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
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

  const [selectedSort, setSelectedSort] = useState(sort || "");
  const [resProducts, setResProducts] = useState({
    data: [],
    pagination: {
      total: 0,
    },
  });
  const [page, setPage] = useState(1);
  const theme = useTheme();
   // Define media queries for different screen sizes
   const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
 
   // Determine limit based on screen size
   let limit;
   if (isXs) {
     limit = 5;
   } else if (isSm) {
     limit = 8;
   } else if (isMd) {
     limit = 15;
   } else if (isLg) {
     limit = 12;
   } else if (isXl) {
     limit = 12;
   } else {
     limit = 19; // Default limit
   }

  useEffect(() => {
    const params = {
      page: page,
      key: categoryCode || searchKey,
      order: sort,
      limit: limit,
    };
    getActiveProducts(params).then((res) => {
      setResProducts(res);
    });
  }, [page, categoryCode, sort, searchKey, limit]);

  const products = resProducts.data || [];
  const totalPage = resProducts.pagination.total || 0;

  const handleChangeSort = (event) => {
    const value = event.target.value;
    setSelectedSort(value);
    const currentParams = new URLSearchParams(location.search);
    currentParams.set("sort", value);
    const newUrl = `${location.pathname}?${currentParams.toString()}`;
    navigate(newUrl);
  };

  const handlePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box className="min-h-screen w-[100%] flex-col">
      <Box className="mx-4 mb-2 flex justify-end">
        <FormControl className="w-[120px] ">
          <InputLabel
            id="select-label"
            className="text-[12px] sm:text-[12px] md:text-[12px] lg:text-[14px] xl:text-[16px] "
          >
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
          >
            <MenuItem value={"price.asc"}>Giá tăng dần</MenuItem>
            <MenuItem value={"price.desc"}>Giá giảm dần</MenuItem>
            <MenuItem value={"productName.asc"}>A đến Z</MenuItem>
            <MenuItem value={"productName.desc"}>Z đến A</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
        className="flex items-center justify-around"
      >
        {products.map((product) => (
          <Grid item key={product.purrPetCode} className="">
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
            className="mb-2 flex justify-end"
          />
        </Stack>
      )}
    </Box>
  );
};
