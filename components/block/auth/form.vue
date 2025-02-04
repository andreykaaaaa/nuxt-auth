<script setup lang="ts">
export type EntityLoginResponse = {
  id: number;
  username: string;
  email: string;
  bio: string;
  image: string;
  accessToken: string;
};
const router = useRouter();
const isAuth = ref(false);
const authForm = reactive({
  user: {
    email: '',
    password: ''
  }
});
const registrationForm = reactive({
  user: {
    last_name: '',
    first_name: '',
    email: '',
    password: ''
  }
});

function toogleForm() {
  isAuth.value = !isAuth.value;
}
function login() {
  $fetch<EntityLoginResponse>('http://localhost:8000/users/login', {
    method: 'POST',
    body: authForm,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res && res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      router.push({ path: '/' });
    })
    .catch((error) => {
      console.error('Ошибка входа:', error);
    });
}
function register() {
  $fetch<EntityLoginResponse>('http://localhost:8000/users', {
    method: 'POST',
    body: registrationForm,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res && res.accessToken) {
        localStorage.setItem('accessToken', res.accessToken);
      }
      router.push({ path: '/' });
    })
    .catch((error) => {
      console.error('Ошибка входа:', error);
    });
}
async function loginWithGoogle() {
  window.location.href = 'http://localhost:8000/google';
}
</script>

<template>
  <div class="container">
    <form
      v-if="!isAuth"
      name="form1"
      class="container__form"
      @submit.prevent="login"
    >
      <div class="container__form__header">
        <div class="container__form__header__title">
          <h4>Admin</h4>
          <span>Dashboard</span>
        </div>
        <div class="container__form__header__description">
          <h5>Войдите с помощью вашего аккаунта</h5>
        </div>
      </div>
      <div class="container__form__body">
        <div class="container__form__body__inputs">
          <ui-input
            id="email"
            placeholder="Почта"
            autocomplete="off"
            class="container__form__body__inputs__input"
            v-model="authForm.user.email"
          />
          <ui-input
            id="password"
            placeholder="Пароль"
            autocomplete="off"
            class="container__form__body__inputs__input"
            v-model="authForm.user.password"
          />
        </div>
      </div>
      <div class="container__form__actions">
        <ui-button>
          Войти
        </ui-button>
      </div>
      <div class="container__form__social">
        <block-auth-vk />
        <block-auth-yandex />
        <button @click="loginWithGoogle">
          Google
        </button>
      </div>
      <div class="container__form__footer">
        <p>
          Нет аккаунта? <a
            href="#"
            @click.prevent="toogleForm"
          >Зарегистрироваться</a>
        </p>
      </div>
    </form>

    <form
      v-else
      name="form2"
      class="container__form"
      @submit.prevent="register"
    >
      <div class="container__form__header">
        <div class="container__form__header__title">
          <h4>Admin</h4>
          <span>Dashboard</span>
        </div>
        <div class="container__form__header__description">
          <h5>Создайте новый аккаунт</h5>
        </div>
      </div>
      <div class="container__form__body">
        <div class="container__form__body__inputs">
          <ui-input
            id="newEmail"
            placeholder="Почта"
            autocomplete="off"
            class="container__form__body__inputs__input"
            v-model="registrationForm.user.email"
          />
          <ui-input
            id="newLastName"
            placeholder="Имя пользователя"
            autocomplete="off"
            class="container__form__body__inputs__input"
            v-model="registrationForm.user.last_name"
          />
          <ui-input
            id="newFirstName"
            placeholder="Фамилиия пользователя"
            autocomplete="off"
            class="container__form__body__inputs__input"
            v-model="registrationForm.user.first_name"
          />
          <ui-input
            id="newPassword"
            placeholder="Пароль"
            autocomplete="off"
            class="container__form__body__inputs__input"
            v-model="registrationForm.user.password"
          />
        </div>
      </div>
      <div class="container__form__actions">
        <ui-button>
          Зарегистрироваться
        </ui-button>
      </div>
      <div class="container__form__footer">
        <p>
          Уже есть аккаунт? <a
            href="#"
            @click.prevent="toogleForm"
          >Войти</a>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container {
  text-align: center;
  background-color: rgba(35, 33, 68, 0.8);
  border-radius: 9px;
  width: min(360px, 100vw);
  height: max-content;
  box-shadow: 10px 14px 15px rgba(0, 0, 0, 0.6);
  padding: 20px;

  &__form {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    &__header {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 30px 20px;
      gap: 10px;
      &__title {
        font-size: 32px;
        font-style: italic;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        & h4 {
          color: #fff;
        }
        & span {
          color: #9fa7d7;
        }
      }
      &__description {
        & h5 {
          font-size: 16px;
          color: #9fa7d7;
        }
      }
    }
    &__body {
      &__inputs {
        width: 100%;
        margin: 0 auto;
        &__input {
          margin: 20px auto;
        }
      }
    }
    &__social {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &__footer {
      padding: 15px 0;
      p {
        color: #fff;
      }
      a {
        color: #9fa7d7;
      }
    }
  }
}

.error {
  background: #ff3333;
  text-align: center;
  width: 337px;
  height: 20px;
  padding: 2px;
  border: 0;
  border-radius: 5px;
  margin: 10px auto 10px;
  position: absolute;
  top: 31%;
  left: 7.2%;
  color: white;
  display: none;
}
</style>
