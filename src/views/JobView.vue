<template>
  <h2>Job page</h2>
  <p>{{ currentJobId }}</p>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>
