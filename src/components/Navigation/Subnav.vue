<template>
  <div class="border-gray-1 h-16 w-full border-b border-solid bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="true" data-test="job-count">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">123</span> jobs matched</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useConfirmRoute from "@/composables/useConfirmRoute";

export default defineComponent({
  name: "Subnav",

  setup() {
    const onJobResultsPage = useConfirmRoute("JobResults");

    return { onJobResultsPage };
  },
});
</script>
