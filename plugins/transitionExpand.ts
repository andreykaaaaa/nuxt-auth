import '@limonische/vue3-transition-expand/dist/style.css';
import TransitionExpand from '@limonische/vue3-transition-expand';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(TransitionExpand);
});
