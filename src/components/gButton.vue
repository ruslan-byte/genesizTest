<template>
  <button class="button" :class="{ 'button--loading': isLoading }">
    <div class="button__loader" v-if="isLoading"></div>
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>
<script setup>
const props = defineProps({ isLoading: Boolean });
</script>
<style lang="scss" scoped>
.button {
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid gray;
  background: transparent;
  padding-left: 24px;
  padding-right: 24px;
  height: 40px;
  color: rgb(40, 40, 40);
  background: rgb(6, 51, 176);
  color: white;
  cursor: pointer;
  border: none;
  &:hover {
    background: rgb(12, 54, 192);
    color: white;
    .button__loader::after {
      background: rgb(12, 54, 192);
    }
  }
  &:active {
    background: rgba(9, 9, 218, 1);
    .button__loader::after {
      background: rgba(9, 9, 218, 1);
    }
  }
  &:disabled {
    background: white;
    color: rgb(135, 135, 135);
    cursor: default;
  }
  &__loader {
    height: 20px;
    width: 20px;
    background: linear-gradient(to left, #ffffff 50%, transparent 50%);
    border-radius: 50%;
    position: relative;
    -webkit-animation: spin 1s linear infinite;
    -moz-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
    &:after {
      content: "";
      display: block;
      border-radius: 50%;
      position: absolute;
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
      background: rgb(6, 51, 176);
    }
  }
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
