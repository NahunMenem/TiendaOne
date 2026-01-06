"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  ShoppingBag,
  Package,
  DollarSign,
  History,
  Wallet,
  LayoutDashboard,
  AlertTriangle,
  Calculator,
  Wrench,
  XCircle,
  Star,
  LogOut,
  LogIn,
} from "lucide-react";

const LOGO_URL =
  "https://res.cloudinary.com/df3cwd4ty/image/upload/v1767716249/tiendauno_n0kkg8.png";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = () => {
    localStorage.clear();
    setRole(null);
    router.push("/login");
  };

  const Item = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
          ${
            active
              ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`}
      >
        <Icon className="w-4.5 h-4.5" />
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Botón menú mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg
                   bg-blue-600 text-white shadow-lg"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 inset-y-0 left-0 w-64
          bg-[#0B1220] border-r border-slate-800
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full px-4 py-5">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src={LOGO_URL}
              alt="Logo"
              width={140}
              height={40}
              priority
            />
          </div>

          {/* Menú */}
          <nav className="space-y-1">
            <Item href="/tienda" icon={ShoppingBag} label="Tienda" />

            {/* NO LOGUEADO */}
            {!role && (
              <Item href="/login" icon={LogIn} label="Iniciar sesión" />
            )}

            {/* LOGUEADO */}
            {role && (
              <>
                <Item href="/stock/agregar" icon={Package} label="Agregar Stock" />
                <Item href="/ventas" icon={DollarSign} label="Registrar Venta" />
                <Item href="/transacciones" icon={History} label="Transacciones" />
                <Item href="/egresos" icon={Wallet} label="Egresos" />

                {role === "admin" && (
                  <Item
                    href="/dashboard"
                    icon={LayoutDashboard}
                    label="Dashboard"
                  />
                )}

                <Item
                  href="/productos-por-agotarse"
                  icon={AlertTriangle}
                  label="Productos por Agotarse"
                />

                {role === "admin" && (
                  <Item href="/caja" icon={Calculator} label="Caja" />
                )}

                <Item href="/reparaciones" icon={Wrench} label="Reparaciones" />
                <Item
                  href="/mercaderia-fallada"
                  icon={XCircle}
                  label="Mercadería Fallada"
                />
                <Item
                  href="/productos-mas-vendidos"
                  icon={Star}
                  label="Productos Más Vendidos"
                />

                {/* Logout */}
                <button
                  onClick={logout}
                  className="mt-4 flex items-center gap-3 px-3 py-2
                             rounded-lg text-sm w-full
                             bg-red-600/20 hover:bg-red-600/30
                             text-red-400 transition"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  Cerrar sesión
                </button>
              </>
            )}
          </nav>

          {/* Footer */}
          <footer className="mt-auto pt-6 text-center text-xs text-slate-500">
            Chiphone · v1.0.0
          </footer>
        </div>
      </aside>
    </>
  );
}
