<script setup>
import * as VKID from '@vkid/sdk';
import { handleError } from 'vue';

const codeVerifier = localStorage.getItem('vk_code_verifier') || generateCodeVerifier();
localStorage.setItem('vk_code_verifier', codeVerifier);

const codeChallenge = await generateCodeChallenge(codeVerifier);
onMounted(() => {
  const oAuthList = new VKID.OAuthList();
  const container = document.getElementById('VkIdSdkList');
  const oauthListNames = [
    VKID.OAuthName.VK,
    VKID.OAuthName.MAIL,
    VKID.OAuthName.OK
  ];
  if (container) {
    oAuthList.render({ container, oauthList: oauthListNames, scheme: VKID.Scheme.DARK, lang: VKID.Languages.RUS })
      .on(VKID.WidgetEvents.ERROR, handleError);
    VKID.Config.init({
      app: 52834948,
      redirectUrl: 'http://localhost/',
      state: 'h6OODeFFYT6MwHOmQ0MOGrnN3Lsh4Vbaolp4bVO20kI',
      codeVerifier,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      scopes: 'email phone friends wall groups stories docs photos ads video status market pages notifications stats notes'
    });
  }
});
function generateCodeVerifier() {
  const length = 50;
  const allowedChars
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map(byte => allowedChars[byte % allowedChars.length])
    .join('');
}
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64 = btoa(String.fromCharCode(...hashArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64;
}
</script>

<template>
  <div id="VkIdSdkList" />
</template>

<style>

</style>
