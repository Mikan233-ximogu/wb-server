'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // router.resources('users', '/users', controller.test);
  router.get('/register', controller.home.register);
  router.get('/login', controller.home.login);
  router.get('/delete',controller.home.delete)
  router.get('/updataPassword',controller.home.alterPassword)
}

// app/router.js
// module.exports = (app) => {
//   const { router, controller } = app;
//   router.resources('users', '/users', controller.users);
// };
