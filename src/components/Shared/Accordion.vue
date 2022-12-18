<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="open()"
      data-test="clickable-area"
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
export default {
  name: "Accordion",
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    createIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
};
</script>
