import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    updateCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingCart size={80} className="mb-4 text-slate-300" />

        <h2 className="mb-2 text-3xl font-bold text-slate-800">
          Your Cart is Empty
        </h2>

        <p className="text-slate-500">
          Add some amazing products to get started.
        </p>
      </div>
    );
  }

  return (
    <section className="animate__animated animate__fadeIn py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Shopping Cart</h1>

        <p className="mt-2 text-slate-500">Review your selected products.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center"
            >
              <div className="h-28 w-full overflow-hidden rounded-2xl bg-slate-100 md:w-28">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>

                <p className="mt-3 text-2xl font-bold text-violet-600">
                  ₹{item.price}
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-[30px] text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="rounded-lg bg-slate-100 p-2 hover:bg-slate-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="mb-4 flex justify-between">
            <span className="text-slate-600">Total Items</span>

            <span className="font-semibold">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>

          <div className="mb-4 flex justify-between">
            <span className="text-slate-600">Shipping</span>

            <span className="font-semibold text-green-600">Free</span>
          </div>

          <hr className="my-5" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-violet-600">₹{totalPrice}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
          >
            Proceed To Checkout
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
