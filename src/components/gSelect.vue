<template>
  <div class="select" v-click-outside="close">
    <label @click="toggle" class="select__label">
      <input type="text" class="select__fueld" disabled :value="activeLabel" />
    </label>
    <div class="select__option-container" v-if="isOpen">
      <ul class="select__option-list">
        <li
          class="select__option"
          v-for="item of options"
          :key="item.id"
          @click="selectItem(item.id)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import vClickOutsideDirective from "click-outside-vue3";
const vClickOutside = vClickOutsideDirective.directive;
import { ref, computed } from "vue";
const isOpen = ref(false);
const props = defineProps(["options", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
function close() {
  isOpen.value = false;
}
function toggle() {
  isOpen.value = !isOpen.value;
}
function selectItem(id) {
  emit("update:modelValue", id);
  close();
}
const activeLabel = computed(
  () => props.options.find((item) => item.id === props.modelValue).label
);
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
  &__label {
    display: inline-block;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  &__fueld {
    height: 40px;
    box-sizing: border-box;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    pointer-events: none;
    padding-left: 12px;
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
