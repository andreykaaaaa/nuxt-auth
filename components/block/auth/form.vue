<script setup lang="ts">

</script>

<template>
  <div class="container">
    <form name="form1" class="container__form" onsubmit="return checkStuff()">
      <div class="container__form__header">
        <div class="container__form__header__title">
          <h4>Admin</h4>
          <span>Dashboard</span>
        </div>
        <div class="container__form__header__description">
          <h5>Sign in to your account</h5>
        </div>
      </div>
      <div class="container__form__body">
        <div class="container__form__body__inputs">
          <ui-input id="login" placeholder="Логин" autocomplete="off" class="container__form__body__inputs__input"/>
          <ui-input id="password" placeholder="Пароль" autocomplete="off" class="container__form__body__inputs__input"/>
        </div>
        <div class="container__form__body__actions">
          <label>
            <input type="checkbox">
            <small class="rmb">Remember me</small>
          </label>
          <a href="#">Forget Password?</a>
        </div>
        <button class="btn1">
          Войти через тг
        </button>
      </div>
    </form>
    <a href="#" class="dnthave">Don’t have an account? Sign up</a>
  </div>
</template>

<style scoped lang="scss">
.container {
  top: 50px;
  left: 50%;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  background-color: rgb( 33, 41, 66 );
  border-radius: 9px;
  width: 400px;
  height: 500px;
  box-shadow: 1px 1px 108.8px 19.2px rgb(25,31,53);

  &__form {
    width: 90%;
    margin: 0 auto;
    &__header {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 60px 20px;
      gap: 20px;
      &__title {
        font-size: 24px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        & h4 {
          color: #5c6bc0;
        }
        & span {
          color: #dfdeee;
        }
      }
      &_description {
        font-size: 13px;
        color: #a1a4ad;
        letter-spacing: 1.5px;
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
      &__actions {
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        & label {
          color: #dfdeee;
        }
        & a {
          position: relative;
          float: right;
          right: 28px;
          color: #5c7fda;
        }
      }
    }
  }
}

.btn1 {
  border:0;
  background: #7f5feb;
  color: #dfdeee;
  border-radius: 100px;
  width: 340px;
  height: 49px;
  font-size: 16px;
  position: absolute;
  top: 79%;
  left: 8%;
  transition: 0.3s;
  cursor: pointer;
}

.btn1:hover {
  background: #5d33e6;
}

.dnthave{
  position: absolute;
  top: 92%;
  left: 24%;
}


.typcn.active {
  color: #7f60eb;
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