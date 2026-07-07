import { useState } from "react";
import { createOrder, updateOrder } from "../order.service";

const emptyLineItem = {
  product: "",
  quantity: 1,
};

const initialState = {
  user: "",
  products: [emptyLineItem],
};

export default function OrderForm({ selectedOrder, setSelectedOrder, onSaved, users, products }) {
  const [formData, setFormData] = useState(() => ({
    user: selectedOrder?.user?._id ?? selectedOrder?.user ?? "",
    products: selectedOrder?.products?.length
      ? selectedOrder.products.map((item) => ({
          product: item.product?._id ?? item.product ?? "",
          quantity: item.quantity ?? 1,
        }))
      : [emptyLineItem],
  }));

  function handleUserChange(e) {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      user: value,
    }));
  }

  function handleLineChange(index, field, value) {
    setFormData((prevData) => ({
      ...prevData,
      products: prevData.products.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: field === "quantity" ? Number(value) : value,
            }
          : item,
      ),
    }));
  }

  function addLineItem() {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, emptyLineItem],
    }));
  }

  function removeLineItem(index) {
    setFormData((prevData) => ({
      ...prevData,
      products:
        prevData.products.length === 1
          ? [emptyLineItem]
          : prevData.products.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        user: formData.user,
        products: formData.products
          .filter((item) => item.product)
          .map((item) => ({
            product: item.product,
            quantity: Number(item.quantity),
          })),
      };

      if (selectedOrder) {
        await updateOrder(selectedOrder._id, payload);
      } else {
        await createOrder(payload);
      }

      await onSaved();
      setSelectedOrder(null);
      setFormData(initialState);
    } catch (error) {
      console.error(error);
    }
  }

  function handleCancel() {
    setSelectedOrder(null);
    setFormData(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-5 rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold text-slate-700">User</label>
        <select
          value={formData.user}
          onChange={handleUserChange}
          className="w-full rounded-lg border border-slate-300 p-2 outline-none transition focus:border-blue-500"
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">Products</label>
          <button type="button" onClick={addLineItem} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white transition hover:bg-slate-700">
            Add item
          </button>
        </div>

        {formData.products.map((item, index) => (
          <div key={`${index}-${item.product}`} className="rounded-lg border border-slate-200 p-3">
            <div className="grid gap-3 md:grid-cols-[1fr_120px_auto]">
              <select
                value={item.product}
                onChange={(e) => handleLineChange(index, "product", e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 outline-none transition focus:border-blue-500"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.product_name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleLineChange(index, "quantity", e.target.value)}
                className="w-full rounded-lg border border-slate-300 p-2 outline-none transition focus:border-blue-500"
              />

              <button
                type="button"
                onClick={() => removeLineItem(index)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          {selectedOrder ? "Update" : "Create"}
        </button>
        {selectedOrder && (
          <button type="button" onClick={handleCancel} className="rounded-lg bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}