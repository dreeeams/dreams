'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Download,
  Copy,
  Check,
  Plus,
  Trash2,
  Settings,
  X,
} from 'lucide-react';
import Logo from '@/components/logo';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number;
}

export default function QuotePage() {
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState('COP');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [editingField, setEditingField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    quoteNumber: 'INV-0001',
    clientName: '',
    clientNIT: '',
    clientEmail: '',
    clientPhone: '',
    companyName: 'Dream Studio',
    companyNIT: '123456789-0',
    companyAddress: 'Bogotá D.C.',
    discount: '',
    tax: '19',
    notes: '',
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, rate: 0, tax: 0 },
  ]);

  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    COP: '$',
    MXN: '$',
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-CO').format(num);
  };

  const formatCurrency = (num: number) => {
    return `${currencySymbols[currency]} ${formatNumber(Math.round(num))}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLineItemChange = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleNumberInput = (id: string, field: 'quantity' | 'rate' | 'tax', value: string) => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d]/g, '');
    const numberValue = numericValue === '' ? 0 : parseFloat(numericValue);
    handleLineItemChange(id, field, numberValue);
  };

  const getDisplayValue = (itemId: string, field: 'quantity' | 'rate' | 'tax', value: number) => {
    const fieldKey = `${itemId}-${field}`;
    // If editing and value is 0, show empty string
    if (editingField === fieldKey && value === 0) {
      return '';
    }
    // For tax, don't format with thousands separator
    if (field === 'tax') {
      return String(value || 0);
    }
    // Otherwise show formatted number
    return formatNumber(value || 0);
  };

  const handleFocus = (itemId: string, field: 'quantity' | 'rate' | 'tax', value: number) => {
    const fieldKey = `${itemId}-${field}`;
    setEditingField(fieldKey);
    // If value is 0, the getDisplayValue will show empty string
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', quantity: 1, rate: 0, tax: 0 },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const calculateItemTotal = (item: LineItem) => {
    return item.quantity * item.rate;
  };

  const calculateItemTax = (item: LineItem) => {
    const itemSubtotal = calculateItemTotal(item);
    return (itemSubtotal * item.tax) / 100;
  };

  const subtotal = lineItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const discount = parseFloat(formData.discount) || 0;
  const discountAmount = (subtotal * discount) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = lineItems.reduce((sum, item) => {
    const itemSubtotal = calculateItemTotal(item);
    const itemAfterDiscount = itemSubtotal * (1 - discount / 100);
    return sum + (itemAfterDiscount * item.tax) / 100;
  }, 0);
  const total = subtotalAfterDiscount + taxAmount;

  const handleCopyQuote = () => {
    const quoteText = `
COTIZACIÓN - ${formData.quoteNumber}

De: ${formData.companyName}
NIT: ${formData.companyNIT}
${formData.companyAddress}

Para: ${formData.clientName}
${formData.clientNIT ? `NIT: ${formData.clientNIT}` : ''}
${formData.clientEmail}
${formData.clientPhone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ITEMS:

${lineItems.map(item => {
  if (!item.description) return '';
  return `${item.description}
Cantidad: ${item.quantity} | Precio: ${formatCurrency(item.rate)} | Subtotal: ${formatCurrency(calculateItemTotal(item))}`;
}).filter(Boolean).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Subtotal: ${formatCurrency(subtotal)}
${discount > 0 ? `Descuento (${discount}%): -${formatCurrency(discountAmount)}` : ''}
IVA (${tax}%): ${formatCurrency(taxAmount)}

TOTAL: ${formatCurrency(total)} ${currency}

Información de Pago:
Escanea el código QR en la cotización o visita: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://preview.dreeeams.com'}/payments

${formData.notes ? `\nNotas:\n${formData.notes}` : ''}
    `.trim();

    navigator.clipboard.writeText(quoteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('printable-quote');
    if (!element) return;

    // Store current view mode
    const currentMode = viewMode;

    // Switch to preview mode temporarily for better rendering
    if (currentMode !== 'preview') {
      setViewMode('preview');
      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    try {
      // Force layout recalculation
      element.style.overflow = 'visible';

      // Capture the element as a canvas with better options
      const canvas = await html2canvas(element, {
        scale: 3, // Higher quality for better text rendering
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        width: element.scrollWidth,
        height: element.scrollHeight,
        x: 0,
        y: 0,
      });

      // Calculate PDF dimensions (A4 size with margins)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png', 1.0);

      // If content is taller than one page, we might need multiple pages
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Download the PDF
      const fileName = `Cotizacion-${formData.quoteNumber}-${formData.clientName || 'Cliente'}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to print
      window.print();
    } finally {
      // Restore original view mode
      if (currentMode !== 'preview') {
        setViewMode(currentMode);
      }
    }
  };

  const loadPreset = (preset: 'landing' | 'ecommerce' | 'mobile' | 'consulting') => {
    const presets = {
      landing: {
        items: [
          { id: '1', description: 'Diseño UI/UX', quantity: 1, rate: 1500000, tax: 0 },
          { id: '2', description: 'Desarrollo Frontend', quantity: 1, rate: 3000000, tax: 0 },
          { id: '3', description: 'Desarrollo Backend', quantity: 1, rate: 1600000, tax: 0 },
          { id: '4', description: 'Hosting y Dominio (Año 1)', quantity: 1, rate: 200000, tax: 0 },
        ],
      },
      ecommerce: {
        items: [
          { id: '1', description: 'Diseño UI/UX Completo', quantity: 1, rate: 3000000, tax: 0 },
          { id: '2', description: 'Desarrollo Frontend', quantity: 1, rate: 6000000, tax: 0 },
          { id: '3', description: 'Desarrollo Backend & API', quantity: 1, rate: 4800000, tax: 0 },
          { id: '4', description: 'Integración Pasarela de Pago', quantity: 1, rate: 1700000, tax: 0 },
        ],
      },
      mobile: {
        items: [
          { id: '1', description: 'Diseño UI/UX Mobile', quantity: 1, rate: 2400000, tax: 0 },
          { id: '2', description: 'Desarrollo iOS', quantity: 1, rate: 4250000, tax: 0 },
          { id: '3', description: 'Desarrollo Android', quantity: 1, rate: 4250000, tax: 0 },
          { id: '4', description: 'Testing y QA', quantity: 1, rate: 1050000, tax: 0 },
        ],
      },
      consulting: {
        items: [
          { id: '1', description: 'Auditoría Inicial', quantity: 1, rate: 720000, tax: 0 },
          { id: '2', description: 'Consultoría Estratégica', quantity: 1, rate: 1900000, tax: 0 },
          { id: '3', description: 'Implementación y Soporte', quantity: 1, rate: 1020000, tax: 0 },
        ],
      },
    };

    setLineItems(presets[preset].items);
  };

  return (
    <>
      {/* Remove admin layout padding for quote page */}
      <style jsx global>{`
        main:has(#quote-page-container) {
          padding: 0 !important;
        }
      `}</style>

      {/* Print Styles */}
      <style jsx global>{`
        /* Remove number input arrows */
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }

        /* Black border on focus instead of blue */
        #printable-quote input:focus,
        #printable-quote textarea:focus {
          border-color: #000 !important;
        }

        .preview-mode input,
        .preview-mode textarea,
        .preview-mode select {
          pointer-events: none;
          border: none !important;
          background: transparent !important;
        }

        .preview-mode .no-print {
          display: none !important;
        }

        /* Smaller text in preview mode */
        #printable-quote.preview-mode {
          font-size: 0.75rem !important;
        }

        #printable-quote.preview-mode h1 {
          font-size: 1.25rem !important;
        }

        #printable-quote.preview-mode h2 {
          font-size: 1rem !important;
        }

        #printable-quote.preview-mode h3 {
          font-size: 0.875rem !important;
        }

        #printable-quote.preview-mode table {
          font-size: 0.75rem !important;
        }

        #printable-quote.preview-mode .text-sm {
          font-size: 0.7rem !important;
        }

        #printable-quote.preview-mode .text-xs {
          font-size: 0.65rem !important;
        }

        #printable-quote.preview-mode .text-2xl {
          font-size: 1.125rem !important;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          #printable-quote, #printable-quote * {
            visibility: visible;
          }
          #printable-quote {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          input, textarea, select {
            border: none !important;
            background: transparent !important;
          }
        }
      `}</style>

      <div id="quote-page-container" className="min-h-screen bg-gray-50 flex no-print">
        {/* Left Sidebar Panel - Narrower */}
        {sidebarOpen && viewMode === 'edit' && (
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto no-print">
            <div className="p-4 space-y-4">
              {/* Header */}
              <div className="mb-2">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuración
                </h2>
              </div>

              {/* Currency */}
              <Card className="p-3 shadow-none">
                <h3 className="font-semibold text-xs mb-2">Moneda</h3>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border rounded-md"
                >
                  <option value="COP">COP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="MXN">MXN</option>
                </select>
              </Card>

              {/* Quick Presets */}
              <Card className="p-3 shadow-none">
                <h3 className="font-semibold text-xs mb-2">Plantillas</h3>
                <div className="grid grid-cols-1 gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadPreset('landing')}
                    className="text-xs h-8"
                  >
                    Landing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadPreset('ecommerce')}
                    className="text-xs h-8"
                  >
                    E-commerce
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadPreset('mobile')}
                    className="text-xs h-8"
                  >
                    App Móvil
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadPreset('consulting')}
                    className="text-xs h-8"
                  >
                    Consultoría
                  </Button>
                </div>
              </Card>

              {/* Adjustments */}
              <Card className="p-3 shadow-none">
                <h3 className="font-semibold text-xs mb-2">Ajustes</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="discount" className="text-xs">Descuento (%)</Label>
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      step="0.01"
                      max="100"
                      value={formData.discount}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax" className="text-xs">IVA (%)</Label>
                    <Input
                      id="tax"
                      name="tax"
                      type="number"
                      step="0.01"
                      value={formData.tax}
                      onChange={handleInputChange}
                      placeholder="19"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </Card>

              {/* Summary */}
              <Card className="p-3 bg-gray-50 shadow-none">
                <h3 className="font-semibold text-xs mb-2">Resumen</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items</span>
                    <span className="font-semibold">{lineItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento</span>
                      <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA</span>
                    <span className="font-semibold">{formatCurrency(taxAmount)}</span>
                  </div>
                  <div className="border-t pt-1.5 flex justify-between text-xs font-bold">
                    <span>TOTAL</span>
                    <span className="text-sm">{formatCurrency(total)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content with centered document */}
          <div className="flex-1 overflow-y-auto py-8 pr-8">
            <div className="max-w-4xl mx-auto">
              {/* Small Tabs above document */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex rounded-md border border-gray-300 bg-white">
                  <button
                    onClick={() => setViewMode('edit')}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      viewMode === 'edit'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      viewMode === 'preview'
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Vista Previa
                  </button>
                </div>

                {viewMode === 'preview' && (
                  <div className="flex items-center gap-2">
                    <Button onClick={handleCopyQuote} variant="outline" size="sm" className="h-8 text-xs">
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 mr-1.5" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1.5" />
                          Copiar
                        </>
                      )}
                    </Button>
                    <Button onClick={handleDownloadPDF} size="sm" className="h-8 text-xs">
                      <Download className="h-3 w-3 mr-1.5" />
                      Descargar
                    </Button>
                  </div>
                )}
              </div>
              {/* A4 Page */}
              <div
                id="printable-quote"
                className={`bg-white border border-gray-200 mx-auto flex flex-col ${viewMode === 'preview' ? 'preview-mode' : ''}`}
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  padding: '15mm 20mm',
                }}
              >
                {/* Header with Logo */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">Cotización</h1>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">No de Cotización:</span>{' '}
                        {viewMode === 'edit' ? (
                          <input
                            type="text"
                            value={formData.quoteNumber}
                            onChange={(e) => setFormData({ ...formData, quoteNumber: e.target.value })}
                            className="border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                          />
                        ) : (
                          <span>{formData.quoteNumber}</span>
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Fecha de Emisión:</span> {new Date().toLocaleDateString('es-CO')}
                      </p>
                      <p>
                        <span className="font-medium">Fecha de Expiración:</span>{' '}
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-CO')}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Logo className="h-8 w-auto" fill="currentColor" />
                  </div>
                </div>

                {/* From / To Section */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* De */}
                  <div>
                    <h3 className="font-bold text-sm mb-3">De</h3>
                    <div className="space-y-1 text-sm">
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="font-medium w-full border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                      />
                      <p>
                        NIT:{' '}
                        <input
                          type="text"
                          value={formData.companyNIT}
                          onChange={(e) => setFormData({ ...formData, companyNIT: e.target.value })}
                          className="border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                        />
                      </p>
                      <p>Responsable de IVA</p>
                      <input
                        type="text"
                        value={formData.companyAddress}
                        onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                        className="w-full border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Para */}
                  <div>
                    <h3 className="font-bold text-sm mb-3">Para</h3>
                    <div className="space-y-1 text-sm">
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Nombre del cliente"
                        className="font-medium w-full border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                      />
                      <p>
                        NIT:{' '}
                        <input
                          type="text"
                          value={formData.clientNIT}
                          onChange={(e) => setFormData({ ...formData, clientNIT: e.target.value })}
                          placeholder="123456789-0"
                          className="border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                        />
                      </p>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="email@cliente.com"
                        className="w-full border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                      />
                      <input
                        type="tel"
                        value={formData.clientPhone}
                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                        placeholder="+573001234567"
                        className="w-full border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-8">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-3 font-bold">Descripción</th>
                        <th className="text-center py-3 font-bold w-24">Cantidad</th>
                        <th className="text-right py-3 font-bold w-32">Precio</th>
                        <th className="text-center py-3 font-bold w-24">IVA (%)</th>
                        <th className="text-right py-3 font-bold w-32">Subtotal</th>
                        {viewMode === 'edit' && (
                          <th className="w-8 no-print"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 group">
                          <td className="py-3 align-top">
                            <textarea
                              value={item.description}
                              onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                              placeholder="Descripción del servicio..."
                              rows={2}
                              className="w-full border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent resize-none"
                            />
                          </td>
                          <td className="py-3 text-center">
                            <input
                              type="text"
                              value={getDisplayValue(item.id, 'quantity', item.quantity)}
                              onChange={(e) => handleNumberInput(item.id, 'quantity', e.target.value)}
                              onFocus={() => handleFocus(item.id, 'quantity', item.quantity)}
                              onBlur={handleBlur}
                              className="w-full text-center border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                            />
                          </td>
                          <td className="py-3 text-right">
                            <input
                              type="text"
                              value={getDisplayValue(item.id, 'rate', item.rate)}
                              onChange={(e) => handleNumberInput(item.id, 'rate', e.target.value)}
                              onFocus={() => handleFocus(item.id, 'rate', item.rate)}
                              onBlur={handleBlur}
                              className="w-full text-right border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                            />
                          </td>
                          <td className="py-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="text"
                                value={getDisplayValue(item.id, 'tax', item.tax)}
                                onChange={(e) => handleNumberInput(item.id, 'tax', e.target.value)}
                                onFocus={() => handleFocus(item.id, 'tax', item.tax)}
                                onBlur={handleBlur}
                                className="w-12 text-center border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent"
                              />
                              <span className="text-gray-600">%</span>
                            </div>
                          </td>
                          <td className="py-3 text-right font-medium">
                            {formatCurrency(calculateItemTotal(item))}
                          </td>
                          {viewMode === 'edit' && (
                            <td className="py-3 text-center no-print">
                              {lineItems.length > 1 && (
                                <Button
                                  onClick={() => removeLineItem(item.id)}
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {viewMode === 'edit' && (
                    <Button
                      onClick={addLineItem}
                      variant="outline"
                      size="sm"
                      className="mt-3 no-print"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar Item
                    </Button>
                  )}
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                  <div className="w-80 space-y-2 text-sm">
                    <div className="flex justify-between py-2">
                      <span>Subtotal</span>
                      <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between py-2 text-green-600">
                        <span>Descuento ({discount}%)</span>
                        <span className="font-medium">-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2">
                      <span>IVA</span>
                      <span className="font-medium">{formatCurrency(taxAmount)}</span>
                    </div>
                    <div className="flex justify-between py-3 border-t border-gray-300">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Spacer to push footer sections to bottom */}
                <div className="flex-1"></div>

                {/* Footer Sections - Anchored to bottom */}
                <div className="mt-auto">
                  <div className="grid grid-cols-2 gap-8 text-sm">
                    {/* Payment QR Code */}
                    <div>
                      <h3 className="font-bold mb-3">Información de Pago</h3>
                      <div className="flex flex-col items-start gap-3">
                        <div className="bg-white p-2">
                          <QRCodeSVG
                            value={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://preview.dreeeams.com'}/payments`}
                            size={80}
                            level="H"
                            includeMargin={false}
                          />
                        </div>
                        <p className="text-xs text-gray-600">
                          Escanea el código QR para ver los detalles completos de pago
                        </p>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h3 className="font-bold mb-2">Notas</h3>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Notas adicionales..."
                        className="w-full text-sm border-b border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent resize-none"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Bottom Note */}
                  <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-600">
                    <p>Cotización sujeta a disponibilidad. El servicio se inicia tras la confirmación del pago.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
