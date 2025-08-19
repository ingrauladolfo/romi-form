// src/components/ProtectedRoute.tsx
import {  useEffect, useState, type ReactNode } from 'react';
import Loading from '../../components/shared/Loading';

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula delay y protección de ruta (puede ser lógica personalizada sin context)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <Loading /> : <>{children}</>;
};

export { ProtectedRoutes};
