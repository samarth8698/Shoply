import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import {
  getWishlist,
  deleteWishlist,
} from "../services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteWishlist(id);
      loadWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  const moveToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.productId,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.productId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert(`${product.name} moved to cart`);
  };

    return (
    <section className="animate__animated animate__fadeIn py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          My Wishlist
        </h1>

        <p className="mt-3 text-slate-500">
          Your favourite products in one place.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
          <Heart className="mx-auto mb-4 text-red-500" size={70} />
          <h2 className="text-3xl font-bold">Wishlist is Empty</h2>
          <p className="mt-2 text-slate-500">
            Add products to your wishlist.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl"
            >
              <div className="h-72 overflow-hidden bg-white">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-violet-600">
                  {product.description}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {product.name}
                </h2>

                <p className="mt-4 text-2xl font-bold text-slate-900">
                  ₹{product.price}
                </p>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => moveToCart(product)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 font-medium text-white"
                  >
                    <ShoppingCart size={18} />
                    Move To Cart
                  </button>

                  <button
                    onClick={() => handleRemove(product.id)}
                    className="rounded-xl bg-red-500 p-3 text-white"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

          </section>
  );
};

export default Wishlist;