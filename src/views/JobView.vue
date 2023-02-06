<template>
  <h2>Job page</h2>
  <p>{{ currentJobId }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "JobView",

  setup() {
    const route = useRoute();
    const currentJobId = computed(() => route.params.id);

    return { currentJobId };
  },
});
</script>
