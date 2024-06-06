import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Cookie from "js-cookie";
import { Box, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { formatCurrency } from '../../utils/formatData';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
export const ScrollToTop = () => {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);
    const [productRecently, setProductRecently] = useState([]);
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };
    const showProductRecently = () => {
        console.log(showContent);
        if(showContent === true){
            setShowContent(false);
            return;
        }
        setShowContent(true);
        const product = Cookie.get("producRecently");
        setProductRecently( JSON.parse(product));
       
    }
    const handleProductClick = () => {
        navigate(`/product/${productRecently.purrPetCode}`);
        setShowContent(false);
    }

    
    return (
        <>
       
         <Box className=" flex flex-row fixed top-1/2 right-2  py-2 px-1 rounded z-[1000]" >
         {
                showContent && (
                    <Box className="flex flex-col bg-[#ffffff] border-2 border-x-gray-300 justify-around items-center">
                  
                    <Box className="relative group flex flex-row w-full">
                      <Box className="flex-1 group-hover:block hidden w-[200px]">
                        <h3 className="font-bold text-md">{productRecently.productName}</h3>                       
                        <p className="text-red-600 font-bold">{productRecently.priceDiscount ? formatCurrency(productRecently.priceDiscount): formatCurrency(productRecently.price)}</p>
                      </Box>
                      
                        {productRecently.length === 0 ? (
                          <Typography className="flex items-center justify-center absolute relative w-[80px] h-[80px] bg-[#ffffff] ">
                            <ImageNotSupportedIcon />
                          </Typography>
                        ):(
                        <Typography className="relative w-[80px] h-[80px] ml-[auto]" onClick={handleProductClick}>
                        <img
                          src={productRecently.images[0]?.path}
                          alt={productRecently.productName}
                          className="absolute"
                        />
                         </Typography>)}
                     
                    </Box>
                  </Box>
                )
         }
         <Box className=" flex flex-col bg-[#ffffff] hover:bg-[#dbe1ee]  font-bold " >
         <ButtonGroup variant="text" aria-label="Basic button group" orientation="vertical" >
                <Button>
                    <Tooltip title="Sản phẩm xem gần đây">
                        <AccessTimeIcon  onClick={showProductRecently} />
                    </Tooltip> 
                </Button>
            <Button><ArrowUpwardIcon  onClick={scrollToTop} /></Button>         
            </ButtonGroup>
         </Box>
            </Box>
        </>
       
    );
    };