// src/data/dataLinksNavbar.tsx

import type { PathToTitle } from "../../../interfaces/routes";
const pathToTitle: PathToTitle[] = [
  { path: { en: '/', es: '/' }, title: { en: "Home | ROMI", es: "Inicio | ROMI"} },
  { path: { en: '/register-symptoms', es: '/registrar-sintomas' }, title: { en: "Register symptoms | ROMI", es: "Registar síntomas | ROMI" } },
  { path: { en: '/list-symptoms', es: '/ver-sintomas' }, title: { en: "List symptoms | ROMI", es: "Ver síntomas | ROMI" } },
];
export { pathToTitle }