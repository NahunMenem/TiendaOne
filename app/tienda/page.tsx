"use client";

import { useEffect, useState } from "react";
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

// ===============================
// COMPONENT
// ===============================
export default function TiendaPage() {
  const router = useRouter();

  const [categoria, setCategoria] = useState<string | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [imagen, setImagen] = useState<string | null>(null);
  const [nombreImagen, setNombreImagen] = useState("");

  // ===============================
  // QUERY
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

  const formatPrecio = (precio: number | null) =>
    precio ? `$${precio.toLocaleString("es-AR")}` : "Consultar";

  const contactarWhatsApp = (p: Producto) => {
    const mensaje = `
Hola, quiero consultar por este producto:

📱 ${p.nombre}
🎨 Color: ${p.color || "-"}
🔋 Batería: ${p.bateria ? `${p.bateria}%` : "-"}
♻️ Condición: ${p.condicion || "-"}
💰 Precio: ${formatPrecio(p.precio)}
    `.trim();

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

 return (
  <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-slate-100 px-6 py-8 space-y-8">
    {/* HEADER */}
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold tracking-tight text-white">
        Catálogo
      </h1>

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
        <SelectTrigger className="w-56 bg-slate-900 border-slate-700 text-slate-100">
          <SelectValue placeholder="Todas las categorías" />
        </SelectTrigger>

        <SelectContent className="bg-slate-900 border-slate-700">
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categorias.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {loading && <p className="text-slate-400">Cargando…</p>}

    {/* GRID */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      {productos.map((p) => (
        <Card
          key={p.id}
          className="
            bg-slate-900/80
            border border-slate-700
            rounded-2xl
            transition-all
            hover:-translate-y-1
            hover:shadow-[0_20px_40px_rgba(30,64,175,0.25)]
            hover:border-blue-700
          "
        >
          {/* IMAGEN */}
          <div
            className="relative aspect-square cursor-pointer bg-blue-950/40 rounded-t-2xl"
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

          <CardContent className="space-y-3 pt-4">
            <div>
              <h2 className="text-sm font-medium text-white">
                {p.nombre}
              </h2>
              <p className="text-xs text-slate-400">
                {p.categoria}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {p.condicion && (
                <Badge className="bg-slate-800 text-slate-200 border border-slate-700">
                  {p.condicion}
                </Badge>
              )}
              {p.color && (
                <Badge className="bg-blue-900 text-blue-100">
                  {p.color}
                </Badge>
              )}
              {p.bateria && (
                <Badge
                  variant="outline"
                  className="border-blue-700 text-blue-300"
                >
                  {p.bateria}% batería
                </Badge>
              )}
            </div>

            <Separator className="bg-slate-700" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">
                {formatPrecio(p.precio)}
              </span>
              <span className="text-xs text-slate-400">
                Stock: {p.stock}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => contactarWhatsApp(p)}
            >
              <MessageCircle className="w-4 h-4" />
              Consultar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>

    {/* MODAL IMAGEN */}
    <Dialog open={!!imagen} onOpenChange={() => setImagen(null)}>
      <DialogContent className="max-w-3xl bg-slate-950 border border-slate-800">
        {imagen && (
          <Image
            src={imagen}
            alt={nombreImagen}
            width={900}
            height={900}
            className="object-contain mx-auto"
          />
        )}
      </DialogContent>
    </Dialog>
  </div>
);


}

