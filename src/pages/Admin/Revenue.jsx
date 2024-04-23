import React, { useEffect } from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { reportRevenue } from "../../api/pay";
import PropTypes from 'prop-types';
import { Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatCurrency } from "../../utils/formatData";

function createData(name, count, totalItem, fromDate, toDate,  Cash, VNPAY,  totalCash, totalVNPAY) {
  return {
    name,
    count,
    totalItem,
    Detail: [
      {
        date: fromDate,
        paymethod: 'VNPAY',
        amount: VNPAY,
        total: totalVNPAY,
      },
      {
        date:toDate,
        paymethod: 'Tiền mặt',
        amount: Cash,
        total: totalCash,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.count}</TableCell>
        <TableCell align="right">{row.totalItem}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell className="font-bold">Ngày tháng</TableCell>
                    <TableCell className="font-bold">Phương thức thanh toán</TableCell>
                    <TableCell align="right" className="font-bold">Số lượng đơn</TableCell>
                    <TableCell align="right" className="font-bold">Tổng tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Detail.map((DetailRow) => (
                    <TableRow key={DetailRow.date}>
                      <TableCell component="th" scope="row">
                        {DetailRow.date}
                      </TableCell>
                      <TableCell >{DetailRow.paymethod}</TableCell>
                      <TableCell align="right">{DetailRow.amount}</TableCell>
                      <TableCell align="right"> {DetailRow.total}</TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    count: PropTypes.number.isRequired,
    totalItem: PropTypes.number.isRequired,
    Detail: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        paymethod: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const Revenue = () => {
    const [fromDate, setFromDate] = useState(dayjs().subtract(7, "day"));
    const [toDate, setToDate] = useState(dayjs());
    const [data, setData] = useState({
      countOrder: [0, 0, 0],
      totalOrder: [0, 0, 0],
      countBookingSpa: [0, 0, 0],
      totalBookingSpa: [0, 0, 0],
      countBookingHome: [0, 0, 0],
      totalBookingHome: [0, 0, 0],
      total: 0,
    }
    );

    const handleFromDateChange = (newValue) => {
      setFromDate(dayjs(newValue));
    };
  
    const handleToDateChange = (newValue) => {
      setToDate(dayjs(newValue));
    };
    useEffect(() => {
        reportRevenue({
          startDate: fromDate,
          endDate: toDate,
        })
          .then((res) => {
            setData(res.data);
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
        }, [ fromDate, toDate]);
  const rows = [
      createData('Đơn đặt hàng', data.countOrder[0] , formatCurrency(data.totalOrder[0]), fromDate.format("YYYY-MM-DD"), toDate.format("YYYY-MM-DD"), data.countOrder[1], data.countOrder[2], formatCurrency(data.totalOrder[1]), formatCurrency(data.totalOrder[2])),
      createData('Đơn đặt lịch spa', data.countBookingSpa[0], formatCurrency(data.totalBookingSpa[0]), fromDate.format("YYYY-MM-DD"), toDate.format("YYYY-MM-DD"), data.countBookingSpa[1], data.countBookingSpa[2], formatCurrency(data.totalBookingSpa[1]), formatCurrency(data.totalBookingSpa[2])),
      createData('Đơn đặt phòng', data.countBookingHome[0], formatCurrency(data.totalBookingHome[0]),  fromDate.format("YYYY-MM-DD"), toDate.format("YYYY-MM-DD"),   data.countBookingHome[1], data.countBookingHome[2], formatCurrency(data.totalBookingHome[1]), formatCurrency(data.totalBookingHome[2]))
  ];
    return (
       <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        marginBottom: "30px",
      }}>
        <Typography variant="h5" className="my-3 text-xl font-bold mb-{10}">
          4. Thống kê doanh thu
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
          }}
        >
            <Box
                sx={{
                p: 2,
                backgroundColor: "#f3f4f6",
                borderRadius: "5px",
                textAlign: "center",
                }}
            >
                <Typography variant="h6" className="text-lg font-semibold ">
                Tổng doanh thu
                <Box className="mb-5 flex flex-row mt-10 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Từ ngày"
              value={fromDate}
              onChange={handleFromDateChange}
              format="DD/MM/YYYY"
              maxDate={dayjs()}
              className="mr-5"
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Đến ngày"
              value={toDate}
              onChange={handleToDateChange}
              format="DD/MM/YYYY"
              maxDate={dayjs()}
              minDate={dayjs(fromDate)}
            />
          </LocalizationProvider>
        </Box>
                </Typography>
                <TableContainer component={Paper}>
                <Typography  className="my-3 text-xl font-bold">
                {formatCurrency(data.total)}
        </Typography>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className="font-bold text-lg">Loại đơn</TableCell>
            <TableCell align="right" className="font-bold text-lg">Số lượng</TableCell>
            <TableCell align="right" className="font-bold text-lg">Tổng doanh thu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </Box>
            </Box>
       </Box>
    );
    };
export default Revenue;