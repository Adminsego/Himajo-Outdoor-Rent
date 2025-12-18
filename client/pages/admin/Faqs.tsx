import { useEffect, useState } from "react";

type Faq = { id: number; question: string; answer: string };

const empty: Faq = { id: 0, question: "", answer: "" };

export default function AdminFaqs() {
  const [items, setItems] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Faq>(empty);
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
      const res = await fetch("/api/admin/faqs", { headers });
      if (!res.ok) throw new Error("Gagal memuat FAQ");
      setItems(await res.json());
    } catch (err: any) {
      setError(err?.message || "Gagal memuat FAQ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async () => {
    if (!editing.question || !editing.answer) {
      setError("Pertanyaan dan jawaban wajib diisi");
      return;
    }
    const isEdit = editing.id !== 0;
    const url = isEdit ? `/api/admin/faqs/${editing.id}` : "/api/admin/faqs";
    const method = isEdit ? "PUT" : "POST";
    await fetch(url, { method, headers, body: JSON.stringify(editing) });
    setEditing(empty);
    await load();
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus FAQ?")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE", headers });
    await load();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">FAQ</h1>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => setEditing({ ...empty })}>
          FAQ baru
        </button>
      </div>

      {editing && (
        <div className="bg-white border rounded p-4 space-y-3">
          <Input
            label="Pertanyaan"
            value={editing.question}
            onChange={(v) => setEditing({ ...editing, question: v })}
          />
          <label className="text-sm block">
            Jawaban
            <textarea
              className="w-full border rounded px-3 py-2 mt-1"
              rows={3}
              value={editing.answer}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
            />
          </label>
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
              <th className="text-left px-3 py-2">Pertanyaan</th>
              <th className="text-left px-3 py-2">Jawaban</th>
              <th className="text-left px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="px-3 py-2">{f.question}</td>
                <td className="px-3 py-2">{f.answer}</td>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-sm block">
      {label}
      <input
        className="w-full border rounded px-3 py-2 mt-1"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
