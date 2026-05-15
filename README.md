# Mi App — Full Stack con Next.js 15 + FastAPI + MySQL

Sistema web full stack con autenticación segura, arquitectura SSR-first en el frontend y API REST en Python.

---

## Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 15 (App Router) | Framework principal SSR |
| React | 19 | UI |
| TypeScript | 5 | Tipado estático |
| NextAuth.js | v5 (Auth.js) | Autenticación |
| Tailwind CSS | v4 | Estilos |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Python | 3.11+ | Lenguaje base |
| FastAPI | latest | Framework API REST |
| SQLAlchemy | latest | ORM |
| PyMySQL | latest | Conector MySQL |
| Passlib + bcrypt | latest | Hash de contraseñas |
| Python-Jose | latest | Generación de JWT |

### Base de datos
| Tecnología | Uso |
|---|---|
| MySQL 8+ | Base de datos principal |

---

## Estructura del proyecto

```
/
├── frontend/                        # Aplicación Next.js 15
│   ├── app/
│   │   ├── (auth)/                  # Rutas públicas de autenticación
│   │   │   └── login/
│   │   │       ├── page.tsx         # Server Component
│   │   │       └── LoginForm.tsx    # Client Component (mínimo)
│   │   ├── (app)/                   # Rutas privadas de la aplicación
│   │   │   ├── layout.tsx           # Layout protegido (verifica sesión)
│   │   │   ├── _components/         # Componentes compartidos (no son rutas)
│   │   │   │   ├── Navbar.tsx       # Server Component
│   │   │   │   └── LogoutButton.tsx # Client Component
│   │   │   └── dashboard/
│   │   │       └── page.tsx         # Server Component con fetch SSR
│   │   ├── actions/
│   │   │   └── auth.ts              # Server Actions (login, logout)
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts     # Route handler de NextAuth
│   │   └── page.tsx                 # Landing page
│   ├── lib/
│   │   └── api.ts                   # Cliente HTTP para llamadas SSR al backend
│   ├── types/
│   │   ├── api.ts                   # Tipos del dominio (User, AuthResponse, etc.)
│   │   ├── next-auth.d.ts           # Extensión de tipos de sesión
│   │   └── index.ts                 # Re-exportaciones
│   ├── auth.ts                      # Configuración completa de NextAuth
│   ├── auth.config.ts               # Config base Edge-compatible (para proxy)
│   ├── proxy.ts                     # Protección de rutas (Edge Runtime)
│   └── .env.local                   # Variables de entorno (no subir a git)
│
└── backend/                         # API en FastAPI (próximamente)
    ├── routers/
    │   └── auth.py                  # Endpoints de autenticación
    ├── models/
    │   └── user.py                  # Modelo SQLAlchemy
    ├── database.py                  # Conexión MySQL
    ├── main.py                      # Entrada de la aplicación
    ├── requirements.txt
    └── .env                         # Variables de entorno (no subir a git)
```

---

## Arquitectura SSR

El frontend está diseñado para maximizar el rendering en servidor (SSR), minimizando el JavaScript enviado al cliente.

| Componente | Tipo | Razón |
|---|---|---|
| `app/(auth)/login/page.tsx` | Server Component | Verifica sesión y redirige en servidor |
| `app/(app)/layout.tsx` | Server Component | Protege todas las rutas privadas |
| `app/(app)/dashboard/page.tsx` | Server Component | Fetch de datos directo al backend |
| `app/(app)/_components/Navbar.tsx` | Server Component | Lee sesión en servidor |
| `LoginForm.tsx` | Client Component | Necesita estado para errores del form |
| `LogoutButton.tsx` | Client Component | Necesita disparar una Server Action |

> Solo 2 componentes usan `"use client"` en toda la aplicación.

---

## Seguridad implementada

### Autenticación
- **NextAuth.js v5** con provider de credenciales
- Sesión almacenada en **cookie HttpOnly cifrada** (no accesible desde JavaScript)
- `NEXTAUTH_SECRET` para firmar y verificar tokens de sesión

### Tokens
- El backend emite **JWT firmados** con `python-jose`
- El token se almacena en la sesión del servidor, nunca en `localStorage`
- Expiración configurable (por defecto 8 horas)

### Contraseñas
- Almacenadas con **hash bcrypt** (nunca en texto plano)
- Verificación con `passlib`

### Protección de rutas
- `proxy.ts` corre en el **Edge Runtime** antes de que la request llegue a la app
- El layout de `(app)` verifica la sesión en servidor como segunda capa
- Las redirecciones ocurren en el servidor (sin flash de contenido)

### CORS
- Configurado en FastAPI para aceptar solo el origen del frontend

---

## Variables de entorno

### Frontend — `frontend/.env.local`
```bash
NEXTAUTH_SECRET=     # Generá con: openssl rand -base64 32
NEXTAUTH_URL=        # http://localhost:3000 en desarrollo
API_URL=             # http://localhost:8000 en desarrollo
```

### Backend — `backend/.env`
```bash
DATABASE_URL=        # mysql+pymysql://user:password@localhost:3306/dbname
JWT_SECRET=          # Mismo valor que NEXTAUTH_SECRET
```

---

## Instalación y uso

### Requisitos
- Node.js 20+
- Python 3.11+
- MySQL 8+

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# → http://localhost:8000
```

---

## Rutas disponibles

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing page |
| `/login` | Público | Formulario de inicio de sesión |
| `/dashboard` | Privado | Panel principal (requiere sesión) |

---

## .gitignore recomendado

```
# Entornos
.env
.env.local
.env*.local

# Next.js
frontend/.next/
frontend/node_modules/

# Python
backend/__pycache__/
backend/*.pyc
backend/venv/
```

---

## Próximamente

- [ ] Registro de usuarios
- [ ] Rutas adicionales en `(app)`
- [ ] Endpoints protegidos en FastAPI con verificación JWT
- [ ] Modelos adicionales en MySQL