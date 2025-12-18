import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/faqs", label: "FAQ" },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-200 p-4 space-y-4">
        <div className="text-lg font-semibold text-indigo-600">Admin Panel</div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-3 py-2 rounded-md text-sm ${
                  active ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 border-t text-sm text-gray-600">
          <div className="font-medium">{admin?.username ?? "Admin"}</div>
          <button
            className="mt-2 text-red-600 hover:underline"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
