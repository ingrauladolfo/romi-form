import { useLanguage, useTheme } from "../../common/context";
import { textSymptomForm } from "../../common/assets/data/components/SymptomForm";
import { SymptomForm } from "../../common/components";
import { useNavigate } from "react-router-dom";
import { getBaseButton, getButtonWebsiteLinks } from "../../common/assets/styles/Home";

const RegisterSymptoms = () => {
  const { lang } = useLanguage();
  const { theme } = useTheme(); // Obtener el tema desde el contexto
  const navigate = useNavigate();
  const t = textSymptomForm[lang] || textSymptomForm.en;

  return (
    <section className={`${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-950'}`}>
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center md:text-left w-full md:w-auto">
            {t.title}
          </h2>

          <div className="w-auto mx-auto md:w-auto">
            <button
              onClick={() => navigate(-1)}
              className={`${getBaseButton()} ${getButtonWebsiteLinks(theme === 'dark' ? 'dark' : 'light')} 
                w-48 
                text-center 
                text-xl md:text-base 
                px-6 md:px-3 
                py-3 md:py-2`}
            >
              {t.backButton}

            </button>
          </div>
        </div>
      </div>

      <SymptomForm theme={theme} /> {/* Pasar el tema como prop */}
    </section>
  );
};

export default RegisterSymptoms;
