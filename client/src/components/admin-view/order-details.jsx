import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "sonner";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success(data?.payload?.message);
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] bg-white border border-black">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-black">Order ID</p>
            <Label className="text-black font-mono text-sm">{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-black">Order Date</p>
            <Label className="text-black">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-black">Order Price</p>
            <Label className="text-black font-bold">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-black">Payment method</p>
            <Label className="text-black">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-black">Payment Status</p>
            <Label className="text-black">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <p className="font-semibold text-black">Order Status</p>
            <Label>
              <Badge
                variant={
                  orderDetails?.orderStatus === "confirmed"
                    ? "default"
                    : orderDetails?.orderStatus === "rejected"
                    ? "destructive"
                    : "outline"
                }
                className="py-1 px-3 border border-black"
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="bg-black" />
        <div className="grid gap-4">
          <div className="grid gap-3">
            <div className="font-semibold text-black text-lg">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item, index) => (
                    <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-black font-medium">{item.title}</span>
                      <span className="text-black">Qty: {item.quantity}</span>
                      <span className="text-black font-semibold">${item.price}</span>
                    </li>
                  ))
                : (
                  <li className="text-center text-gray-500 py-4">No items found</li>
                )}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <div className="font-semibold text-black text-lg">Shipping Info</div>
            <div className="grid gap-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-black font-medium">{user?.userName}</span>
              <span className="text-black">{orderDetails?.addressInfo?.address}</span>
              <span className="text-black">{orderDetails?.addressInfo?.city}</span>
              <span className="text-black">{orderDetails?.addressInfo?.pincode}</span>
              <span className="text-black">{orderDetails?.addressInfo?.phone}</span>
              {orderDetails?.addressInfo?.notes && (
                <span className="text-black">{orderDetails?.addressInfo?.notes}</span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-black pt-4">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;