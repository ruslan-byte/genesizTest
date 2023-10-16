<template>
  <div class="main-page">
    <div class="main-page__container">
      <h2 class="main-page__title">Тестовое задание</h2>
      <div class="main-page__filter">
        <gSelect></gSelect>
        <gButton class="main-page__button" @click="fetch">Создать</gButton>
      </div>
      <div class="main-page__result"></div>
    </div>
  </div>
</template>

<script setup>
import gButton from "./components/gButton.vue";
import gSelect from "./components/gSelect.vue";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
function fetch() {
  axios(api.url.value + "/api/v4/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + api.accessToken.value,
    },
    mode: "no-cors",
    data: { name: [] },
  });
}
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
};
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
    height: 100px;
  }
}
</style>
