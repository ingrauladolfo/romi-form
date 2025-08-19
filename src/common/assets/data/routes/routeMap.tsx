const routeMap: Record<string, () => Promise<any>> = {
  '/': () => import('../../../../pages/Home'),
  '/register-symptoms': () => import('../../../../pages/Register-Sypmtoms'),
  '/registrar-sintomas': () => import('../../../../pages/Register-Sypmtoms'),
  '/list-symptoms': () => import('../../../../pages/PrescriptionsLists'),
  '/ver-sintomas': () => import('../../../../pages/PrescriptionsLists'),

};

export { routeMap }