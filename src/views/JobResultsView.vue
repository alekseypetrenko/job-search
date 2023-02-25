<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import JobListings from "@/components/JobResults/JobListings.vue";

export default defineComponent({
  name: "JobResultsView",
  components: { JobListings, JobFiltersSidebar },
  methods: {
    goToHome() {
      this.$router.push({ name: "Home" });
    },
  },
});
</script>
