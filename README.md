# Sublime Personalizados · Sublimezone

Landing page interactiva para **Sublime Personalizados**: sublimación premium, catálogo visual con efectos 3D y asistente conectado a **WhatsApp** mediante enlaces oficiales `wa.me`.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

**Repositorio:** [github.com/Adrianmbt/sublimezone](https://github.com/Adrianmbt/sublimezone)

---

## Qué incluye este proyecto

| Módulo | Descripción |
|--------|-------------|
| **Landing** | Hero 3D, servicios, galería, formulario de presupuesto y CTA |
| **Bot flotante** | Chat con respuestas por palabras clave + derivación a WhatsApp |
| **Panel de control** | Vincular número, reglas auto-respuesta y vista previa del bot |

---

## Requisitos en otra máquina

Antes de clonar, instala:

| Herramienta | Versión mínima recomendada |
|-------------|----------------------------|
| [Node.js](https://nodejs.org/) | 20 LTS o superior |
| [Git](https://git-scm.com/) | Cualquier versión reciente |
| npm | Viene con Node.js |

Comprueba en terminal:

```bash
node -v    # debe mostrar v20.x o superior
npm -v
git --version
```

---

## Instalación rápida (otra PC)

### 1. Clonar el repositorio

```bash
git clone https://github.com/Adrianmbt/sublimezone.git
cd sublimezone
```

### 2. Instalar dependencias

Con **npm**:

```bash
npm install
```

Si el repo incluye `pnpm-lock.yaml` y prefieres pnpm:

```bash
corepack enable
pnpm install
```

### 3. Variables de entorno (WhatsApp)

Copia el ejemplo y edita tu número **con código de país, solo dígitos** (sin `+`, espacios ni guiones):

```bash
cp .env.example .env
```

Contenido de `.env`:

```env
# Ejemplo Chile: 56 + 9 dígitos móvil
VITE_WHATSAPP_NUMBER=56912345678
```

> También puedes vincular el número desde la web: menú **Configurar Bot** → ingresar número → **Vincular WhatsApp**.

### 4. Arrancar en desarrollo

```bash
npm run dev
```

Abre la URL que muestre Vite (normalmente **http://localhost:5173**).

### 5. Build de producción (opcional)

```bash
npm run build
npm run preview
```

La carpeta `dist/` queda lista para subir a Vercel, Netlify, GitHub Pages, etc.

---

## Scripts disponibles

| Comando | Uso |
|---------|-----|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila la app para producción en `dist/` |
| `npm run preview` | Sirve el build local para probar antes de desplegar |
| `npm run lint` | Revisa el código con ESLint |

---

## Estructura del proyecto

```
sublimezone/
├── public/                 # Assets estáticos (favicon, etc.)
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx    # Página principal
│   │   ├── HeroScene3D.jsx      # Escena 3D del hero
│   │   ├── TiltCard.jsx         # Tarjetas con efecto tilt
│   │   ├── WhatsAppWidget.jsx   # Chat flotante
│   │   ├── BotDashboard.jsx     # Panel de configuración
│   │   └── Navbar.jsx
│   ├── hooks/
│   │   └── use3DTilt.js         # Interacción 3D con el mouse
│   ├── lib/
│   │   └── whatsapp.js          # URLs wa.me y almacenamiento local
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind + animaciones 3D
├── .env.example               # Plantilla de variables
├── vite.config.js
└── package.json
```

---

## Configurar el bot de WhatsApp

1. Ejecuta `npm run dev` y entra a la web.
2. Clic en **Configurar Bot** (barra superior).
3. Escribe tu número: `569XXXXXXXX` (Chile) u otro país con prefijo internacional sin `+`.
4. Pulsa **Vincular WhatsApp**.
5. En **Respuestas automáticas**, añade palabras clave (ej. `precio`, `envio`) y el texto de respuesta.

**Palabras clave por defecto:** `hola`, `cotizar`, `catalogo`, `contacto`, `whatsapp`.

Cuando un visitante escribe en el chat flotante o pide un humano, se abre WhatsApp con el mensaje preparado (Click to Chat). No requiere servidor propio.

---

## Flujo de trabajo con Git (rama `main`)

```bash
# Actualizar tu copia local
git pull origin main

# Crear una rama para un cambio
git checkout -b feature/mi-cambio

# Tras editar y probar
git add .
git commit -m "Describe el cambio en una frase clara"
git push -u origin feature/mi-cambio
```

Abre un Pull Request hacia `main` en GitHub.

---

## Despliegue sugerido (Vercel / Netlify)

1. Conecta el repo `Adrianmbt/sublimezone`.
2. Rama de producción: **`main`**.
3. Comando de build: `npm run build`
4. Carpeta de salida: `dist`
5. Variable de entorno en el panel del hosting:

   `VITE_WHATSAPP_NUMBER` = tu número con código de país (solo dígitos)

---

## Solución de problemas

| Problema | Qué hacer |
|----------|-----------|
| `npm install` falla | Usa Node 20+, borra `node_modules` y vuelve a instalar |
| El bot dice “sin número vinculado” | Crea `.env` o vincula en **Configurar Bot** |
| WhatsApp no abre | Revisa que el número tenga 10–15 dígitos y código de país |
| Puerto 5173 ocupado | Vite usará otro puerto; mira la terminal |

---

## Licencia y créditos

Proyecto privado de **Sublime Personalizados**.  
Stack: React 19 · Vite 8 · Tailwind CSS 4 · Lucide Icons.

---

<p align="center">
  <strong>Sublime Personalizados</strong><br>
  <em>Infinite Possibilities in Every Print</em>
</p>
