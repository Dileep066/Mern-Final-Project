import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { deleteProduct, getProductById, getProducts } from "../product.service";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function loadProducts() {
    try {
      const response = await getProducts();
      setProducts(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    if (!id) return;

    try {
      await deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(id) {
    try {
      const response = await getProductById(id);
      setSelectedProduct(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void (async () => {
      await loadProducts();
    })();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-gray-100 p-6 shadow-md">
        <h1 className="mb-5 text-center text-xl font-bold underline">Products List</h1>

        <ProductForm
          key={selectedProduct?._id ?? "new"}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onSaved={loadProducts}
        />

        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              data={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}