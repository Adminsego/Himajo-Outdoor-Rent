import { useEffect, useState } from "react";

type FeaturedItem = {
  id: number;
  title: string;
  description?: string | null;
  image_url?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  is_active: boolean;
  display_order: number;
};

const empty: FeaturedItem = {
  id: 0,
  title: "",
  description: "",
  image_url: "",
  button_text: "",
  button_link: "",
  is_active: true,
  display_order: 0,
};

export default function AdminFeatured() {
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FeaturedItem>(empty);
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
      const res = await fetch("/api/admin/featured", { headers });
      if (!res.ok) throw new Error("Gagal memuat featured");
      setItems(await res.json());
    } catch (err: any) {
      setError(err?.message || "Gagal memuat featured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    const isEdit = editing.id !== 0;
    const url = isEdit ? `/api/admin/featured/${editing.id}` : "/api/admin/featured";
    const method = isEdit ? "PUT" : "POST";
    const body = {
      title: editing.title,
      description: editing.description,
      image_url: editing.image_url,
      button_text: editing.button_text,
      button_link: editing.button_link,
      is_active: editing.is_active,
      display_order: editing.display_order,
    };
    await fetch(url, { method, headers, body: JSON.stringify(body) });
    setEditing(empty);
    await load();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus featured?")) return;
    await fetch(`/api/admin/featured/${id}`, { method: "DELETE", headers });
    await load();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Featured</h1>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => setEditing({ ...empty })}>
          Item baru
        </button>
      </div>

      {editing && (
        <div className="bg-white border rounded p-4 space-y-3">
          <Input label="Judul" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <label className="text-sm block">
            Deskripsi
            <textarea
              className="w-full border rounded px-3 py-2 mt-1"
              rows={3}
              value={editing.description ?? ""}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </label>
          <Input
            label="Gambar URL"
            value={editing.image_url ?? ""}
            onChange={(v) => setEditing({ ...editing, image_url: v })}
          />
          <div className="grid md:grid-cols-2 gap-3">
            <Input
              label="Button Text"
              value={editing.button_text ?? ""}
              onChange={(v) => setEditing({ ...editing, button_text: v })}
            />
            <Input
              label="Button Link"
              value={editing.button_link ?? ""}
              onChange={(v) => setEditing({ ...editing, button_link: v })}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Input
              label="Urutan"
              type="number"
              value={editing.display_order}
              onChange={(v) => setEditing({ ...editing, display_order: Number(v) })}
            />
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.is_active}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              />
              Aktif
            </label>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={save}>
              Simpan
            </button>
            <button className="px-3 py-2 border rounded" onClick={() => setEditing(empty)}>
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-3 py-2">Judul</th>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-left px-3 py-2">Urutan</th>
              <th className="text-left px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-3 py-2">{f.title}</td>
                <td className="px-3 py-2">{f.is_active ? "Aktif" : "Nonaktif"}</td>
                <td className="px-3 py-2">{f.display_order}</td>
                <td className="px-3 py-2 space-x-2">
                  <button className="text-indigo-600 hover:underline" onClick={() => setEditing(f)}>
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => remove(f.id)}>
                    Hapus
                  </button>
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
