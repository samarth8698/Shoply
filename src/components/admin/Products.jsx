import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X, Eye, Search } from "lucide-react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    quantity: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      quantity: "",
    });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = async () => {
    try {
      await addProduct({
        ...productForm,
        price: Number(productForm.price),
        quantity: Number(productForm.quantity),
      });

      loadProducts();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(editingProduct, {
        ...productForm,
        price: Number(productForm.price),
        quantity: Number(productForm.quantity),
      });

      loadProducts();
      resetForm();
      setEditingProduct(null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setProductForm(product);
    setShowModal(true);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500">
            Manage Store Products
          </p>
        </div>

        <button
          onClick={()=>{
            resetForm();
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-xl hover:bg-violet-700"
        >
          <Plus size={18}/>
          Add Product
        </button>

      </div>

            {/* Search */}

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-violet-600"
          />
        </div>
      </div>

      {/* Products Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left">Image</th>

                <th className="px-6 py-4 text-left">Name</th>

                <th className="px-6 py-4 text-left">Description</th>

                <th className="px-6 py-4 text-left">Price</th>

                <th className="px-6 py-4 text-left">Quantity</th>

                <th className="px-6 py-4 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product)=>(

                <tr
                  key={product.id}
                  className="border-t"
                >

                  <td className="px-6 py-4">

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-6 py-4 font-semibold">

                    {product.name}

                  </td>

                  <td className="px-6 py-4">

                    {product.description}

                  </td>

                  <td className="px-6 py-4">

                    ₹{product.price}

                  </td>

                  <td className="px-6 py-4">

                    {product.quantity}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => handleView(product)}
                        className="border rounded-lg p-2 hover:bg-gray-100"
                      >
                        <Eye size={18}/>
                      </button>

                      <button
                        onClick={() => handleEdit(product)}
                        className="border rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={18}/>
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="border rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18}/>
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

            {/* Add / Edit Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-lg p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                  resetForm();
                }}
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productForm.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={productForm.description}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={productForm.price}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={productForm.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={productForm.quantity}
                onChange={handleChange}
                className="w-full border rounded-xl p-3"
              />

              <button
                onClick={
                  editingProduct
                    ? handleUpdateProduct
                    : handleAddProduct
                }
                className="w-full bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* View Modal */}

      {showViewModal && selectedProduct && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-md p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                Product Details
              </h2>

              <button
                onClick={() => setShowViewModal(false)}
              >
                <X size={22}/>
              </button>

            </div>

            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="w-full h-52 object-cover rounded-xl mb-5"
            />

            <p><strong>Name :</strong> {selectedProduct.name}</p>

            <p><strong>Description :</strong> {selectedProduct.description}</p>

            <p><strong>Price :</strong> ₹{selectedProduct.price}</p>

            <p><strong>Quantity :</strong> {selectedProduct.quantity}</p>

          </div>

        </div>

      )}

    </div>
  );
};

export default Products;