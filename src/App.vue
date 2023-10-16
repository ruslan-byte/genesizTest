<template>
  <div class="main-page">
    <div class="main-page__container">
      <h2 class="main-page__title">Тестовое задание</h2>
      <div class="main-page__filter">
        <gSelect :options="select.options" v-model="select.activeID"></gSelect>
        <gButton class="main-page__button" @click="api.createItem"
          >Создать</gButton
        >
      </div>
      <div class="main-page__result">
        <ul>
          <li v-for="item of resultList">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import gButton from "./components/gButton.vue";
import gSelect from "./components/gSelect.vue";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
onMounted(() => {
  getToken();
});
function getToken() {
  axios("https://test.gnzs.ru/oauth/get-token.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Client-Id": "31334466",
    },
  }).then((res) => {
    api.url.value = `https://${res.data.base_domain}`;
    api.accessToken.value = res.data.access_token;
  });
}
const api = {
  url: ref(""),
  accessToken: ref(""),
  createItem() {
    if (select.value.activeID === 0) return;
    const links = ["/api/v4/leads", "/api/v4/contacts", "/api/v4/companies"];
    axios(api.url.value + links[select.value.activeID - 1], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + api.accessToken.value,
      },
      mode: "no-cors",
      data: { name: [] },
    }).then((res) => {
      const resultNames = ["leads", "contacts", "companies"];
      resultList.value.push(
        ...res.data._embedded[resultNames[select.value.activeID - 1]]
      );
    });
  },
};
const select = ref({
  activeID: 0,
  options: [
    { id: 0, label: "Не выбрано" },
    { id: 1, label: "Сделка" },
    { id: 2, label: "Контакт" },
    { id: 3, label: "Компания" },
  ],
});
const resultList = ref([]);
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

  &__select {
  }

  &__button {
  }

  &__result {
    border: 1px solid grey;
    min-height: 100px;
    border-radius: 6px;
  }
}
</style>
