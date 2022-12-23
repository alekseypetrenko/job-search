<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
  </main>
</template>

<script>
import axios from "axios";

import JobListing from "./JobListing.vue";

export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    displayedJobs() {
      const pageString = this.$route.query.page || "1";
      const pageNumber = Number.parseInt(pageString);
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;

      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    const response = await axios.get("http://localhost:3000/jobs");

    this.jobs = response?.data;
  },
};
</script>
