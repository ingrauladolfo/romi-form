import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage, useTheme } from '../../../context';

const NotFound: FC = () => {
    const { lang } = useLanguage();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const messages = {
        es: { title: 'Página no encontrada', buttonHome: 'Volver al inicio', buttonBack: 'Regresar', },
        en: { title: 'Page not found', buttonHome: 'Go home', buttonBack: 'Go back', },
    };

    const { title, buttonHome, buttonBack } = messages[lang];
    const bgClass = theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-100 text-gray-950';
    const btnBase = `px-6 py-3 border-3 rounded-full shadow transition-colores transform relative overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:z-[-1] before:transition-all before:duration-700 before:ease-in-out hover:before:w-full`;
    const btnHomeClass = `${btnBase} ${theme === 'dark' ? 'bg-gray-950 border-red-600 text-gray-100 hover:text-gray-950 hover:border-amber-600 before:bg-amber-300 hover:scale-105' : 'bg-gray-100 border-amber-300 text-gray-950 hover:text-gray-100 hover:border-red-300 before:bg-red-600 hover:scale-105'}`;
    const btnBackClass = `${btnBase} ${theme === 'dark' ? 'bg-gray-950 border-amber-300 text-gray-9500 hover:text-gray-100 hover:border-red-300 before:bg-red-600 hover:scale-105' : 'bg-gray-100 border-red-600 text-gray-950 hover:text-gray-9500 hover:border-amber-600 before:bg-amber-300 hover:scale-105'} `
    return (
        <div className={`flex flex-col items-center justify-center h-screen p-4 ${bgClass}`}>
            <motion.h1 className="text-6xl font-bold mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                404
            </motion.h1>
            <motion.p className="text-xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, scale: [1, 1.1, 1] }} transition={{ delay: 0.3, repeat: Infinity, duration: 2 }}>
                {title}
            </motion.p>
            <div className="flex gap-4">
                <Link to="/" className={`${btnBase} ${btnHomeClass}`}>
                    {buttonHome}
                </Link>
                <button onClick={() => navigate(-1)} className={`${btnBase} ${btnBackClass}`}>
                    {buttonBack}
                </button>
            </div>
        </div>
    );
};

export default NotFound;
