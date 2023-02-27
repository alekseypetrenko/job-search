<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="open()"
    >
      <h3 class="text-bold font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="createIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>Default text</p>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const open = () => (isOpen.value = !isOpen.value);

const createIcon = computed(() =>
  isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"],
);
</script>
