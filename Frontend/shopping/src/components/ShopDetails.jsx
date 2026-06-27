// src/components/ShopDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import "animate.css";

const ShopDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
      setSelectedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold text-violet-600">
        Loading Product...
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart = [];

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    alert("Product Added To Cart");
  };

  const handleWishlist = () => {
    console.log(product);
    alert("Wishlist feature coming soon ❤️");
  };

  return (
    <section className="animate__animated animate__fadeIn py-10">
      <div className="grid gap-12 lg:grid-cols-2">

        {/* Left Side */}
        <div>
          <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-[500px] w-full object-cover"
            />
          </div>

          <div className="mt-5">
            <img
              src={product.imageUrl}
              alt={product.name}
              onClick={() => setSelectedImage(product.imageUrl)}
              className={`h-24 w-24 cursor-pointer rounded-xl border-2 object-cover ${
                selectedImage === product.imageUrl
                  ? "border-violet-600"
                  : "border-slate-200"
              }`}
            />
          </div>
        </div>

        {/* Right Side */}
        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            {product.name}
          </h1>

          <div className="mt-4">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              In Stock : {product.quantity}
            </span>
          </div>

          <h2 className="mt-6 text-5xl font-bold text-violet-600">
            ₹{Number(product.price).toLocaleString()}
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            {product.description}
          </p>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold">
              Quantity
            </h3>

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="rounded-xl border p-3 hover:bg-slate-100"
              >
                <Minus size={18} />
              </button>

              <span className="text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) => prev + 1)
                }
                className="rounded-xl border p-3 hover:bg-slate-100"
              >
                <Plus size={18} />
              </button>

            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              <ShoppingCart size={20} />
              Add To Cart
            </button>

            <button
              onClick={handleWishlist}
              className="rounded-2xl border p-4 transition hover:border-violet-600"
            >
              <Heart size={20} />
            </button>

          </div>

          {/* Features */}
          <div className="mt-10 space-y-5 rounded-3xl border bg-white p-6 shadow">

            <div className="flex items-center gap-3">
              <Truck
                size={22}
                className="text-violet-600"
              />
              <span>Free Shipping on Orders Above ₹999</span>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={22}
                className="text-violet-600"
              />
              <span>100% Secure Payment</span>
            </div>

            <div className="flex items-center gap-3">
              <RotateCcw
                size={22}
                className="text-violet-600"
              />
              <span>7 Days Easy Return Policy</span>
            </div>

          </div>
        </div>
      </div>

            {/* Related Products */}
      <section className="mt-20">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          Related Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
                alt="Related Product"
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Related Product
                </h3>

                <p className="mt-2 text-xl font-bold text-violet-600">
                  ₹1,999
                </p>

                <button className="mt-5 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white transition hover:opacity-90">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ShopDetails;