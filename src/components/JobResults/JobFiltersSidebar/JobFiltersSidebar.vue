<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-96"
  >
    <section class="pb-5">
      <JobFiltersSidebarPrompt />

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

import Accordion from "@/components/Shared/Accordion.vue";
import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarPrompt from "./JobFiltersSidebarPrompt.vue";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    Accordion,
    JobFiltersSidebarPrompt,
    JobFiltersSidebarDegrees,
    JobFiltersSidebarJobTypes,
    JobFiltersSidebarOrganizations,
  },
});
</script>
