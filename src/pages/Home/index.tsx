import { useEffect, useState } from 'react';
import { api } from '../../common/assets/api';
import type { User } from '../../common/interfaces/pages/Home';
import { useLanguage, useTheme } from '../../common/context';
import { getBaseButton, getButtonWebsiteLinks } from '../../common/assets/styles/Home';
import { Loading } from '../../common/components';
import { getPath } from '../../common/utils/getPath';
import { homeText } from '../../common/assets/data/pages';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const { theme } = useTheme();
  const { lang } = useLanguage();
  const t = homeText[lang] || homeText.en; // ⬅️ Elegir idioma, fallback inglés

  useEffect(() => {
    api.get<User[]>('users')
      .then(res => {
        if (res.data.length > 0) {
          setUser(res.data[0]);
        }
      })
      .catch(err => {
        console.error('Error al obtener usuario:', err);
      });
  }, []);

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <h1 className="mb-8 text-center text-5xl font-bold flex items-center justify-center">
        {t.welcome} {user.name}
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        <a
          href={getPath('/register-symptoms', lang)}
          className={`
            ${getBaseButton()} 
            ${getButtonWebsiteLinks(theme)}  
            w-48 
            text-center 
            text-xl 
            px-6 
            py-3
          `}
        >
          {t.registerSymptoms}
        </a>

        <a
          href={getPath('/list-symptoms', lang)}
          className={`
            ${getBaseButton()} 
            ${getButtonWebsiteLinks(theme)}  
            w-48 
            text-center 
            text-xl 
            px-6 
            py-3
          `}
        >
          {t.viewSymptoms}
        </a>
      </div>
    </div>
  );
};

export default Home;
