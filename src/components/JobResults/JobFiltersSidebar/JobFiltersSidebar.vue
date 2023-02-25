<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <Accordion header="Skills and Qualifictions"> 1 </Accordion>
      <!-- <JobFiltersSidebarPrompt />

      <Accordion header="Skills and Qualifictions">
        <JobFilterSidebarSkills />
      </Accordion>

      <Accordion header="Job Types">
        <JobFiltersSidebarJobTypes />
      </Accordion>

      <Accordion header="Organizations">
        <JobFiltersSidebarOrganizations />
      </Accordion>

      <Accordion header="Degrees">
        <JobFiltersSidebarDegrees />
      </Accordion> -->
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Accordion from "@/components/Shared/Accordion.vue";
// import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";
// import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";
// import JobFiltersSidebarOrganizations from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue";
// import JobFiltersSidebarPrompt from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue";
// import JobFilterSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFilterSidebarSkills.vue";

export default defineComponent({
  name: "JobFiltersSidebar",
  components: {
    Accordion,
    // JobFiltersSidebarPrompt,
    // JobFiltersSidebarDegrees,
    // JobFiltersSidebarJobTypes,
    // JobFiltersSidebarOrganizations,
    // JobFilterSidebarSkills,
  },
});
</script>
