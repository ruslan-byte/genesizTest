<template>
  <div class="main-page">
    <div class="main-page__container">
      <h2 class="main-page__title">Тестовое задание</h2>
      <div class="main-page__filter">
        <gSelect :options="select.options" v-model="select.activeID"></gSelect>
        <gButton
          class="main-page__button"
          @click="createItem"
          :isLoading="isLoading"
          >Создать</gButton
        >
      </div>
      <div class="main-page__result">
        <ul>
          <li v-for="item of resultList">{{ item.label }} #{{ item.id }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import gButton from "@/components/gButton.vue";
import gSelect from "@/components/gSelect.vue";
import { onMounted } from "vue";
import { useStore } from "@/store/index";
import { storeToRefs } from "pinia";
const store = useStore();
const { select, resultList, isLoading } = storeToRefs(store);
const { createItem, getToken } = store;
onMounted(() => {
  getToken();
});
</script>

<style lang="scss">
body {
  color: rgb(40, 40, 40);
  font-family: sans-serif;
}
.main-page {
  &__title {
    font-size: 48px;
    margin-top: 12px;
    margin-bottom: 48px;
  }
  &__container {
    max-width: 1024px;
    padding-block: 16px;
    margin: 0 auto;
  }

  &__filter {
    display: flex;
    gap: 20px;
    margin-bottom: 32px;
  }
  &__result {
    border: 1px solid grey;
    min-height: 100px;
    border-radius: 6px;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      padding: 12px;
      &:hover {
        background: #009ddb5f;
        color: white;
      }
    }
  }
}
</style>
