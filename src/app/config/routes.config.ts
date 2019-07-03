const basePaths = {
  professors: 'professors',
  students: 'students',
  subjects: 'subjects'
};

const routesNames = {
  home: '',
  error404: '404',
  professors: {
    basePath: basePaths.professors
  },
  students: {
    basePath: basePaths.students
  },
  subjects: {
    basePath: basePaths.subjects
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `${routesNames.home}`,
    error404: `${routesNames.error404}`
  }
};
