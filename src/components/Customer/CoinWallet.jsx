import { Box, FormGroup, Tab, Typography } from "@mui/material";
import { useStore } from "../../zustand/store";
import image from "../../assets/coin.png";
import imageCoin from "../../assets/Remove-bg.ai_1715610157596.png";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { getCoins } from "../../api/coin";

export const CoinWallet = () => {
  const customer = useStore((state) => state.customerState.data);
  const [coinInfo, setCoinInfo] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  useEffect(() => {
    getCoins().then((res) => {
      if (res.err === 0) {
        setCoinInfo(res.data);
      }
    });
  }, [customer]);

  let coins = [];
  if (selectedTab === 0) {
    coins = coinInfo;
  } else if (selectedTab === 1) {
    coins = coinInfo.filter((coin) => coin.status === "cộng");
  } else if (selectedTab === 2) {
    coins = coinInfo.filter((coin) => coin.status === "trừ");
  }

  return (
    <>
      <Box className="m-5 w-full bg-white">
        <FormGroup className="m-10 flex flex-row items-center">
          <img
            src={image}
            alt="coin"
            className="w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] xl:w-[90px]"
          />
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="ml-3 text-[20px] text-[#f6a700] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]"
          >
            {customer?.coin.toLocaleString("en-US")}
            <Tooltip title="Đây là số dư Xu của bạn. Có được khi bạn huỷ các đơn hàng đã thanh toán. Bạn có thể sử dụng nó để thanh toán các đơn hàng sau!">
              <IconButton>
                <HelpOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            component="div"
            className="ml-3 mt-[14px] text-[12px] text-[#f6a700] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
          >
            Xu đang có
            <Typography className="text-[10px] text-black sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
              Đồng nghĩa với Quý khách có {formatCurrency(customer?.coin)} trong
              ví!
            </Typography>
          </Typography>
        </FormGroup>
        <Box>
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            onChange={(event, newValue) => {
              setSelectedTab(newValue);
            }}
          >
            <Tab
              label="TẤT CẢ LỊCH SỬ"
              sx={{
                fontSize: "12px", // Smallest size for mobile
                "@media (min-width: 640px)": { fontSize: "13px" }, // sm
                "@media (min-width: 768px)": { fontSize: "14px" }, // md
                "@media (min-width: 1024px)": { fontSize: "15px" }, // lg
                "@media (min-width: 1280px)": { fontSize: "16px" }, // xl
              }}
            />
            <Tab
              label="ĐÃ NHẬN"
              sx={{
                fontSize: "12px", // Smallest size for mobile
                "@media (min-width: 640px)": { fontSize: "13px" }, // sm
                "@media (min-width: 768px)": { fontSize: "14px" }, // md
                "@media (min-width: 1024px)": { fontSize: "15px" }, // lg
                "@media (min-width: 1280px)": { fontSize: "16px" }, // xl
              }}
            />
            <Tab
              label="ĐÃ SỬ DỤNG"
              sx={{
                fontSize: "12px", // Smallest size for mobile
                "@media (min-width: 640px)": { fontSize: "13px" }, // sm
                "@media (min-width: 768px)": { fontSize: "14px" }, // md
                "@media (min-width: 1024px)": { fontSize: "15px" }, // lg
                "@media (min-width: 1280px)": { fontSize: "16px" }, // xl
              }}
            />
          </Tabs>
          {coins.map((coin) => (
            <Box
              key={coin.id}
              className="flex flex-row items-center justify-between border-b-2 border-gray-200 p-2"
            >
              <img
                src={coin.status === "cộng" ? image : imageCoin}
                alt="coin"
                className="w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] xl:w-[90px]"
              />
              <Typography
                variant="body1"
                className="w-3/5 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]"
              >
                {coin.status === "cộng"
                  ? `Bạn được cộng ${coin?.coin} xu vì huỷ đơn hàng đã thanh toán cho đơn hàng ${coin?.orderCode}`
                  : `Bạn đã dùng ${coin?.coin} xu để thanh toán cho đơn hàng ${coin?.orderCode}`}
                <br />
                Ngày {formatDateTime(coin?.createdAt)}
              </Typography>
              <Typography
                variant="body1"
                className={`text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] ${
                  coin.status === "cộng" ? "text-[#f6a700]" : "text-black"
                } w-1/5 text-end`}
              >
                {coin.status === "cộng"
                  ? `+ ${formatCurrency(coin?.coin)}`
                  : ` - ${formatCurrency(coin?.coin)}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
