"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  MapPin,
  FileText,
  Power,
  BellRing,
  User,
  CreditCard,
  Navigation,
  Stethoscope,
  ClipboardList,
  FileSignature,
  Flag,
} from "lucide-react";

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-[#0B2A2E] px-6 py-12 text-white space-y-14">

      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-4">
        <Image
          src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/DOCYAPRO_BLANCO_eerxi3.png"
          alt="DocYa Pro"
          width={160}
          height={60}
          priority
        />

        <h1 className="text-3xl font-bold text-center">
          Guía de uso para profesionales
        </h1>

        <p className="text-white/70 text-center max-w-xl leading-relaxed">
          Este manual explica paso a paso cómo trabajar con DocYa,
          desde que te conectás hasta que finalizás una atención domiciliaria.
        </p>
      </div>

      {/* ================= PASOS ================= */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">

        {/* PASO 1 */}
        <Card className="bg-[#121212] border border-teal-500/30 rounded-2xl">
          <CardHeader>
            <span className="text-teal-400 text-sm font-semibold">Paso 1</span>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Power className="w-5 h-5 text-teal-400" />
              Activar disponibilidad
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-white/80 text-sm">
            <Image
              src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767730885/disponible2_wymxeh.png"
              alt="Disponibilidad"
              width={300}
              height={600}
              className="rounded-lg mx-auto"
            />

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Al ingresar a la app DocYa Pro, debés colocarte como{" "}
                  <b>Disponible</b>.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <BellRing className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Solo cuando estás disponible el sistema puede asignarte
                  consultas de pacientes cercanos.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Una vez activado, podés bloquear el teléfono: la app queda
                  conectada y lista para recibir solicitudes.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* PASO 2 */}
        <Card className="bg-[#121212] border border-teal-500/30 rounded-2xl">
          <CardHeader>
            <span className="text-teal-400 text-sm font-semibold">Paso 2</span>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <BellRing className="w-5 h-5 text-teal-400" />
              Recepción de una consulta
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-white/80 text-sm">
            <Image
              src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731025/consulta2_ju6290.png"
              alt="Consulta entrante"
              width={300}
              height={600}
              className="rounded-lg mx-auto"
            />

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <User className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Cuando un paciente solicita atención, recibís una consulta entrante.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Dirección del domicilio y distancia estimada.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Tiempo limitado para aceptar o rechazar la consulta.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Flag className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  Al aceptar, la atención queda asignada exclusivamente a vos.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* PASO 3 */}
        <Card className="bg-[#121212] border border-teal-500/30 rounded-2xl">
          <CardHeader>
            <span className="text-teal-400 text-sm font-semibold">Paso 3</span>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-teal-400" />
              Llegada al domicilio
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-white/80 text-sm">
            <Image
              src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731109/encamino_vrzrjl.png"
              alt="Consulta aceptada"
              width={300}
              height={600}
              className="rounded-lg mx-auto"
            />

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <User className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>Datos completos del paciente.</span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>Distancia en tiempo real al domicilio.</span>
              </li>

              <li className="flex items-start gap-3">
                <Navigation className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>Acceso directo a Google Maps para navegación.</span>
              </li>

              <li className="flex items-start gap-3">
                <Stethoscope className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>
                  El botón <b>“Iniciar consulta”</b> solo se habilita al llegar al domicilio.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CreditCard className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                <span>
                  Si el estado de cobro figura como{" "}
                  <b className="text-yellow-400">pendiente</b>,
                  el profesional debe cobrar al paciente.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* PASO 4 */}
        <Card className="bg-[#121212] border border-teal-500/30 rounded-2xl">
          <CardHeader>
            <span className="text-teal-400 text-sm font-semibold">Paso 4</span>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-teal-400" />
              Iniciar y finalizar la consulta
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-white/80 text-sm">
            <Image
              src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731186/encasa_iq7psw.png"
              alt="Funciones médicas habilitadas"
              width={300}
              height={600}
              className="rounded-lg mx-auto"
            />

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>Historia clínica digital.</span>
              </li>

              <li className="flex items-start gap-3">
                <FileSignature className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>Recetas y certificados médicos digitales.</span>
              </li>

              <li className="flex items-start gap-3">
                <Flag className="w-4 h-4 text-teal-400 mt-1 shrink-0" />
                <span>
                  Presioná <b>“Finalizar consulta”</b> para cerrar correctamente
                  el servicio y completar la atención.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>



        {/* PASO 5 */}
        <Card className="bg-[#121212] border border-red-500/30 rounded-2xl md:col-span-2">
        <CardHeader>
            <span className="text-red-400 text-sm font-semibold">
            Paso final – Importante
            </span>
            <CardTitle className="text-xl text-white flex items-center gap-2">
            <Power className="w-5 h-5 text-red-400" />
            Ponerse como No disponible
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-white/80 text-sm">
            <Image
            src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731257/notrabajo_g7if6h.png"
            alt="No disponible"
            width={300}
            height={600}
            className="rounded-lg mx-auto"
            />

            <ul className="space-y-3">
            <li className="flex items-start gap-3">
                <Flag className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                Antes de cerrar la app o finalizar tu jornada, recordá siempre
                colocarte como <b>No disponible</b>.
                </span>
            </li>

            <li className="flex items-start gap-3">
                <BellRing className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                Si permanecés disponible, el sistema puede seguir asignándote
                consultas aunque ya no desees trabajar.
                </span>
            </li>

            <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                Las consultas no aceptadas afectan tu rendimiento y disponibilidad
                dentro de la plataforma.
                </span>
            </li>

            <li className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                <span className="leading-relaxed">
                Ponerte como <b>No disponible</b> asegura una mejor experiencia
                tanto para vos como para los pacientes.
                </span>
            </li>
            </ul>
        </CardContent>
        </Card>


      </div>
    </div>
  );
}
