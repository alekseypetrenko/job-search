<template>
  <h2>Job page</h2>
  <p>{{ currentJobId }}</p>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const currentJobId = computed(() => route.params.id);
</script>
