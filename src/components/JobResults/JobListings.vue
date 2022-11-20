<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing />
    </ol>
  </main>
</template>

<script>
import JobListing from "./JobListing.vue";

export default {
  name: "JobListings",
  components: { JobListing },
};
</script>
