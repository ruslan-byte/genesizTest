<template>
  <button class="button"><slot></slot></button>
</template>
<script setup></script>
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
  cursor: pointer;
  &:hover {
    background: rgba(9, 9, 218, 0.587);
    color: white;
  }
  &:active {
    background: rgb(39, 5, 161);
  }
}
</style>
