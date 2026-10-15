import { Heart, ShoppingCart, Star } from "lucide-react";
import "animate.css";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import { toast } from "react-toastify";
import {
  getWishlist,
  addWishlist,
  deleteWishlist,
} from "../services/wishlistService";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    loadProducts();
    loadWishlist();
  }, []);

  // Load Products and Apply Category Filter
  const loadProducts = async () => {
    try {
      const response = await getProducts();
      const allProducts = response.data;

      setProducts(allProducts);

      const categoryFromURL = searchParams.get("category") || "";

      setSelectedCategory(categoryFromURL);

      if (categoryFromURL) {
        const filtered = allProducts.filter(
          (product) => product.category === categoryFromURL
        );

        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(allProducts);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    }
  };

  // Load Wishlist
  const loadWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  // Add Product to Cart
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${product.name} added to cart`);
  };

  // Add or Remove Wishlist
  const handleWishlist = async (product) => {
    try {
      const existingItem = wishlist.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        await deleteWishlist(existingItem.id);
        toast.info("Removed from Wishlist");
      } else {
        await addWishlist({
          productId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
        });

        toast.success("Added to Wishlist");
      }

      await loadWishlist();
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Unable to update wishlist");
    }
  };

  // Apply All Filters
  const applyFilters = (
    searchValue = search,
    brand = selectedBrand,
    category = selectedCategory,
    price = priceRange,
    sort = sortPrice
  ) => {
    let filtered = [...products];

    // Search Filter
    if (searchValue.trim() !== "") {
      filtered = filtered.filter((product) =>
        (product.name || "")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    // Brand Filter
    if (brand !== "") {
      filtered = filtered.filter(
        (product) => product.brand === brand
      );
    }

    // Category Filter
    if (category !== "") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    // Price Filter
    if (price === "0-1000") {
      filtered = filtered.filter(
        (product) => product.price <= 1000
      );
    } else if (price === "1000-10000") {
      filtered = filtered.filter(
        (product) =>
          product.price > 1000 && product.price <= 10000
      );
    } else if (price === "10000+") {
      filtered = filtered.filter(
        (product) => product.price > 10000
      );
    }

    // Price Sorting
    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  // Handle Price Sorting
  const handlePriceFilter = (value) => {
    setSortPrice(value);

    applyFilters(
      search,
      selectedBrand,
      selectedCategory,
      priceRange,
      value
    );
  };

  // Handle Category Change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);

    applyFilters(
      search,
      selectedBrand,
      value,
      priceRange,
      sortPrice
    );
  };

  // Clear All Filters
  const handleClearFilters = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedCategory("");
    setPriceRange("");
    setSortPrice("");

    setFilteredProducts(products);
  };

  return (
    <section className="animate__animated animate__fadeIn py-8">
      <div className="mb-10">
        {/* Search and Filters */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              setSearch(value);

              applyFilters(
                value,
                selectedBrand,
                selectedCategory,
                priceRange,
                sortPrice
              );
            }}
            className="w-full rounded-2xl border border-slate-300 px-5 py-3 focus:border-violet-600 focus:outline-none"
          />

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => {
                const value = e.target.value;

                setSelectedBrand(value);

                applyFilters(
                  search,
                  value,
                  selectedCategory,
                  priceRange,
                  sortPrice
                );
              }}
              className="rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-600 focus:outline-none"
            >
              <option value="">All Brands</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Nike">Nike</option>
              <option value="Puma">Puma</option>
              <option value="Adidas">Adidas</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) =>
                handleCategoryChange(e.target.value)
              }
              className="rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-600 focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
              <option value="Sports">Sports</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Audio">Audio</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <select
              value={priceRange}
              onChange={(e) => {
                const value = e.target.value;

                setPriceRange(value);

                applyFilters(
                  search,
                  selectedBrand,
                  selectedCategory,
                  value,
                  sortPrice
                );
              }}
              className="rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-600 focus:outline-none"
            >
              <option value="">All Prices</option>
              <option value="0-1000">₹0 - ₹1000</option>
              <option value="1000-10000">
                ₹1000 - ₹10000
              </option>
              <option value="10000+">Above ₹10000</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              value={sortPrice}
              onChange={(e) =>
                handlePriceFilter(e.target.value)
              }
              className="rounded-xl border border-slate-300 px-4 py-3 focus:border-violet-600 focus:outline-none"
            >
              <option value="">Sort By Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

            <button
              type="button"
              onClick={handleClearFilters}
              className="rounded-xl border border-violet-600 px-4 py-3 font-medium text-violet-600 transition hover:bg-violet-600 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
          {selectedCategory
            ? `${selectedCategory} Products`
            : "Shop Collection"}
        </h1>

        <p className="mt-3 text-slate-500">
          Discover premium products curated for you.
        </p>
      </div>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div className="mb-6 rounded-xl border bg-red-50 p-4 text-center text-red-600">
          No Products Found
        </div>
      )}

      {/* Product Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block"
          >
            <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Product Image */}
              <div className="relative h-80 overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                  className="absolute right-4 top-4 z-10 rounded-xl bg-white p-2 shadow-md"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.some(
                        (item) =>
                          item.productId === product.id
                      )
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

              {/* Product Details */}
              <div className="p-6">
                <p className="text-sm font-medium text-violet-600">
                  {product.description}
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
                    Stock: {product.quantity}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ₹{product.price}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
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