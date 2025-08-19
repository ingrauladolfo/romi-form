import { useLocation } from 'react-router-dom';
import { getThemeLoadingClasses } from '../../../assets/styles/Loading';
import { pathToTitle } from '../../../assets/data/routes';
import { useLanguage, useTheme } from '../../../context';

const Loading = () => {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const { lang } = useLanguage();  // Obtiene el idioma desde el contexto
  const { textLoading, spinnerLoading } = getThemeLoadingClasses(theme);

  // Buscar coincidencia en pathToTitle usando el idioma actual
  const matched = pathToTitle.find(p => p.path[lang] === pathname);

  // Si no hay coincidencia, mostrar 'Error'
  const title = matched ? matched.title[lang].split('|')[0].trim() : 'Error';  // Modificado para que diga "Error" si no hay coincidencia

  return (
    <div className={`        flex flex-col items-center justify-center         w-full h-screen gap-6 text-center        ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
      <div className={`w-12 h-12 border-4 rounded-full animate-spin ${spinnerLoading}`} />
      <p className={`text-lg ${textLoading}`}>
        {lang === 'es' ? 'Cargando' : 'Loading'} {title}
      </p>
    </div>
  );
};

export default Loading;
