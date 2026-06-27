// src/components/NewArrivals.jsx

import { Star, ShoppingCart, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "animate.css";

const newProducts = [
  {
    id: 1,
    name: "Premium Smart Watch",
    category: "Wearables",
    price: 4999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Wireless Earbuds Pro",
    category: "Audio",
    price: 2999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Gaming Mechanical Keyboard",
    category: "Accessories",
    price: 2499,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Ultra HD Monitor",
    category: "Electronics",
    price: 14999,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Premium Sneakers",
    category: "Fashion",
    price: 3499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Leather Backpack",
    category: "Fashion",
    price: 1999,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop",
  },
];

const NewArrivals = () => {
const handleAddToCart = (product) => {
const cart =
JSON.parse(localStorage.getItem("cart")) || [];


const existingItem = cart.find(
  (item) => item.id === product.id
);

if (existingItem) {
  existingItem.quantity += 1;
} else {
  cart.push({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
    rating: product.rating,
    quantity: 1,
  });
}

localStorage.setItem(
  "cart",
  JSON.stringify(cart)
);

alert(`${product.name} added to cart!`);

};

const handleWishlist = (product) => {
console.log("Wishlist:", product);
};


  return (
    <section className="animate__animated animate__fadeIn py-8">
      {/* Header */}
      <div className="mb-10 rounded-[32px] bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white md:p-12">
        <div className="flex items-center gap-3">
          <Sparkles size={28} />
          <span className="text-lg font-semibold">
            Latest Collection
          </span>
        </div>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          New Arrivals
        </h1>

        <p className="mt-4 max-w-2xl text-violet-100">
          Discover our newest products carefully selected to
          elevate your shopping experience.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newProducts.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Product Image */}
            <div className="relative h-72 overflow-hidden bg-slate-100">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white">
                NEW
              </span>

              <button
                onClick={() => handleWishlist(product)}
                className="absolute right-4 top-4 z-10 rounded-xl bg-white p-2 shadow-md"
              >
                <Heart size={18} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-6">
              <p className="text-sm font-medium text-violet-600">
                {product.category}
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {product.name}
              </h3>

              <div className="mt-3 flex items-center gap-2">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-sm font-medium text-slate-600">
                  {product.rating}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900">
                  ₹{product.price}
                </span>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 font-medium text-white transition hover:scale-105"
                >
                  <ShoppingCart size={18} />
                  Add
                </button>
              </div>

              <Link
                to={`/product/${product.id}`}
                className="mt-4 block text-center font-medium text-violet-600 hover:text-violet-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;