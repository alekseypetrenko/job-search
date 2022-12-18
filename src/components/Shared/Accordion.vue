<template>
  <div class="py-5 border-b border-solid border-brand-gray-2">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="open()"
    >
      <h3 class="text-bold font-semibold">Organizations</h3>
      <font-awesome-icon :icon="createIcon" />
      <div v-if="isOpen" class="w-full mt-5">Child</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
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
      return this.isOpen ? "angle-up" : "angle-down";
    },
  },
};
</script>
