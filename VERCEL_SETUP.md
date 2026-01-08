# 🚀 Configuración de Vercel para Producción

## 📋 Variables de Entorno Requeridas

### En Vercel Dashboard → Settings → Environment Variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://dreeeams.com

# Twenty CRM Integration (REGENERAR EL API KEY)
TWENTY_API_KEY=tu_nuevo_api_key_aqui
TWENTY_API_URL=https://twenty-production-25cf.up.railway.app
```

## ⚠️ CRÍTICO: Regenerar API Key de Twenty CRM

El API key anterior fue expuesto accidentalmente en el repositorio. **DEBES regenerarlo antes de deployar:**

1. Ve a Twenty CRM: https://twenty-production-25cf.up.railway.app
2. Navega a: Settings → APIs & Webhooks
3. **Revoca el API key anterior:** `eyJhbGci...`
4. Crea un nuevo API key
5. Copia el nuevo key a Vercel Environment Variables

## 🌐 Configuración del Dominio en Vercel

### 1. Agregar el dominio custom:
- Ve a: Project Settings → Domains
- Agrega: `dreeeams.com`
- Agrega: `www.dreeeams.com` (opcional)

### 2. Configurar DNS:
Agrega estos registros en tu proveedor de DNS (GoDaddy, Namecheap, etc.):

```
Type    Name    Value                    TTL
A       @       76.76.21.21              Auto
CNAME   www     cname.vercel-dns.com     Auto
```

O si prefieres usar Vercel DNS:
- Usa los nameservers de Vercel
- Vercel configurará todo automáticamente

### 3. Verificar SSL:
- Vercel generará automáticamente un certificado SSL
- Espera 10-15 minutos para propagación DNS

## 🔒 Verificar Seguridad

Antes de deployar, verifica:

- [x] `.env.local` en `.gitignore` ✓
- [ ] Nuevo API key de Twenty CRM generado
- [ ] Variables de entorno configuradas en Vercel
- [ ] Dominio configurado correctamente
- [ ] SSL habilitado

## 📝 Checklist de Deploy

1. [ ] Regenerar API key de Twenty CRM
2. [ ] Configurar todas las variables de entorno en Vercel
3. [ ] Hacer push del código actualizado a main/master
4. [ ] Vercel detectará automáticamente y hará deploy
5. [ ] Configurar dominio custom: dreeeams.com
6. [ ] Verificar que el sitio cargue correctamente
7. [ ] Probar el formulario de contacto
8. [ ] Verificar que los datos lleguen a Twenty CRM

## 🧪 Testing Post-Deploy

```bash
# Verificar que el sitio esté en línea
curl -I https://dreeeams.com

# Debería retornar: 200 OK

# Verificar sitemap
curl https://dreeeams.com/sitemap.xml

# Verificar robots.txt
curl https://dreeeams.com/robots.txt
```

## 🔗 Enlaces Útiles

- Vercel Dashboard: https://vercel.com/dashboard
- Twenty CRM: https://twenty-production-25cf.up.railway.app
- Vercel Docs - Domains: https://vercel.com/docs/concepts/projects/domains
- Vercel Docs - Env Vars: https://vercel.com/docs/concepts/projects/environment-variables

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard → Deployments
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate que el DNS esté propagado (usa https://dnschecker.org)
