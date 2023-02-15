<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton
            text="Clear filters"
            type="secondary"
            @click="clearUserJobFilterSelection"
          />
        </div>
      </div>

      <Accordion header="Job Types">
        <JobFiltersSidebarJobTypes />
      </Accordion>

      <Accordion header="Organizations">
        <JobFiltersSidebarOrganizations />
      </Accordion>

      <Accordion header="Degrees">
        <JobFiltersSidebarDegrees />
      </Accordion>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

import Accordion from "@/components/Shared/Accordion.vue";
import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";

import { CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    Accordion,
    JobFiltersSidebarJobTypes,
    JobFiltersSidebarDegrees,
    JobFiltersSidebarOrganizations,
  },
  setup() {
    const store = useStore(key);

    const clearUserJobFilterSelection = () => {
      store.commit(CLEAR_USER_JOB_FILTER_SELECTIONS);
    };

    return {
      clearUserJobFilterSelection,
    };
  },
});
</script>
