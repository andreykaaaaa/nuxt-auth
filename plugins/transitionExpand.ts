import TransitionExpand from '@limonische/vue3-transition-expand';
import '@limonische/vue3-transition-expand/dist/style.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TransitionExpand);
});
