<script setup lang="ts">
import type { NavbarElementsType } from '~/api/entity/Navbar';

const router = useRouter();
const route = useRoute();
const elements: NavbarElementsType[] = [
  { id: 1, name: 'Компоненты', to: 'components' },
  { id: 2, name: 'Личный кабинет', to: 'personal-cabinet' }
];
function navigateTo(to: string) {
  const fullPath = to.startsWith('/') ? to : `/${to}`;
  if (to !== route.name) router.push({ path: fullPath });
}
</script>

<template>
  <div class="navbar">
    <block-auth-logo
      :size="24"
      class="navbar__logo"
      @click="navigateTo('/')"
    />
    <div class="navbar__menu">
      <div
        class="navbar__menu__element"
        v-for="item in elements"
        :key="item.id"
        @click="navigateTo(item.to)"
      >
        <h3>{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  color: #FFF8F7;

  &__logo {
    align-self: flex-start;
    cursor: pointer;
  }

  &__menu {
    display: flex;
    gap: 20px;
    flex-grow: 1;
    justify-content: center;

    &__element {
      padding: 10px 15px;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #007bff;
      }
    }
  }
}
</style>
