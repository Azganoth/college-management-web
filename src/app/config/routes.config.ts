const basePaths = {
  professors: 'professors',
  students: 'students'
};

const routesNames = {
  home: '',
  error404: '404',
  professors: {
    basePath: basePaths.professors
  },
  students: {
    basePath: basePaths.students
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `${routesNames.home}`,
    error404: `${routesNames.error404}`
  }
};
