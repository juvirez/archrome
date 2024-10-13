<script setup lang="ts">
  import { ref } from 'vue';

  const value = ref<string>();
  const options = ['Arc', 'Chrome'];
</script>

<template>
  <Panel>
    <div>hello vue</div>
    <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
  </Panel>
</template>
