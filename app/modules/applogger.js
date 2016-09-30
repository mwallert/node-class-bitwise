'use strict';

module.exports = (environment) => {
  return function (req, res, next){
    console.log(environment === 'dev' ? 'This is from the dev environment' : 'This is from the production environment');
    next();
  };
};
