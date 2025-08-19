import { useEffect, useState } from 'react';
import { useLanguage, useTheme } from '../../common/context';
import { useNavigate } from 'react-router-dom';
import type { Symptom } from '../../common/interfaces/pages/shared';
import type { Prescription } from '../../common/interfaces/pages/PrescriptionsLIsts';
import { PrescriptionsTable } from '../../common/components';
import { api } from '../../common/assets/api';
import { prescriptionsTableText } from '../../common/assets/data/components/PrescriptionsTable';
import { getBaseButton, getButtonWebsiteLinks } from '../../common/assets/styles/Home';


const PrescriptionsLists = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { lang } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const t = prescriptionsTableText[lang] ?? prescriptionsTableText.en;

  useEffect(() => {
    api
      .get<Prescription[]>('prescription')
      .then((response) => setPrescriptions(response.data))
      .catch(() => setError('Error al cargar las prescripciones.'))
      .finally(() => setLoading(false));

    api
      .get<Symptom[]>('symptoms')
      .then((response) => setSymptoms(response.data))
      .catch((err) => console.error('Error al cargar los síntomas:', err));
  }, []);

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className={`${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-950'} p-6`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-3xl font-bold">
          {t.title}
        </h2>

        <button
          onClick={() => navigate(-1)}
          className={`${getBaseButton()} ${getButtonWebsiteLinks(theme === 'dark' ? 'dark' : 'light')} 
                w-48 
                text-center 
                text-xl md:text-base 
                px-6 md:px-3 
                py-3 md:py-2`}        >
          {t.buttonBack}
        </button>
      </div>

      {/* Tabla como componente separado */}
      <PrescriptionsTable
        prescriptions={prescriptions}
        symptoms={symptoms}
        lang={lang}
        theme={theme}
      />
    </section>
  );
};

export default PrescriptionsLists;
