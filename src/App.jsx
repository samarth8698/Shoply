// src/App.jsx

import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";

import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";

import Payments from "./components/admin/Payments";

import OrderTracking from "./components/OrderTracking";
import MyOrders from "./components/MyOrders";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//wishList
import Wishlist from "./components/Wishlist";

// Website Layout
import Layout from "./components/Layout";

// Auth Pages
import Login from "./components/Login";
import Signup from "./components/Signup";

// Website Pages
import Home from "./components/Home";
import Shop from "./components/Shop";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ShopDetails from "./components/ShopDetails";
import OrderSuccess from "./components/OrderSuccess";

// Admin Layout
import AdminLayout from "./components/admin/AdminLayout";

// Admin Pages
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/signup" element={<Signup />} />

        {/* Website Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        />

        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />

        <Route
          path="/new-arrivals"
          element={
            <Layout>
              <NewArrivals />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />

        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />

        <Route
          path="/order-success"
          element={
            <Layout>
              <OrderSuccess />
            </Layout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <Layout>
              <ShopDetails />
            </Layout>
          }
        />

        <Route
          path="/track-order"
          element={
            <Layout>
              <OrderTracking />
            </Layout>
          }
        />

        <Route
          path="/my-orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <Layout>
              <Wishlist />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        {/* Admin Routes */}
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="payments" element={<Payments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
