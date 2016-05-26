'use strict';

module.exports = {
  angularSCSSPath: [
                     'node_modules/angular-material/angular-material.scss'
                   ],
  appFiles:        'client/**/*',
  assetsPath:      'client/app/assets/',
  distFolder:      'dist',
  htmlPath:        'client/app/**/*.html',
  imgsPath:        'client/app/assets/imgs/',
  indexLibPath:    'client/index.html',
  jsPath:          'client/app/**/*.js',
  jsFirstPath:     'client/*.js',
  jsLibPath:       [
                   //Not using all angular-* dependencies, but this makes my life easier
                     'node_modules/angular*/angular*.min.js',
                     'node_modules/angular*/angular*.min.js.map'
                   ],
  scssPath:        'client/app/assets/style/*.scss'
};
