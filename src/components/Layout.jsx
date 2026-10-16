// src/components/Layout.jsx
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Globe,
  Mail,
  Phone,
  Package,
  Truck,
  Lock,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const [cartCount, setCartCount] = useState(0);

  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      const count = cartItems.reduce((total, item) => total + item.quantity, 0);

      setCartCount(count);
    };

    // Initial Load
    updateCartCount();

    // Other Browser Tabs
    window.addEventListener("storage", updateCartCount);

    // Same Tab Updates
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);

    window.location.href = "/login";
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    console.log("Newsletter:", { email });

    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <Logo showTagline={false} />

          {/* Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              to="/"
              className="font-medium text-slate-700 hover:text-violet-600"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="font-medium text-slate-700 hover:text-violet-600"
            >
              Shop
            </Link>

            <Link
              to="/categories"
              className="font-medium text-slate-700 hover:text-violet-600"
            >
              Categories
            </Link>

            <Link
              to="/new-arrivals"
              className="font-medium text-slate-700 hover:text-violet-600"
            >
              New Arrivals
            </Link>

            <Link
              to="/contact"
              className="font-medium text-slate-700 hover:text-violet-600"
            >
              Contact
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden xl:block">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="h-12 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="hidden font-semibold text-slate-700 md:block"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 font-semibold text-white md:block"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <span className="hidden font-semibold text-green-600 md:block">
                Welcome
              </span>
            )}

            <Link to="/wishlist">
              <Heart size={20} className="transition hover:text-red-500" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart
                size={20}
                className="transition hover:text-violet-600"
              />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)}>
                <User size={20} className="transition hover:text-violet-600" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Package size={18} />
                    My Orders
                  </Link>

                  <Link
                    to="/track-order"
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-violet-50 hover:text-violet-600"
                  >
                    <Truck size={18} />
                    Track Order
                  </Link>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/change-password");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-100"
                  >
                    <Lock size={18} />
                    Change Password
                  </button>

                  <hr className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Logo />

              <p className="mt-6 text-slate-500">
                Shop premium products with a modern ecommerce experience built
                for performance, trust, and convenience.
              </p>

              <div className="mt-8 flex gap-3">
                <button className="rounded-xl border border-slate-200 p-3">
                  <Globe size={18} />
                </button>

                <button className="rounded-xl border border-slate-200 p-3">
                  <Mail size={18} />
                </button>

                <button className="rounded-xl border border-slate-200 p-3">
                  <Phone size={18} />
                </button>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="mb-6 text-xl font-bold text-slate-900">Shop</h3>

              <div className="space-y-4 text-slate-500">
                <p>Men</p>
                <p>Women</p>
                <p>Electronics</p>
                <p>Accessories</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-xl font-bold text-slate-900">
                Quick Links
              </h3>

              <div className="space-y-4">
                <Link to="/" className="block text-slate-500">
                  Home
                </Link>

                <Link to="/shop" className="block text-slate-500">
                  Shop
                </Link>

                <Link to="/cart" className="block text-slate-500">
                  Cart
                </Link>

                <Link to="/checkout" className="block text-slate-500">
                  Checkout
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-6 text-xl font-bold text-slate-900">
                Newsletter
              </h3>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 outline-none focus:border-violet-500"
                />

                <button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
            © 2026 Shoply. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
