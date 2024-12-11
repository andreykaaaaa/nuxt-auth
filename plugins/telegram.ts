export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?21';
        script.async = true;

        script.onload = () => {
            console.log('Telegram SDK loaded');
        };

        script.onerror = () => {
            console.error('Failed to load Telegram SDK');
        };

        document.head.appendChild(script);
    }
});
