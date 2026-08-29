"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminShell from "../../components/AdminShell";
import { cmsFetch, ImageField, NumberField, TextField } from "../../components/AdminFields";
import type { Category, Product } from "@/lib/cms/types";

const emptyProduct = (): Omit<Product, "_id" | "createdAt" | "updatedAt"> => ({
  name: "",
  categorySlug: "",
  image: "",
  description: "",
  sortOrder: 0,
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyProduct());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const [productData, categoryData] = await Promise.all([
      cmsFetch<Product[]>("/api/cms/products"),
      cmsFetch<Category[]>("/api/cms/categories"),
    ]);
    setProducts(productData);
    setCategories(categoryData);
    if (!form.categorySlug && categoryData[0]) {
      setForm((current) => ({ ...current, categorySlug: categoryData[0].slug }));
    }
    setLoading(false);
  }

  useEffect(() => {
    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setForm({ ...emptyProduct(), categorySlug: categories[0]?.slug ?? "" });
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await cmsFetch(`/api/cms/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Product updated");
      } else {
        await cmsFetch("/api/cms/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMessage("Product created");
      }
      resetForm();
      await loadData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    await cmsFetch(`/api/cms/products/${id}`, { method: "DELETE" });
    await loadData();
  }

  function startEdit(product: Product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      categorySlug: product.categorySlug,
      image: product.image,
      description: product.description,
      sortOrder: product.sortOrder,
    });
  }

  const filteredProducts = products.filter((product) =>
    filter ? product.categorySlug === filter : true,
  );

  return (
    <AdminShell>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={handleSubmit} className="grid gap-4 border border-black/10 bg-white p-6">
          <h2 className="m-0 text-xl font-light uppercase">{editingId ? "Edit product" : "New product"}</h2>
          <TextField label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <label className="grid gap-2 text-sm">
            <span className="font-medium text-black/70">Category</span>
            <select
              value={form.categorySlug}
              onChange={(event) => setForm({ ...form, categorySlug: event.target.value })}
              className="h-10 border border-black/15 px-3 text-sm"
            >
              {categories.map((category) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <ImageField label="Product image" value={form.image} onChange={(value) => setForm({ ...form, image: value })} />
          <TextField label="Description" value={form.description} onChange={(value) => setForm({ ...form, description: value })} multiline />
          <NumberField label="Sort order" value={form.sortOrder} onChange={(value) => setForm({ ...form, sortOrder: value })} />
          <div className="flex gap-3">
            <button type="submit" className="h-10 bg-black px-5 text-xs font-bold text-white uppercase">
              {editingId ? "Update" : "Create"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="h-10 border border-black px-5 text-xs font-bold uppercase">
                Cancel
              </button>
            ) : null}
          </div>
          {message ? <p className="m-0 text-sm text-black/70">{message}</p> : null}
        </form>

        <section className="border border-black/10 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="m-0 text-xl font-light uppercase">All products</h2>
            <select value={filter} onChange={(event) => setFilter(event.target.value)} className="h-9 border border-black/15 px-3 text-xs">
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
          <div className="mt-4 grid max-h-[70vh] gap-4 overflow-y-auto pr-1">
            {filteredProducts.map((product) => (
              <article key={product._id} className="grid grid-cols-[72px_1fr_auto] gap-4 border border-black/10 p-4">
                <div className="relative h-16 w-16 bg-[#f7f7f7]">
                  <Image src={product.image} alt="" fill className="object-contain p-1" sizes="64px" />
                </div>
                <div>
                  <h3 className="m-0 text-sm font-semibold">{product.name}</h3>
                  <p className="m-0 mt-1 text-xs text-black/50">{product.categorySlug}</p>
                  <p className="m-0 mt-2 text-xs text-black/60">{product.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button type="button" onClick={() => startEdit(product)} className="text-xs font-bold uppercase">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(product._id)} className="text-xs text-red-600 uppercase">
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
