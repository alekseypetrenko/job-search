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

      <JobFiltersSidebarCheckboxGroup
        header="Job Types"
        :unique-values="uniqueJobTypes"
        :mutation="ADD_SELECTED_JOB_TYPES"
        data-test="job-types-filter"
      />

      <JobFiltersSidebarCheckboxGroup
        header="Organizations"
        :unique-values="uniqueOrganizations"
        :mutation="ADD_SELECTED_ORGANIZATIONS"
        data-test="organizations-filter"
      />
      <JobFiltersSidebarCheckboxGroup
        header="Degrees"
        :unique-values="uniqueDegrees"
        :mutation="ADD_SELECTED_DEGREES"
        data-test="degrees-filter"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";

import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import {
  useUniqueOrganizations,
  useUniqueJobTypes,
  useUniqueDegrees,
} from "@/store/composables";

import {
  ADD_SELECTED_DEGREES,
  ADD_SELECTED_JOB_TYPES,
  ADD_SELECTED_ORGANIZATIONS,
  CLEAR_USER_JOB_FILTER_SELECTIONS,
} from "@/store/constants";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    JobFiltersSidebarCheckboxGroup,
  },
  setup() {
    const store = useStore(key);

    const uniqueJobTypes = useUniqueJobTypes();
    const uniqueOrganizations = useUniqueOrganizations();
    const uniqueDegrees = useUniqueDegrees();

    const clearUserJobFilterSelection = () => {
      store.commit(CLEAR_USER_JOB_FILTER_SELECTIONS);
    };

    return {
      uniqueJobTypes,
      uniqueOrganizations,
      uniqueDegrees,
      ADD_SELECTED_JOB_TYPES,
      ADD_SELECTED_ORGANIZATIONS,
      ADD_SELECTED_DEGREES,
      clearUserJobFilterSelection,
    };
  },
});
</script>
