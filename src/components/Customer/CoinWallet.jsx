import { Box, FormGroup, Tab, Typography } from "@mui/material"
import { useStore } from "../../zustand/store";
import image from "../../assets/coin.png";
import imageCoin from "../../assets/Remove-bg.ai_1715610157596.png";
import { formatCurrency, formatDateTime } from "../../utils/formatData";
import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
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
    
    let coins =[]
   if(selectedTab === 0){
        coins = coinInfo;
    }
   else if(selectedTab === 1){
        coins = coinInfo.filter(coin => coin.status === "cộng");
    }
    else if(selectedTab === 2){
        coins = coinInfo.filter(coin => coin.status === "trừ");
    }


    return (
        <>
        <Box className ="m-5 w-full bg-white" >
            <FormGroup className="flex flex-row m-10 items-center">
              <img src={image} alt="coin" className="w-1/15" />
                <Typography variant="h2" gutterBottom component="div" className="ml-3 text-[30px] text-[#f6a700]">
                    {customer?.coin.toLocaleString('en-US')} 
                    <Tooltip title="Đây là số dư Xu của bạn. Có được khi bạn huỷ các đơn hàng đã thanh toán. Bạn có thể sử dụng nó để thanh toán các đơn hàng sau!">
                    <IconButton>
                        < HelpOutlineOutlinedIcon />
                    </IconButton>
                    </Tooltip>
                </Typography>
                <Typography variant="h2" gutterBottom component="div" className="ml-3 mt-[14px] text-[20px] text-[#f6a700]">
                     Xu đang có
                     <Typography className=" text-[15px] text-black">
                    
                     Đồng nghĩa với Quý khách có {(formatCurrency(customer?.coin))} trong ví!
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
              fontSize: "13px",
            }}
          />
            <Tab
            label="ĐÃ NHẬN"
            sx={{
            fontSize: "13px",
            }}
            />
            <Tab
            label="ĐÃ SỬ DỤNG"
            sx={{
             fontSize: "13px",
            }}
            />
        </Tabs>
        {
            coins.map((coin) => {
                return (
                    <Box className="flex flex-row justify-between items-center border-b-2 border-gray-200 p-2">
                        <img src={coin.status === "cộng" ? image : imageCoin} alt="coin" className="w-1/15" />
                        <Typography variant="body1" className="w-3/5">
                            {coin.status === "cộng" ? `Bạn được cộng ${coin?.coin} xu vì huỷ đơn hàng đã thanh toán cho đơn hàng ${coin?.orderCode}` : `Bạn đã dùng ${coin?.coin} xu để thanh toán cho đơn hàng ${coin?.orderCode}`}
                            <br/>
                           Ngày {formatDateTime(coin?.createdAt) }
                        </Typography>
                        <Typography variant="body1"  className={`text-[20px] ${coin.status === "cộng" ? "text-[#f6a700]" : "text-black"} text-end w-1/5` }>
                            { coin.status === "cộng" ? `+ ${formatCurrency(coin?.coin)} ` : ` - ${formatCurrency(coin?.coin)}`}
                        </Typography>
                       
                        
                    </Box>
                )
            })
        }
            </Box>

        </Box>
        </>
    )
}