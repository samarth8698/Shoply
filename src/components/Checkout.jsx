import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
  ShieldCheck,
} from "lucide-react";
import "animate.css";

import {
  createOrder,
  verifyPayment,
  savePayment,
} from "../services/paymentService";

import { addOrder } from "../services/orderService";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod", // cod | online
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ----------------------------
  // Load Razorpay Script
  // ----------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // ----------------------------
  // Razorpay Payment
  // ----------------------------
  const handlePayment = async (order) => {
    try {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        alert("Unable to load Razorpay.");
        return;
      }

      const razorpayOrder = await createOrder(500);

      const options = {
        key: "rzp_test_TE9OzmTZDzBCAD",

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        order_id: razorpayOrder.id,

        name: "Shoply",

        description: "Shoply Online Payment",

        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },

        theme: {
          color: "#7C3AED",
        },

        handler: async function (response) {
          try {
            const verified = await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (!verified) {
              alert("Payment Verification Failed");
              return;
            }

            await savePayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              amount: total,
              currency: "INR",
              status: "SUCCESS",
            });

            await addOrder(order);

            localStorage.removeItem("cartItems");

            alert("Payment Successful");

            navigate("/order-success");
          } catch (err) {
            console.error(err);
            alert("Payment Failed");
          }
        },

        modal: {
          ondismiss: () => {
            console.log("Payment Cancelled");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", (response) => {
        console.log("FULL RESPONSE", response);
        console.log("ERROR", response.error);
        console.log("METADATA", response.error.metadata);

        alert(response.error.description);
      });

      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment Failed");
    }
  };

  // ----------------------------
  // Place Order
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      products: cartItems.map((item) => item.name).join(", "),
      quantity: cartItems.reduce((sum, item) => sum + Number(item.quantity), 0),
      amount: total,
      paymentMethod: formData.paymentMethod === "cod" ? "COD" : "ONLINE",
      trackingId: "TRK" + Math.floor(100000 + Math.random() * 900000),
      status: "Pending",
      orderDate: new Date().toISOString(),
    };

    try {
      if (formData.paymentMethod === "cod") {
        await addOrder(order);

        localStorage.removeItem("cartItems");

        navigate("/order-success");

        setTimeout(() => {
          alert("Payment Successful");
        }, 300);

        return;
      }

      await handlePayment(order);
    } catch (err) {
      console.error(err);
      alert("Order Failed");
    }
  };

  return (
    <section className="animate__animated animate__fadeIn py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          Checkout
        </h1>

        <p className="mt-3 text-slate-500">
          Complete your order securely with Shoply.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-[2fr_1fr]"
      >
        {/* Left Side */}

        <div className="space-y-8">
          {/* Shipping Information */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="mb-6 text-2xl font-bold">Shipping Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 px-4"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">Address</label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-5 text-slate-400"
                />

                <textarea
                  rows={4}
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 pl-11 pr-4 pt-4"
                />
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                className="h-12 rounded-xl border border-slate-200 px-4"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                required
                value={formData.state}
                onChange={handleChange}
                className="h-12 rounded-xl border border-slate-200 px-4"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="mb-6 text-2xl font-bold">Payment Method</h2>

            <div className="space-y-4">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Cash On Delivery
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === "online"}
                  onChange={handleChange}
                />
                Online Payment (Razorpay)
              </label>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <h4 className="font-semibold">{item.name}</h4>

                  <p className="text-sm text-slate-500">
                    Qty : {item.quantity}
                  </p>
                </div>

                <span>₹{Number(item.price) * Number(item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t pt-4">
            <div className="mb-2 flex justify-between">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <div className="mb-2 flex justify-between">
              <span>Shipping</span>

              <span className="text-green-600">Free</span>
            </div>

            <div className="mt-4 flex justify-between text-xl font-bold">
              <span>Total</span>

              <span>₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white hover:opacity-90"
          >
            <CreditCard size={20} />

            {formData.paymentMethod === "cod" ? "Place Order" : "Pay Now"}
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={16} />
            100% Secure Checkout
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
