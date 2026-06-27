// src/components/Checkout.jsx
import { addOrder } from "../services/orderService";
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
    paymentMethod: "cod",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    setCartItems(cart);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const order = {
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        products: cartItems.map((item) => item.name).join(", "),
        quantity: cartItems.reduce(
          (sum, item) => sum + Number(item.quantity),
          0,
        ),
        amount: total,
        paymentMethod:
          formData.paymentMethod === "cod"
            ? "COD"
            : formData.paymentMethod.toUpperCase(),
        trackingId: "TRK" + Math.floor(100000 + Math.random() * 900000),
        status: "Pending",
        orderDate: new Date().toLocaleDateString("en-GB"),
      };

      await addOrder(order);

      localStorage.removeItem("cartItems");

      alert("Order Placed Successfully!");

      navigate("/order-success");
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to place order!");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

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
          {/* Shipping */}
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
                  rows="4"
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
                required
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="h-12 rounded-xl border border-slate-200 px-4"
              />

              <input
                type="text"
                name="state"
                required
                placeholder="State"
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
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                />
                Credit / Debit Card
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                />
                UPI Payment
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

                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
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
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white"
          >
            <CreditCard size={20} />
            Place Order
          </button>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={16} />
            Secure Checkout
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
