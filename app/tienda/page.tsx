"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// ===============================
// TYPES
// ===============================
type Producto = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number | null;
  stock: number;
  foto_url: string;
  color?: string | null;
  bateria?: number | null;
  condicion?: string | null;
};

const WHATSAPP_NUMBER = "543804315721";

const WATERMARK_LOGO =
  "https://res.cloudinary.com/df3cwd4ty/image/upload/v1767716249/tiendauno_n0kkg8.png";

const HEADER_LOGO =
  "https://res.cloudinary.com/df3cwd4ty/image/upload/v1767797082/productos/sipbukli6wou2mpcmhra.png";

// ===============================
// COMPONENT
// ===============================
export default function TiendaPage() {
  const router = useRouter();

  const [categoria, setCategoria] = useState<string | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  const [imagen, setImagen] = useState<string | null>(null);
  const [nombreImagen, setNombreImagen] = useState("");

  // ===============================
  // QUERY PARAMS
  // ===============================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCategoria(params.get("categoria"));
  }, []);

  useEffect(() => {
    fetchTienda();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria]);

  const fetchTienda = async () => {
    setLoading(true);
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) return;

    const url = categoria
      ? `${base}/tienda?categoria=${encodeURIComponent(categoria)}`
      : `${base}/tienda`;

    const res = await fetch(url);
    const data = await res.json();

    setProductos(data.productos || []);
    setCategorias(data.categorias || []);
    setLoading(false);
  };

  // ===============================
  // BUSQUEDA FRONTEND
  // ===============================
  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return productos;

    const q = busqueda.toLowerCase();

    return productos.filter((p) =>
      [p.nombre, p.categoria, p.color, p.condicion]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q))
    );
  }, [busqueda, productos]);

  const formatPrecio = (precio: number | null) =>
    precio ? `$${precio.toLocaleString("es-AR")}` : "Consultar";

  const contactarWhatsApp = (p: Producto) => {
    const mensaje = `
Hola, quiero consultar por este producto:

${p.nombre}
Color: ${p.color || "-"}
Batería: ${p.bateria ? `${p.bateria}%` : "-"}
Condición: ${p.condicion || "-"}
Precio: ${formatPrecio(p.precio)}
    `.trim();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-slate-100 px-6 py-8 overflow-hidden">

      {/* MARCA DE AGUA */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url(${WATERMARK_LOGO})`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 space-y-10">

        {/* HEADER */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Image
              src={HEADER_LOGO}
              alt="Logo"
              width={140}
              height={40}
              className="object-contain"
            />

            <Select
              value={categoria ?? "all"}
              onValueChange={(v) => {
                if (v === "all") {
                  router.push("/tienda");
                  setCategoria(null);
                } else {
                  router.push(`/tienda?categoria=${v}`);
                  setCategoria(v);
                }
              }}
            >
              <SelectTrigger className="w-56 bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Categorías" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700 text-white">
                <SelectItem
                  value="all"
                  className="text-white focus:bg-slate-800 focus:text-white"
                >
                  Todas
                </SelectItem>
                {categorias.map((c) => (
                  <SelectItem
                    key={c}
                    value={c}
                    className="text-white focus:bg-slate-800 focus:text-white"
                  >
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            placeholder="¿Qué estás buscando?"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="max-w-xl bg-slate-900/80 border-slate-700 text-white"
          />
        </div>

        {loading && <p className="text-slate-400">Cargando…</p>}

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {productosFiltrados.map((p) => (
            <Card
              key={p.id}
              className="bg-slate-900/80 border border-slate-700 rounded-2xl hover:border-blue-700 transition"
            >
              <div
                className="relative aspect-square bg-blue-950/40 rounded-t-2xl cursor-pointer"
                onClick={() => {
                  setImagen(p.foto_url);
                  setNombreImagen(p.nombre);
                }}
              >
                <Image
                  src={p.foto_url}
                  alt={p.nombre}
                  fill
                  className="object-contain p-6"
                />
              </div>

              <CardContent className="space-y-4 pt-4">
                <h2 className="text-sm font-medium text-white">
                  {p.nombre}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {p.condicion && (
                    <Badge variant="secondary">
                      {p.condicion}
                    </Badge>
                  )}
                  {p.color && (
                    <Badge className="bg-blue-900">
                      {p.color}
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="flex items-end justify-between">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    {formatPrecio(p.precio)}
                  </span>
                  <span className="text-xs text-slate-400">
                    Stock {p.stock}
                  </span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => contactarWhatsApp(p)}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Consultar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* MODAL IMAGEN */}
        <Dialog open={!!imagen} onOpenChange={() => setImagen(null)}>
          <DialogContent className="max-w-3xl bg-slate-950">
            {imagen && (
              <Image
                src={imagen}
                alt={nombreImagen}
                width={900}
                height={900}
                className="mx-auto object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* FOOTER PROFESIONAL */}
        <div className="mt-24">
          <Separator className="mb-12 bg-slate-800" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto text-sm text-slate-300">
            <div>
              <h3 className="text-white font-medium mb-3">
                Tienda Uno
              </h3>
              <p>
                Av. Principal 123<br />
                Centro – Ciudad<br />
                Argentina
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">
                Contacto
              </h3>
              <p>
                WhatsApp: +54 380 431-5721<br />
                contacto@tiendauno.com
              </p>
              <p className="mt-3 text-slate-400">
                Lun a Vie · 09–21 hs<br />
                Sáb · 09–13 hs
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-3">
                Experiencia
              </h3>
              <p>
                Tecnología verificada, stock real y
                atención directa especializada.
              </p>
            </div>
          </div>

          <p className="text-xs text-center text-slate-500 mt-16">
            © {new Date().getFullYear()} Tienda Uno · Tecnología confiable
          </p>
        </div>
      </div>
    </div>
  );
}

