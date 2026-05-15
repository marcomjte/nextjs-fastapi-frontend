// types/api.ts  ← fuente única de verdad
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  access_token: string;
}

// A medida que crezcas, agregás acá:
// export interface Product { ... }
// export interface Order { ... }