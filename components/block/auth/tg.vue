<script lang="ts" setup>
const paramsTg = {
  bot_id: '7702279561:AAGC3JH1zOdL5xNg4qQ-9ex3WOr_Kww-r40',
  origin: 'https://aurivis.ru',
  embed: 1,
  request_access: 'write',
  return_to: 'https://aurivis.ru',
};

const urlTg = `https://oauth.telegram.org/auth?${new URLSearchParams(
    Object.fromEntries(
        Object.entries(paramsTg).map(([key, value]) => [key, String(value)])
    )
).toString()}`;

const tgData = ref<Record<string, string | string[]>>({});
onMounted(() => {
  const route = useRoute();

  if (route.query) {
    tgData.value = Object.fromEntries(
        Object.entries(route.query).map(([key, value]) => [
          key,
          Array.isArray(value) ? value : String(value),
        ])
    ) as Record<string, string | string[]>;
  }
});
console.log(tgData)

</script>
<template>
  <div>
    <a :href="urlTg">Авторизоваться в Telegram</a>
    <div v-if="tgData">
      <p><strong>ID пользователя:</strong> {{ tgData.id }}</p>
      <p><strong>Хеш авторизации:</strong> {{ tgData.hash }}</p>
    </div>
  </div>
</template>
