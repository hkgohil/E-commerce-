import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="border border-black">
      <CardHeader className="border-b border-black">
        <CardTitle className="text-2xl font-bold text-black">All Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {orderList && orderList.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black font-semibold">Order ID</TableHead>
                <TableHead className="text-black font-semibold">Order Date</TableHead>
                <TableHead className="text-black font-semibold">Order Status</TableHead>
                <TableHead className="text-black font-semibold">Order Price</TableHead>
                <TableHead className="text-black font-semibold">
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.map((orderItem) => (
                <TableRow key={orderItem._id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm text-black">{orderItem?._id}</TableCell>
                  <TableCell className="text-black">{orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        orderItem?.orderStatus === "confirmed"
                          ? "default"
                          : orderItem?.orderStatus === "rejected"
                          ? "destructive"
                          : "outline"
                      }
                      className="py-1 px-3 border border-black"
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-black">${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button
                        onClick={() =>
                          handleFetchOrderDetails(orderItem?._id)
                        }
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">No orders found</h3>
            <p className="text-gray-600">There are no orders to display at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;