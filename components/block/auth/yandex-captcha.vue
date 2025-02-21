<script lang="ts" setup>
import { YandexSmartCaptcha } from '@gladesinger/vue3-yandex-smartcaptcha';

const success = (token: string) => {
  console.log(token);
};

const expired = () => {
  console.log('expired');
};
</script>

<template>
  <ClientOnly>
    <YandexSmartCaptcha
      site-key="ysc1_vsmxlfvTVGajPRZUYbDeAb3YyXajaX6Np3I3vCLi37e38a0f"
      @on-success="success"
      @on-token-expired="expired"
    />
  </ClientOnly>
</template>

<style scoped lang="scss">

</style>
