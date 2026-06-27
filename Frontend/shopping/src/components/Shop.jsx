import { Heart, ShoppingCart, Star } from "lucide-react";
import "animate.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import {
  getWishlist,
  addWishlist,
  deleteWishlist,
} from "../services/wishlistService";

const Shop = () => {
  const [products, setProducts] = useState([]);

 const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
  loadProducts();
  loadWishlist();
}, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWishlist = async () => {
  try {
    const data = await getWishlist();
    setWishlist(data);
  } catch (error) {
    console.error(error);
  }
};

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert(`${product.name} added to cart`);
  };

  const handleWishlist = async (product) => {
  try {
    const existingItem = wishlist.find(
      (item) => item.productId === product.id,
    );

    if (existingItem) {
      await deleteWishlist(existingItem.id);
    } else {
      await addWishlist({
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }

    loadWishlist();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="animate__animated animate__fadeIn py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          Shop Collection
        </h1>

        <p className="mt-3 text-slate-500">
          Discover premium products curated for you.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block"
          >
            <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-80 overflow-hidden bg-white">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleWishlist(product);
                  }}
                  className="absolute right-4 top-4 z-10 rounded-xl bg-white p-2 shadow-md"
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.some((item) => item.productId === product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-slate-700"
                    }
                  />
                </button>

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-sm font-medium text-violet-600">
                  {product.description}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />

                  <span className="text-sm font-medium text-slate-600">
                    Stock: {product.quantity}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{product.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 font-medium text-white transition hover:scale-105"
                  >
                    <ShoppingCart size={18} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Shop;
