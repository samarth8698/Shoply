// src/components/Home.jsx
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import "animate.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
      });

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    alert("Product Added To Cart");
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="animate__animated animate__fadeIn overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white md:p-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
            <ShoppingBag size={16} />
            Premium Ecommerce Experience
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-7xl">
            Discover Premium Products For Everyday Life
          </h1>

          <p className="mt-6 text-lg text-violet-100 md:text-xl">
            Shop the latest trends in fashion, electronics, accessories, and
            lifestyle products only on Shoply.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-violet-700 transition hover:scale-105"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/categories"
              className="rounded-2xl border border-white/30 px-6 py-4 font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <Truck className="mb-4 text-violet-600" size={40} />
          <h3 className="text-xl font-bold text-slate-900">Free Shipping</h3>
          <p className="mt-2 text-slate-500">
            Free delivery on all orders above ₹999.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <ShieldCheck className="mb-4 text-violet-600" size={40} />
          <h3 className="text-xl font-bold text-slate-900">Secure Payment</h3>
          <p className="mt-2 text-slate-500">
            100% secure payment gateway protection.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <Headphones className="mb-4 text-violet-600" size={40} />
          <h3 className="text-xl font-bold text-slate-900">24/7 Support</h3>
          <p className="mt-2 text-slate-500">
            Dedicated customer support anytime.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Products
            </h2>

            <p className="mt-2 text-slate-500">
              Best-selling products chosen for you.
            </p>
          </div>

          <Link to="/shop" className="font-semibold text-violet-600">
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden bg-white">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="p-5">
                <div className="mb-3 flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <h3 className="font-bold text-slate-900">{product.name}</h3>

                <p className="mt-2 text-xl font-bold text-violet-600">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-[32px] bg-slate-900 p-10 text-center text-white">
        <h2 className="text-3xl font-bold md:text-5xl">
          Join The Shoply Community
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Get exclusive offers, early access to new arrivals, and premium
          shopping benefits.
        </p>

        <Link
          to="/signup"
          className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 font-semibold text-white"
        >
          Create Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
