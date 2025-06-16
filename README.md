🧠 Task Manager App – Monorepo

Este proyecto es un **monorepo** que contiene dos aplicaciones principales:

- **`client/`** – Aplicación frontend construida con React + Vite + Zustand + Tailwind CSS.
- **`server/`** – API backend con Node.js + Express + Prisma + Zod.

---

## 🚀 Requisitos

- Node.js v18 o superior
- npm / yarn / pnpm
- Base de datos (SQLite, PostgreSQL, etc.)

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/task-manager-app.git
cd task-manager-app
```

### 2. Instalar dependencias

```bash

cd client && npm install
cd ../server && npm install
```

### 3. Uso en desarrollo

#### Frontend

```bash
cd client

# Servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar tests (Vitest)
npm run test

# Linting
npm run lint

# Linting + corrección automática
npm run lint:fix

# Formatear con Prettier
npm run format

# Verificar formato sin modificar archivos
npm run format:check
```

#### Backend

```bash
cd server

# Iniciar en modo desarrollo
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar servidor compilado
npm run start

# Ejecutar tests (Jest + Supertest)
npm run test

# Linting
npm run lint

# Linting + corrección automática
npm run lint:fix

# Formatear con Prettier
npm run format

# Verificar formato sin modificar archivos
npm run format:check
```

### 4. Uso de prisma

#### Migraciones

```bash
cd server
# Crear migración
npx prisma migrate dev --name nombre_de_migracion
# Aplicar migraciones pendientes
npx prisma migrate deploy
```

#### Generar cliente Prisma

```bash
cd server
# Generar cliente Prisma
npx prisma generate
```

### 5. Configuración de variables de entorno

Crea un archivo `.env` en la raíz de cada aplicación (`client/.env` y `server/.env`) con las variables necesarias. Puedes usar los archivos `.env.example` como referencia.

### 6. Base de datos

Asegúrate de tener una base de datos configurada y actualizada. Puedes usar SQLite para desarrollo o PostgreSQL para producción. Configura la conexión en el archivo `.env` del servidor.

### 7. Ejecutar migraciones iniciales

```bash
cd server
npx prisma migrate dev --name init
```

### 8. Ejecutar el servidor

```bash
cd server
npm run dev
```

### 9. Ejecutar el cliente

```bash
cd client
npm run dev
```
