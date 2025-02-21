export default defineNuxtRouteMiddleware((to) => {
  if (!to.meta.layout) {
    to.meta.layout = 'personal';
  }
});
