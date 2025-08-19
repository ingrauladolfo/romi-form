import { pathToTitle } from "../assets/data/routes";

export const getPath = (basePath: string, lang: 'en' | 'es'): string => {
    const route = pathToTitle.find(p => p.path.en === basePath); // Buscar la ruta por el nombre en inglés
    return route ? route.path[lang] ?? basePath : basePath;
};
