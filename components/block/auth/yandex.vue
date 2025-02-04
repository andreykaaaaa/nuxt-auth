<script setup>
const router = useRouter();
function yandexRender() {
  if (window.YaAuthSuggest) {
    window.YaAuthSuggest.init(
      {
        client_id: 'f6b0179cf87a49c497a49976c3143e87',
        response_type: 'token',
        redirect_uri: 'http://localhost/auth/handler'
      },
      'http://localhost/',
      {
        view: 'button',
        parentId: 'yandexSdkButton',
        buttonSize: 'xs',
        buttonView: 'icon',
        buttonTheme: 'dark',
        buttonBorderRadius: '10',
        buttonIcon: 'ya'
      }
    )
      .then(result => result.handler())
      .then(data => router.push(`/?token=${data.access_token}`))
      .catch(error => console.log('Обработка ошибки', error));
  } else {
    console.error('YaAuthSuggest не определен');
  }
}
useHead({
  script: [
    {
      src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js',
      onload: () => yandexRender()
    }
  ]
});
</script>

<template>
  <div id="yandexSdkButton" />
</template>

<style scoped lang="scss">

</style>
