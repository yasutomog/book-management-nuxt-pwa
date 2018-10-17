export default async ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    console.log('app.router.beforeEach')
    next()
  });
  app.router.afterEach((to, from) => {
    console.log('app.router.afterEach')
  });
};
