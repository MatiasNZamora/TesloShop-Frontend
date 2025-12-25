<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="120" alt="Next.js 15 Logo" />
  </a>
</p>

# 🛍️ Teslo Shop - Frontend (Next.js 15)

Este proyecto representa el **frontend oficial del sistema de e-commerce Teslo Shop**, desarrollado con **Next.js 15**, **TypeScript**, y las mejores prácticas modernas de desarrollo web.

El proyecto está completamente integrado con el [![Backend Teslo-Shop](https://img.shields.io/badge/Backend-NestJS-blue?logo=nestjs)](https://github.com/MatiasNZamora/tesloshop-backend), conformando un sistema completo de venta online con autenticación, pasarela de pagos, gestión de usuarios y panel administrativo.

---

## 🚀 Tecnologías principales

- **Next.js 15** – Framework de React optimizado para producción  
- **React 18** – Librería base para la interfaz de usuario  
- **TypeScript** – Tipado estático y seguridad de código  
- **Material UI / NextUI** – Librerías de diseño modernas  
- **Zustand** – Manejador de estado liviano  
- **NextAuth** – Autenticación y proveedores externos  
- **React Hook Form** – Manejo avanzado de formularios  
- **MongoDB** y **PostgreSQL** – Bases de datos integradas con el backend  
- **JWT** – Autenticación personalizada  
- **PayPal SDK** – Pagos con PayPal y tarjeta de crédito  
- **Docker** – Contenerización y despliegues optimizados  

---

## 🧩 Principales características

### ⚙️ Arquitectura y desarrollo

- **Next.js desde cero**, con configuración profesional  
- Proyecto **migrado completamente a TypeScript**  
- **Rutas dinámicas y segmentos anidados**  
- **API RESTful personalizada** con integración al backend  
- **Middlewares de Next.js** (protección de rutas y autenticación)
- **Despliegues automáticos** con Docker y plataformas cloud  

### 🧠 Estrategias de renderizado

Optimización del rendimiento mediante múltiples estrategias:

- **ISR (Incremental Static Regeneration)**  
- **SSR (Server Side Rendering)**  
- **SSG (Static Site Generation)**  
- **CSR (Client Side Rendering)**  

Cada una aplicada según la necesidad del módulo, garantizando una experiencia fluida y rápida.

---

## 🔐 Autenticación y seguridad

- **NextAuth** con soporte para múltiples proveedores  
- **Autenticación personalizada** con **JWT**  
- **Protección de rutas y redirecciones** automáticas  
- **Middlewares de autenticación** a nivel de servidor  
- **Gestión de sesiones seguras con cookies y tokens**

---

## 💳 Funcionalidades de e-commerce

- 🛒 **Catálogo de productos** con búsqueda y filtrado  
- 💰 **Pagos con PayPal y tarjeta de crédito**  
- 👤 **Gestión de usuarios y perfiles**  
- 📦 **Control de pedidos y compras**  
- 📸 **Carga y validación de imágenes**  
- 📊 **Dashboard administrativo completo**  
- 🔍 **Búsquedas y filtros dinámicos**  
- 📱 **Diseño completamente responsivo**

---

## 🧠 Estado global y UI

- **Zustand** para manejo eficiente del estado global  
- **Material UI** y **Next UI** para componentes visuales  
- **React Hook Form** para validaciones y control de inputs  
- **Drag & Drop** para administración intuitiva de elementos  

---

## 🧰 Configuración del proyecto

### 📦 Instalación de dependencias

```bash
npm install
```

### ▶️ Ejecutar las migraciones de prisma
```bash
npx prisma migrate dev
```

### ▶️ Ejecutar el Seed
```bash
npm run seed
```

### ▶️ Iniciar el entorno de desarrollo
```bash
npm run dev
```
El servidor se iniciará en:
👉 http://localhost:3000

### 🐳 Dockerización

El proyecto cuenta con una configuración lista para despliegues en Docker.

### 🧱 Construir y ejecutar contenedor
```bash
docker-compose up -d
```

### 🧾 Variables de entorno
Crear un archivo .env con las siguientes variables:
```bash
DB_USER=postgres
DB_NAME=teslo-shop
DB_PASSWORD=123456

NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXTAUTH_SECRET=supersecret
NEXTAUTH_URL=http://localhost:3000

DATABASE_URL=postgresql://user:password@localhost:5432/teslo

MONGODB_URI=mongodb://localhost:27017/teslo
PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 💡 Buenas prácticas aplicadas
- Principios DRY y SOLID
- Código tipado y seguro con TypeScript
- Arquitectura modular y escalable
- Componentes reutilizables
- Manejo de errores y validaciones consistentes
- Limpieza de código y convenciones ESLint / Prettier
- Optimización SEO mediante Next Metadata API
- Logs de desarrollo configurados
- Despliegues automatizados en múltiples entornos

---

## 🧭 Estructura del proyecto
```bash
src/
│
├── api/                 # Endpoints API personalizados
├── components/          # Componentes reutilizables
├── context/             # Contextos globales (Zustand, Auth, etc.)
├── hooks/               # Hooks personalizados
├── layouts/             # Layouts generales
├── pages/
│   ├── api/             # API Routes (Next.js)
│   ├── auth/            # Autenticación y registro
│   ├── cart/            # Carrito de compras
│   ├── checkout/        # Pagos y validaciones
│   ├── dashboard/       # Panel administrativo
│   └── index.tsx        # Página principal
├── public/              # Recursos estáticos
└── utils/               # Utilidades y helpers
```
---

## 🚀 Despliegue

Listo para desplegar en:
- Vercel
- Railway
- Render
- Docker / Docker Compose
El proyecto se integra fácilmente con el backend NestJS desplegado en cualquier entorno cloud.

---

## 🔗 Repositorios relacionados

| Proyecto | Descripción | Enlace |
|-----------|--------------|--------|
| 🧩 **Teslo Shop - Backend (NestJS)** | Backend de e-commerce con NestJS, JWT, autenticación por roles, TypeORM + PostgreSQL y MongoDB, APIs RESTful y gestión de usuarios/productos/pedidos. | [Ver proyecto](https://github.com/MatiasNZamora/tesloshop-backend) |


---

## 👨‍💻 Autor

👤 **Matías N. Zamora**  
💼 Desarrollador Fullstack & Asesor Técnico  
🌐 [Portafolio](https://matiasnzamora.com.ar)  
📧 [matiaszamora@email.com](mailto:devmatiasnzamora@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/matiasnzamora/)  


<p align="center">
  <sub>Desarrollado con ❤️ y NestJS • © 2025 Matías N. Zamora</sub>
</p>

