import { Typography } from "@mui/material"
import { useEffect } from "react"
import { getRefundRequest } from "../../api/pay"
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';


export  const OrderRefund = () => {
    const [refundRequest, setRefundRequest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRefundRequest().then((res) => {
            setRefundRequest(res.data);
        } )
    }
    , []);
    const columns = [
        { field: 'orderCode', headerName: 'Mã đơn hàng', width: 200 },
        { field: 'message', headerName: 'Lý do', width: 200 },
        { field: 'customerEmail', headerName: 'Email', width: 200 },
        { field: 'status', headerName: 'Trạng thái', width: 200 },
        {
            field: "action",
            headerName: "Thao tác",
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            sortable: false,
            filterable: false,
            disableExport: true,
            renderCell: (params) => (
              <>
                <Tooltip title="Xem chi tiết">
                  <EditIcon onClick={() => navigate(`/admin/refundProcessing/${params.row.orderCode}`, { state: { notification: params.row } } ) }></EditIcon>
                </Tooltip>
              </>
            ),
          },
    ];
    const rows = refundRequest.map((refund) => {
        return {
            id: refund.orderCode,
            orderCode: refund.orderCode,
            message: refund.message,
            customerEmail: refund.customerEmail,
            status: refund.statusRefund,            
            image: refund.images,
            title: refund.title,
        }
    });
   
    return <>
    <Typography variant="h6" className="m-3 text-center text-lg font-bold">YÊU CẦU HOÀN TIỀN</Typography>
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}

        />
    </div>

    </>
}