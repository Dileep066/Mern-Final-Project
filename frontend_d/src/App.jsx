import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-white/10 bg-slate-900/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 text-sm font-semibold">
            <Link className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" to="/users">
              Users
            </Link>
            <Link className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" to="/products">
              Products
            </Link>
            <Link className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" to="/orders">
              Orders
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}