import { useEffect, useState } from "react";
import { PackageCheck, Truck, MapPin, CheckCircle } from "lucide-react";
import { getOrderById } from "../services/orderService";

const OrderTracking = () => {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchOrder = async () => {
      const selectedOrder = JSON.parse(localStorage.getItem("selectedOrder"));

      if (!selectedOrder) return;

      try {
        const data = await getOrderById(selectedOrder.id);

        setOrder(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, []);

  const steps = [
    {
      title: "Pending",
      icon: PackageCheck,
    },
    {
      title: "Processing",
      icon: PackageCheck,
    },
    {
      title: "Shipped",
      icon: Truck,
    },
    {
      title: "Out For Delivery",
      icon: MapPin,
    },
    {
      title: "Delivered",
      icon: CheckCircle,
    },
  ];

  let currentStep = 0;

  switch (status) {
    case "Pending":
      currentStep = 0;
      break;

    case "Processing":
      currentStep = 1;
      break;

    case "Shipped":
      currentStep = 2;
      break;

    case "Out For Delivery":
      currentStep = 3;
      break;

    case "Delivered":
    case "Completed":
      currentStep = 4;
      break;

    case "Cancelled":
      currentStep = -1;
      break;

    default:
      currentStep = 0;
  }

  if (!order) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold">Loading Order...</h2>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-3xl font-bold">Order Tracking</h2>

      {status === "Cancelled" && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-100 p-4 text-center font-semibold text-red-700">
          ❌ This Order has been Cancelled.
        </div>
      )}

      <div className="mb-8 rounded-2xl bg-slate-100 p-6">
        <p>
          <strong>Order ID:</strong> #{order.id}
        </p>

        <p>
          <strong>Customer:</strong> {order.customerName}
        </p>

        <p>
          <strong>Email:</strong> {order.email}
        </p>

        <p>
          <strong>Phone:</strong> {order.phone}
        </p>

        <p>
          <strong>Address:</strong> {order.address}
        </p>

        <p>
          <strong>Products:</strong> {order.products}
        </p>

        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>

        <p>
          <strong>Total Amount:</strong> ₹{order.amount}
        </p>

        <p>
          <strong>Payment:</strong> {order.paymentMethod}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <p>
          <strong>Tracking ID:</strong> {order.trackingId}
        </p>

        <p>
          <strong>Order Date:</strong> {order.orderDate}
        </p>
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex flex-1 flex-col items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  currentStep !== -1 && index < currentStep
                    ? "bg-green-500"
                    : "bg-slate-200"
                }`}
              >
                <Icon size={22} />
              </div>

              <p
                className={`mt-3 text-center text-sm font-medium ${
                  currentStep !== -1 && index <= currentStep
                    ? "text-green-600"
                    : "text-slate-500"
                }`}
              >
                {step.title}
              </p>

              {index !== steps.length - 1 && (
                <div
                  className={`mt-4 h-1 w-full ${
                    index < currentStep ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;
