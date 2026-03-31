# 🚀 Prolider Consultores - Plataforma Web

Sitio web institucional y sistema de validación de certificados para **Prolider Consultores**, especialistas en capacitación psicológica y salud mental.

## ✨ Características Principales

*   **Landing Page Moderna:** Diseño responsivo y optimizado para conversión (Hero, Servicios, Nosotros, Contacto).
*   **Sistema de Validación de Certificados:** Consulta en tiempo real de certificados oficiales conectada directamente a bases de datos en Google Sheets.
*   **Prevención de Spam:** Sistema de ofuscación de correos electrónicos para evitar el rastreo por bots maliciosos (scraping).
*   **Alta Seguridad:** Configuración estricta de cabeceras HTTP (Security Headers) para prevenir ataques XSS, Clickjacking y MIME-Sniffing.
*   **Despliegue Optimizado:** Preparado para despliegue en contenedores (Docker) con Nginx, ideal para plataformas como Coolify.

## 🛠️ Stack Tecnológico

*   **Frontend:** React 19, TypeScript
*   **Build Tool:** Vite
*   **Estilos:** Tailwind CSS
*   **Lectura de Datos:** SheetJS (`xlsx`)
*   **Servidor de Producción:** Nginx (Alpine Linux)
*   **Contenerización:** Docker

## 💻 Desarrollo Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1.  **Clonar el repositorio**
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
4.  Abre tu navegador en `http://localhost:3000`

## 🚀 Despliegue en Producción (Coolify / Docker)

Este proyecto está optimizado para ser desplegado utilizando **Coolify** mediante Docker. El repositorio incluye un `Dockerfile` multi-etapa y una configuración personalizada de Nginx (`nginx.conf`).

### Pasos para Coolify:
1. Crea un nuevo recurso en Coolify apuntando a este repositorio (GitHub/GitLab).
2. Coolify detectará automáticamente el `Dockerfile`.
3. Asegúrate de que el **Puerto Expuesto (Exposed Port)** esté configurado en `80`.
4. Coolify se encargará automáticamente de la asignación del dominio y la generación del certificado SSL (HTTPS).
5. Haz clic en **Deploy**.

*Nota: También se incluyen archivos de configuración para despliegues alternativos en Vercel (`vercel.json`) o Netlify (`public/_headers`).*

## 🔒 Medidas de Seguridad Implementadas

*   **Sin exposición de API Keys:** La aplicación es 100% estática en el cliente (Client-Side).
*   **Protección contra Bots:** El formulario de contacto fue reemplazado por un componente de correo ofuscado (`ObfuscatedEmail.tsx`) que ensambla la dirección de correo dinámicamente, protegiendo la bandeja de entrada contra el spam automatizado.
*   **Security Headers (Nginx):**
    *   `X-Frame-Options: DENY`
    *   `X-Content-Type-Options: nosniff`
    *   `Strict-Transport-Security`
    *   `X-XSS-Protection`
    *   `Referrer-Policy`

## 📂 Estructura del Proyecto

```text
├── components/          # Componentes reutilizables de React (Hero, Services, Certificates, etc.)
├── constants.ts         # Variables globales y datos de la marca (Textos, Enlaces, Contacto)
├── Dockerfile           # Instrucciones de construcción para la imagen de Docker
├── nginx.conf           # Configuración del servidor web de producción y cabeceras de seguridad
├── package.json         # Dependencias y scripts del proyecto
├── vercel.json          # Reglas de seguridad alternativas para Vercel
├── public/_headers      # Reglas de seguridad alternativas para Netlify/Cloudflare
└── vite.config.ts       # Configuración del empaquetador Vite
```

---
*Desarrollado para Prolider Consultores.*
