import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import OrderForm from "../components/OrderForm";
import { deleteOrder, getOrderById, getOrders } from "../order.service";
import { getProducts } from "../product.service";
import { getUsers } from "../user.service";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function loadOrders() {
    try {
      const response = await getOrders();
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadUsers() {
    try {
      const response = await getUsers();
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

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
      await deleteOrder(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(id) {
    try {
      const response = await getOrderById(id);
      setSelectedOrder(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    void (async () => {
      await Promise.all([loadOrders(), loadUsers(), loadProducts()]);
    })();
  }, []);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-gray-100 p-6 shadow-md">
        <h1 className="mb-5 text-center text-xl font-bold underline">Orders List</h1>

        <OrderForm
          key={selectedOrder?._id ?? "new"}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          onSaved={loadOrders}
          users={users}
          products={products}
        />

        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order._id}
              data={order}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}