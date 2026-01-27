'use client';

import { Card } from '@/components/ui/card';
import Logo from '@/components/logo';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 shadow-xl">
        {/* Header with Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo className="h-auto w-auto max-w-[120px] mb-4" fill="currentColor" />
          <h1 className="text-3xl font-bold text-gray-900 text-center">Información de Pago</h1>
          <p className="text-gray-600 mt-2 text-center">Dream Studio</p>
        </div>

        {/* Company Information */}
        <div className="space-y-6">
          {/* Business Details */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Información de la Empresa
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Razón Social</p>
                  <p className="text-gray-600">Dream Studio</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">NIT</p>
                  <p className="text-gray-600">123456789-0</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Dirección</p>
                  <p className="text-gray-600">Bogotá D.C., Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Contacto
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <a href="mailto:info@dreeeams.com" className="text-blue-600 hover:underline">
                    info@dreeeams.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-700">Teléfono</p>
                  <a href="tel:+15558920875" className="text-blue-600 hover:underline">
                    +1 (555) 892-0875
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Information */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Información Bancaria
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Banco</p>
                <p className="text-gray-900 font-semibold">Bancolombia</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Tipo de Cuenta</p>
                <p className="text-gray-900">Ahorros</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Número de Cuenta</p>
                <p className="text-gray-900 font-mono text-lg">1234 5678 9012 3456</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Titular</p>
                <p className="text-gray-900">Dream Studio</p>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Instrucciones de Pago</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 mt-0.5">1.</span>
                <span>Realice la transferencia o consignación a la cuenta bancaria indicada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 mt-0.5">2.</span>
                <span>Envíe el comprobante de pago a info@dreeeams.com</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 mt-0.5">3.</span>
                <span>En el asunto del correo, incluya el número de cotización</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-blue-600 mt-0.5">4.</span>
                <span>Recibirá confirmación en un plazo máximo de 24 horas</span>
              </li>
            </ul>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-gray-500 pt-4">
            <p>Para cualquier consulta, no dude en contactarnos</p>
            <p className="mt-1">Dream Studio © {new Date().getFullYear()}</p>
          </div>

          {/* Footer Links */}
          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
              <Link href="/es" className="hover:text-black transition-colors">
                Inicio
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/es/legal" className="hover:text-black transition-colors">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
