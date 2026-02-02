# Google Ads Conversion Tracking Setup

Este documento explica cómo configurar el seguimiento de conversiones de Google Ads en el formulario de contacto.

## 📊 Eventos Rastreados

El formulario rastrea automáticamente los siguientes eventos:

1. **`form_start`** - Usuario comienza a llenar el formulario (interactúa con cualquier campo del Step 1)
2. **`form_step_2`** - Usuario llega al Step 2 del formulario
3. **`need_selection`** - Usuario selecciona servicios necesarios
4. **`budget_selection`** - Usuario selecciona presupuesto
5. **`referral_selection`** - Usuario selecciona cómo nos conoció
6. **`form_submit`** - Usuario envía el formulario exitosamente
7. **`conversion`** - Conversión oficial de Google Ads (requiere configuración)

## 🚀 Configuración Rápida

### 1. Obtener el Conversion ID de Google Ads

1. Ve a tu cuenta de Google Ads: [https://ads.google.com](https://ads.google.com)
2. Navega a **Herramientas y configuración** > **Medición** > **Conversiones**
3. Crea una nueva acción de conversión:
   - Tipo: **Sitio web**
   - Categoría: **Enviar formulario de contacto de clientes potenciales**
   - Nombre: "Envío de formulario de contacto"
4. En la configuración de etiquetas, busca tu **Conversion ID**:
   - Formato: `AW-XXXXXXXXX`
   - Ejemplo: `AW-123456789`

### 2. Obtener el Conversion Label

1. En la misma página de configuración de conversión
2. Encuentra el **Conversion Label** (Etiqueta de conversión)
   - Formato: `AbCdEfGhIj_KlMnOpQr`
   - Ejemplo: `Xj-xCNXB7YkDEL_Q0O4C`

### 3. Configurar Variables de Entorno

Agrega estas variables a tu archivo `.env.local`:

```bash
# Google Ads Conversion Tracking
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=AbCdEfGhIj_KlMnOpQr
```

**Importante:** Reemplaza los valores con tus datos reales de Google Ads.

### 4. Reiniciar el Servidor de Desarrollo

```bash
npm run dev
```

## ✅ Verificar Configuración

### Método 1: Console del Navegador

1. Abre el formulario de contacto en tu navegador
2. Abre las DevTools (F12)
3. Ve a la pestaña **Console**
4. Interactúa con el formulario y verás mensajes como:
   ```
   📊 Google Ads: form_start tracked
   📊 Google Ads: form_step_2 tracked
   📊 Google Ads: form_submit tracked
   ```

### Método 2: Google Tag Assistant

1. Instala la extensión: [Google Tag Assistant](https://tagassistant.google.com/)
2. Navega al formulario de contacto
3. Haz clic en el icono de Tag Assistant
4. Verifica que se están registrando los eventos

### Método 3: Google Ads Preview

1. Ve a Google Ads > Conversiones
2. Selecciona tu conversión
3. Haz clic en **Probar el tag**
4. Sigue las instrucciones para verificar

## 📈 Optimización de Campañas

Con estos eventos rastreados, puedes:

### En Google Ads:

1. **Crear Audiencias de Remarketing:**
   - Usuarios que iniciaron el formulario pero no completaron
   - Usuarios que llegaron al Step 2 pero abandonaron
   - Usuarios que completaron el formulario

2. **Optimizar Pujas:**
   - Configurar pujas automáticas basadas en conversiones
   - Ajustar pujas para usuarios que mostraron alto interés (llegaron a Step 2)

3. **Medir Rendimiento:**
   - Tasa de abandono entre Step 1 y Step 2
   - Presupuestos más seleccionados
   - Fuentes de referencia más comunes

### En Google Analytics 4 (si está integrado):

Los eventos también aparecerán en GA4 si tienes Google Tag Manager configurado:

1. Ve a **Eventos** en GA4
2. Busca los eventos personalizados:
   - `form_start`
   - `form_step_2`
   - `form_submit`

## 🔧 Troubleshooting

### Los eventos no aparecen en Google Ads

1. **Verifica las variables de entorno:**
   ```bash
   echo $NEXT_PUBLIC_GOOGLE_ADS_ID
   echo $NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
   ```

2. **Asegúrate de reiniciar el servidor** después de agregar las variables

3. **Revisa la consola del navegador** para errores de JavaScript

4. **Verifica que el Conversion ID sea correcto:**
   - Debe empezar con `AW-`
   - Debe ser tu ID de cuenta, no el ID de conversión

### El evento 'conversion' no se dispara

1. Verifica que **ambas** variables estén configuradas:
   - `NEXT_PUBLIC_GOOGLE_ADS_ID`
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`

2. El evento solo se dispara cuando el formulario se envía **exitosamente**

3. Revisa la consola del navegador para el mensaje:
   ```
   📊 Google Ads: conversion tracked (AW-XXXXXXXXX/AbCdEfGhIj_KlMnOpQr)
   ```

## 📝 Notas Técnicas

### Implementación

- El tracking está implementado en `lib/google-ads-tracking.ts`
- El script de Google Ads se carga en `app/layout.tsx`
- Los eventos se disparan en los componentes del formulario:
  - `StepOne`: `form_start`
  - `StepTwo`: `form_step_2`, `need_selection`, `budget_selection`, `referral_selection`
  - `ContactForm`: `form_submit`, `conversion`

### Privacy & GDPR

Los eventos rastreados **NO incluyen información personal** como:
- Nombres
- Emails
- Números de teléfono
- Información de la empresa

Solo se rastrean:
- Acciones del usuario (clicks, navegación)
- Selecciones generales (presupuesto, servicios, fuente de referencia)

## 🎯 Próximos Pasos

1. **Configurar Audiencias de Remarketing** en Google Ads
2. **Crear Conversiones Personalizadas** para Step 2 (lead cualificado)
3. **Implementar Enhanced Conversions** para mejor atribución
4. **Configurar Value Tracking** basado en presupuesto seleccionado

---

**¿Necesitas ayuda?** Contacta al equipo de desarrollo o consulta la documentación oficial de Google Ads.
