<template>
  <div
    class="select"
    v-click-outside="() => (isOpen = false)"
    @click="() => (isOpen = true)"
  >
    <input type="text" class="select__fueld" disabled />
    <div class="select__option-container" v-if="isOpen">
      <ul class="select__option-list">
        <li class="select__option" v-for="item of [1, 2, 3]" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import vClickOutsideDirective from "click-outside-vue3";
const vClickOutside = vClickOutsideDirective.directive;
import { ref } from "vue";
const isOpen = ref(false);
defineProps(["options"]);
</script>
<style lang="scss">
.select {
  display: inline-block;
  position: relative;
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid gray;
  &:hover {
    border: 1px solid rgb(26, 26, 26);
  }
  &__fueld {
    height: 40px;
    box-sizing: border-box;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    pointer-events: none;
  }
  &__option-container {
    position: absolute;
    background: white;
    border-radius: 6px;
    border: 1px solid gray;
    min-width: 100%;
    top: calc(100% + 6px);
    box-shadow: 0 0 10px -5px rgb(94, 94, 94);
  }

  &__option-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__option {
    padding: 12px;
    &:hover {
      background: rgba(82, 82, 93, 0.587);
      color: white;
    }
    &:active {
      background: rgb(95, 93, 104);
    }
  }
}
</style>
