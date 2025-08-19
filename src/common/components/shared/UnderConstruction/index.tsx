import { getTextPrimary, getTextSecondary } from "../../../assets/styles/UnderConstruction";
import { useLanguage, useTheme } from "../../../context";

const UnderConstruction = () => {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const title = lang === 'es' ? '🚧 Página en construcción' : '🚧 Page Under Construction';
  const message = lang === 'es' ? 'Estamos trabajando en esta sección. Vuelve pronto.' : 'We are working on this section. Please check back soon.';
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <h1 className={`text-3xl font-semibold ${getTextPrimary(theme)}`}>
        {title}
      </h1>
      <p className={`text-lg ${getTextSecondary(theme)}`}>
        {message}
      </p>
    </div>
  );
};

export default UnderConstruction;
