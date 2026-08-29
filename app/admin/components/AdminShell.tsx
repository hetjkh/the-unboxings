"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/solutions", label: "Solutions" },
  { href: "/admin/behind-the-design", label: "Behind the Design" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/brand-stories", label: "Brand Stories" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-black">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="m-0 text-[10px] font-bold tracking-[0.18em] text-black/40 uppercase">The Unboxing CMS</p>
            <h1 className="m-0 mt-1 text-lg font-semibold">Content Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-black/60 no-underline hover:text-black">
              View site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="h-9 border border-black px-4 text-xs font-bold uppercase"
            >
              Log out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 pb-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase no-underline ${
                  active ? "bg-black text-white" : "bg-white text-black/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
