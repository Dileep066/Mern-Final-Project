import { useState } from "react";
import { createProduct, updateProduct } from "../product.service";

const initialState = {
  product_name: "",
  price: "",
  description: "",
};

export default function ProductForm({ selectedProduct, setSelectedProduct, onSaved }) {
  const [formData, setFormData] = useState(() => ({
    product_name: selectedProduct?.product_name ?? "",
    price: selectedProduct?.price ?? "",
    description: selectedProduct?.description ?? "",
  }));

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct._id, payload);
      } else {
        await createProduct(payload);
      }

      await onSaved();
      setFormData(initialState);
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    setFormData(initialState);
    setSelectedProduct(null);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Product name</label>
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-lg border border-slate-300 p-2 outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          {selectedProduct ? "Update" : "Create"}
        </button>
        {selectedProduct && (
          <button type="button" onClick={handleCancel} className="rounded-lg bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}