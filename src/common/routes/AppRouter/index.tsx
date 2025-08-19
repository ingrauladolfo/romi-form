// src/router/AppRouter.tsx
import { lazy, Suspense, useEffect, useMemo, useRef, type ComponentType, type LazyExoticComponent, type FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context';
import { Loading, NotFound, UnderConstruction } from '../../components';
import MainLayout from '../../../pages/MainLayout';
import { pathToTitle, routeMap } from '../../assets/data/routes';
import { ProtectedRoutes } from '../ProtectedRoutes';

const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);

const AppRouter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const prevLang = useRef(lang);

  const currentPath = normalize(location.pathname);

  // Encuentra entrada por path (soporta sufijos: /base/... )
  const matchedRoute = useMemo(
    () =>
      pathToTitle.find((entry) => {
        const en = normalize(entry.path.en);
        const es = normalize(entry.path.es);
        return currentPath === en || currentPath === es || currentPath.startsWith(en + '/') || currentPath.startsWith(es + '/');
      }),
    [currentPath]
  );

  // Actualiza <title>
  useEffect(() => {
    document.title = matchedRoute
      ? matchedRoute.title[lang]
      : lang === 'en'
      ? 'Error | Page not found'
      : 'Error | Página no encontrada';
  }, [matchedRoute, lang]);

  // Redirige la ruta localizada al cambiar idioma (preserva sufijo, search y hash)
  useEffect(() => {
    if (prevLang.current === lang) return;
    const fromLang = prevLang.current as 'en' | 'es';
    const toLang = lang as 'en' | 'es';

    const entry = pathToTitle.find((e) => {
      const fromPath = normalize(e.path[fromLang]);
      return fromPath && (currentPath === fromPath || currentPath.startsWith(fromPath + '/'));
    });

    if (entry) {
      const fromBase = normalize(entry.path[fromLang]);
      const toBase = normalize(entry.path[toLang]) || '/';
      // suffix (incluye cualquier segmento extra)
      const suffix = currentPath.length > fromBase.length ? currentPath.slice(fromBase.length) : '';
      const newPath = toBase + suffix + location.search + location.hash;

      const fullCurrent = currentPath + location.search + location.hash;
      if (newPath !== fullCurrent) {
        navigate(newPath, { replace: true });
      }
    }

    prevLang.current = lang;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, currentPath, navigate, location.search, location.hash]);

  // Carga dinámica del componente según ruta encontrada
  const LoaderComponent: LazyExoticComponent<ComponentType<any>> = useMemo(() => {
    if (!matchedRoute) return lazy(() => Promise.resolve({ default: NotFound }));

    const loader = routeMap[matchedRoute.path.en] || routeMap[matchedRoute.path.es];

    if (!loader) return lazy(() => Promise.resolve({ default: UnderConstruction }));

    return lazy(loader);
  }, [matchedRoute]);

  const LoadingFallback = useMemo(() => <Loading />, []);

  return (
    <Suspense fallback={LoadingFallback}>
      <Routes>
        <Route
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="*" element={<LoaderComponent />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { AppRouter };
