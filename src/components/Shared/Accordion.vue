<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      data-test="clickable-area"
      @click="open()"
    >
      <h3 class="text-bold font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="createIcon" />
    </div>
    <div v-if="isOpen" class="w-full mt-5">
      <slot>
        <p>Default text</p>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ref, computed } from "vue";

export default defineComponent({
  props: {
    header: {
      type: String,
      required: true,
    },
  },

  setup() {
    const isOpen = ref(false);

    const open = () => (isOpen.value = !isOpen.value);

    const createIcon = computed(() =>
      isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"],
    );

    return {
      isOpen,
      open,
      createIcon,
    };
  },
});
</script>
