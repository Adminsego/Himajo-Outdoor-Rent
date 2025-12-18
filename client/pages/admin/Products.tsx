import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  slug: string;
  price_idr: number;
  category?: string;
  quantity?: number;
  is_best_seller?: boolean;
  image?: string | null;
};

const blank: Product = {
  id: 0,
  name: "",
  slug: "",
  price_idr: 0,
  category: "",
  quantity: 0,
  is_best_seller: false,
  image: "",
};

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product>(blank);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("admin_token");

  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/products", { headers });
      if (!res.ok) throw new Error("Gagal memuat produk");
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      setError(err?.message || "Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    try {
      setError(null);
      const isEdit = editing.id !== 0;
      const url = isEdit ? `/api/admin/products/${editing.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";
      const body = {
        name: editing.name,
        price_idr: editing.price_idr,
        category: editing.category,
        is_best_seller: editing.is_best_seller,
        quantity: editing.quantity,
        image: editing.image,
      };
      const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Simpan gagal");
      setEditing(blank);
      await load();
    } catch (err: any) {
      setError(err?.message || "Simpan gagal");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus produk?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE", headers });
    await load();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <button
          className="px-3 py-2 bg-indigo-600 text-white rounded"
          onClick={() => setEditing({ ...blank })}
        >
          Produk baru
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="bg-white border rounded p-4 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <Input label="Nama" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v })} />
            <Input
              label="Harga (IDR)"
              type="number"
              value={editing.price_idr}
              onChange={(v) => setEditing({ ...editing, price_idr: Number(v) })}
            />
            <Input
              label="Kategori"
              value={editing.category ?? ""}
              onChange={(v) => setEditing({ ...editing, category: v })}
            />
            <Input
              label="Stok"
              type="number"
              value={editing.quantity ?? 0}
              onChange={(v) => setEditing({ ...editing, quantity: Number(v) })}
            />
            <Input
              label="Gambar URL"
              value={editing.image ?? ""}
              onChange={(v) => setEditing({ ...editing, image: v })}
            />
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!editing.is_best_seller}
                onChange={(e) => setEditing({ ...editing, is_best_seller: e.target.checked })}
              />
              Best seller
            </label>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={submit}>
              Simpan
            </button>
            <button className="px-3 py-2 border rounded" onClick={() => setEditing(blank)}>
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="bg-white border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2">Nama</th>
              <th className="text-left px-3 py-2">Kategori</th>
              <th className="text-left px-3 py-2">Harga</th>
              <th className="text-left px-3 py-2">Stok</th>
              <th className="text-left px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.slug}</div>
                </td>
                <td className="px-3 py-2">{p.category || "-"}</td>
                <td className="px-3 py-2">{p.price_idr.toLocaleString("id-ID")}</td>
                <td className="px-3 py-2">{p.quantity ?? 0}</td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setEditing(p)}
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => remove(p.id)}>
                    Hapus
                  </button>
                  <Link className="text-gray-600 hover:underline" to={`/products/${p.slug}`}>
                    Lihat
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: any;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-sm block">
      {label}
      <input
        className="w-full border rounded px-3 py-2 mt-1"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
