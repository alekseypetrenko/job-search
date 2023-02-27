<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="item-center flex justify-center">
          <router-link
            v-if="previousPage"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="previous-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            data-test="next-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useJobsStore } from "@/stores/jobs";
import JobListing from "./JobListing.vue";
import useCurrentPage from "@/composables/useCurrentPage";

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const currentPage = useCurrentPage();

const previousPage = computed(() => {
  const previousPage = currentPage.value - 1;
  const firstPage = 1;

  return previousPage >= firstPage ? previousPage : undefined;
});

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const nextPage = computed(() => {
  const nextPage = currentPage.value + 1;
  const maxPage = Math.ceil(FILTERED_JOBS.value.length / 10);

  return nextPage <= maxPage ? nextPage : undefined;
});

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex = pageNumber * 10;

  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>
