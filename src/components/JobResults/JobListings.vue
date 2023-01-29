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
    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>
        <div class="flex item-center justify-center">
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

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { FETCH_JOBS } from "@/store/constants";

import JobListing from "./JobListing.vue";

import { useFilteredJobs } from "@/store/composables";
import useCurrentPage from "@/composables/useCurrentPage";
import usePeviousAndNextPage from "@/composables/usePeviousAndNextPage";

export default {
  name: "JobListings",
  components: { JobListing },
  setup() {
    const store = useStore();

    const fetchJobs = () => store.dispatch(FETCH_JOBS);
    onMounted(fetchJobs);

    const filteredJobs = useFilteredJobs();

    const currentPage = useCurrentPage();

    const maxPage = computed(() => Math.ceil(filteredJobs.value.length / 10));

    const { previousPage, nextPage } = usePeviousAndNextPage(
      currentPage,
      maxPage,
    );

    const displayedJobs = computed(() => {
      const pageNumber = currentPage.value;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return filteredJobs.value.slice(firstJobIndex, lastJobIndex);
    });

    return { currentPage, previousPage, nextPage, displayedJobs };
  },
};
</script>
