import AdminShell from "../components/AdminShell";
import SeedDatabaseButton from "../components/SeedDatabaseButton";
import { getCatalog } from "@/lib/cms/queries";

export default async function AdminDashboardPage() {
  const catalog = await getCatalog();

  return (
    <AdminShell>
      <div className="grid gap-6">
        <section className="border border-black/10 bg-white p-6">
          <h2 className="m-0 text-2xl font-light uppercase">Dashboard</h2>
          <p className="m-0 mt-3 max-w-2xl text-sm text-black/60">
            Manage your catalog from here. Content is saved to MongoDB. Uploaded images use Vercel Blob in production, or <code>public/uploads/</code> locally.
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Categories", value: catalog.categories.length },
            { label: "Products", value: catalog.products.length },
            { label: "Solutions", value: catalog.solutions.length },
          ].map((item) => (
            <div key={item.label} className="border border-black/10 bg-white p-5">
              <p className="m-0 text-[10px] font-bold tracking-[0.14em] text-black/40 uppercase">{item.label}</p>
              <p className="m-0 mt-3 text-3xl font-light">{item.value}</p>
            </div>
          ))}
        </div>

        <SeedDatabaseButton />
      </div>
    </AdminShell>
  );
}
