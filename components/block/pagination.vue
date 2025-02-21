<script setup lang="ts">
import type { Fact } from '~/api/entity/Facts';
import axios from 'axios';

const props = defineProps<{ paginationType: 'page' | 'offset' | 'infinite-scroll' }>();
const items = ref<Fact[]>([]);
const page = ref(1);
const limit = ref(10);
const count = ref(0);
const offset = ref(0);
const isLoading = ref(false);
const hasMore = ref(true);
const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const itemHeight = ref(50);
const bufferSize = 5;

const totalPages = computed(() => Math.ceil(count.value / limit.value));
const visibleCount = computed(() => Math.ceil((containerRef.value?.clientHeight || 500) / itemHeight.value) + bufferSize);
const startIndex = computed(() => Math.max(0, Math.floor(scrollTop.value / itemHeight.value)));
const endIndex = computed(() => Math.min(startIndex.value + visibleCount.value, items.value.length));
const visibleItems = computed(() => items.value.slice(startIndex.value, endIndex.value));

const fetchItemsByPage = async () => {
  const response = await axios.get('http://localhost:8000/facts/page', {
    params: { page: page.value, limit: limit.value }
  });
  items.value = response.data.results;
  count.value = response.data.count;
};

const fetchItemsByOffset = async () => {
  if (!hasMore.value || isLoading.value) return;
  isLoading.value = true;

  try {
    const response = await axios.get('http://localhost:8000/facts/offset', {
      params: { offset: offset.value, limit: limit.value }
    });

    items.value = [...items.value, ...response.data.results];
    count.value = response.data.count;
    offset.value += limit.value;
    hasMore.value = offset.value < count.value;
  } finally {
    isLoading.value = false;
  }
};

const goToPage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchItemsByPage();
  }
};

const getPageButtons = computed(() => {
  const current = page.value;
  const pages = totalPages.value;
  const visiblePages = 5;
  let start = Math.max(1, current - Math.floor(visiblePages / 2));
  const end = Math.min(pages, start + visiblePages - 1);
  if (end - start < visiblePages - 1) {
    start = Math.max(1, end - visiblePages + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const onScroll = () => {
  if (!containerRef.value) return;
  scrollTop.value = containerRef.value.scrollTop;
  const bottomReached = containerRef.value.scrollTop + containerRef.value.clientHeight >= containerRef.value.scrollHeight - 100;

  if (bottomReached) {
    fetchItemsByOffset();
  }
};

watch(() => props.paginationType, (newType) => {
  items.value = [];
  offset.value = 0;
  hasMore.value = true;

  if (newType === 'page') fetchItemsByPage();
  if (newType === 'offset') fetchItemsByOffset();
  if (newType === 'infinite-scroll') {
    fetchItemsByOffset();
    nextTick(() => containerRef.value?.addEventListener('scroll', onScroll));
  }
});

onMounted(() => {
  if (props.paginationType === 'page') fetchItemsByPage();
  if (props.paginationType === 'offset') fetchItemsByOffset();
  if (props.paginationType === 'infinite-scroll') {
    fetchItemsByOffset();
    nextTick(() => {
      const firstItem = containerRef.value?.querySelector('.item');
      if (firstItem) {
        itemHeight.value = firstItem.getBoundingClientRect().height;
      }
    });
  }
});

onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <div>
    <div v-if="props.paginationType === 'page'">
      <div
        v-for="item in items"
        :key="item.id"
      >
        <block-cart
          :fact="item.fact"
          :category="item.category"
        />
      </div>
      <div class="pagination">
        <button
          @click="goToPage(page - 1)"
          v-if="page !== 1"
        >
          Назад
        </button>
        <button
          v-for="btn in getPageButtons"
          :key="btn"
          @click="goToPage(btn)"
          :class="{ active: btn === page }"
        >
          {{ btn }}
        </button>
        <button
          @click="goToPage(page + 1)"
          v-if="page !== totalPages"
        >
          Вперед
        </button>
      </div>
    </div>

    <div v-else-if="props.paginationType === 'offset'">
      <div
        v-for="item in items"
        :key="item.id"
      >
        <block-cart
          :fact="item.fact"
          :category="item.category"
        />
      </div>
      <button
        v-if="hasMore && !isLoading"
        @click="fetchItemsByOffset"
      >
        Показать еще
      </button>
    </div>

    <div
      v-else-if="props.paginationType === 'infinite-scroll'"
      ref="containerRef"
      class="scroll-container"
    >
      <div
        class="spacer"
        :style="{ height: `${items.length * itemHeight}px` }"
      />
      <div class="virtual-list">
        <div
          v-for="(item) in visibleItems"
          :key="item.id"
          class="item"
          :style="{ transform: `translateY(${itemHeight * items.indexOf(item)}px)`, height: `${itemHeight}px` }"
        >
          <block-cart
            :fact="item.fact"
            :category="item.category"
          />
        </div>
      </div>
      <p v-if="isLoading">
        Загрузка...
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  &:hover { background-color: #007bff; color: white; }
  &:disabled { background-color: #e0e0e0; color: #888; border-color: #ccc; cursor: not-allowed; }
}

.scroll-container {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
}

.spacer {
  position: absolute;
  width: 100%;
}

.virtual-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
