<script setup lang="ts">
import axios from 'axios';

type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  about: string | null;
  bdate: string | null;
  mobile_phone: string | null;
  university: number | null;
  faculty: number | null;
  graduation: number | null;
  sex: number | null;
  screen_name: string | null;
  photo: string | null;
  password: string | null;
  home_phone: string | null;
  university_name: string | null;
  faculty_name: string | null;
  education_form: string | null;
  education_status: string | null;
  can_access_closed: boolean | null;
  is_closed: boolean | null;
};

const user = reactive({} as UserData);
const router = useRouter();
const route = useRoute();
const code = route.query.code as string;
const state = route.query.state as string;
const deviceId = route.query.device_id as string;
const yandexToken = route.query.token as string;
const codeVerifier = ref('');
onMounted(() => {
  codeVerifier.value = localStorage.getItem('vk_code_verifier')!;
  const payload = {
    code_verifier: codeVerifier.value,
    code,
    device_id: deviceId,
    state
  };
  axios.post('http://localhost:8000/yandex', { token: yandexToken }).then(res => Object.assign(user, res.data));
  if (codeVerifier.value && payload.code) {
    try {
      axios.post('http://localhost:8000/vk', payload).then(res => Object.assign(user, res.data));
    } catch (error) {
      console.error('Error sending data to backend:', error);
      throw error;
    }
  } else {
    console.error('Code verifier is not available in localStorage.');
  }
});
async function getUserInfo() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.log('Токен не найден. Пользователь не авторизован.');
    return;
  }

  $fetch('http://localhost:8000/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      Object.assign(user, res);
      console.log(res);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных пользователя:', error);
    });
}
await getUserInfo();
function logout() {
  localStorage.removeItem('accessToken');
  router.push({ path: '/auth' });
}
definePageMeta({
  layout: 'personal'
});
</script>

<template>
  <div
    class="profile"
    v-if="user"
  >
    <block-auth-logo />
    <ui-frame>
      <div class="profile__layout">
        <div class="profile__header">
          <img
            :src="user.photo || '/noAva.jpg'"
            alt="Profile Photo"
            class="profile__header__photo"
          />
          <div class="profile__header__info">
            <h1>{{ user.first_name || 'Не указано' }} {{ user.last_name || 'Не указано' }}</h1>
            <p><strong>Никнейм: </strong> @{{ user?.screen_name || 'Не указано' }}</p>
          </div>
        </div>

        <div class="profile__details">
          <ui-frame
            title="Личная информация"
            class="profile__details__frame"
          >
            <ul>
              <li><strong>Дата рождения:</strong> {{ user?.bdate || 'Не указано' }}</li>
              <li><strong>Пол:</strong> {{ user?.sex === 2 ? 'Мужской' : 'Женский' }}</li>
            </ul>
          </ui-frame>

          <ui-frame
            title="Образование"
            class="profile__details__frame"
          >
            <ul>
              <li><strong>Университет:</strong> {{ user?.university_name || 'Не указано' }}</li>
              <li><strong>Институт:</strong> {{ user?.faculty_name || 'Не указано' }}</li>
              <li><strong>Форма обучения:</strong> {{ user?.education_form || 'Не указано' }}</li>
              <li><strong>Год выпуска:</strong> {{ user?.graduation || 'Не указано' }}</li>
            </ul>
          </ui-frame>

          <ui-frame
            title="Контакты"
            class="profile__details__frame"
          >
            <ul>
              <li><strong>Мобильный телефон:</strong> {{ user?.mobile_phone || 'Не указан' }}</li>
              <li><strong>Почта:</strong> {{ user?.email || 'Не указана' }}</li>
            </ul>
          </ui-frame>

          <ui-frame
            title="О пользователе"
            class="profile__details__frame"
          >
            <p>{{ user?.about || 'Не указано' }}</p>
          </ui-frame>
        </div>
      </div>
      <div class="profile__button">
        <ui-button @click="logout">
          Выйти
        </ui-button>
      </div>
    </ui-frame>
  </div>
  <div v-else>
    <p>Загрузка</p>
  </div>
</template>

<style scoped lang="scss">
.profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  .auth-logo {
    margin-bottom: 50px;
  }

  &__layout {
    display: flex;
    gap: 30px;
  }

  &__header {
    flex: 0 0 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    &__photo {
      width: 350px;
      height: 450px;
      border-radius: 20px;
      object-fit: cover;
      object-position: center;
    }
    &__info {
      & h1, p {
        color: #e5e7eb;
      }
    }
  }

  &__details {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    & li {
      list-style: none;
    }

    &__frame {
      flex: 1 1 calc(50% - 20px);
      min-width: 300px;
    }
  }
  &__button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
