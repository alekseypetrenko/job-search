<template>
  <div class="border-gray-1 h-16 w-full border-b border-solid bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage" data-test="job-count">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">123</span> jobs matched</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useConfirmRoute from "@/composables/useConfirmRoute";

const onJobResultsPage = useConfirmRoute("JobResults");
</script>
