const basePaths = {
  professors: 'professors'
};

const routesNames = {
  home: '',
  error404: '404',
  professors: {
    basePath: basePaths.professors
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `${routesNames.home}`,
    error404: `${routesNames.error404}`
  }
};
