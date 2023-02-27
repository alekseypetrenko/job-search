<template>
  <div class="mt-5">
    <input
      v-model="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computed programming, Finance degree"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { computed } from "vue";
import { key } from "@/store";
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";

export default defineComponent({
  name: "JobFilterSidebarSkills",

  setup() {
    const skillsSearchTerm = computed({
      get() {
        return store.state.skillsSearchTerm;
      },
      set(value) {
        store.commit(UPDATE_SKILLS_SEARCH_TERM, value);
      },
    });

    return { skillsSearchTerm };
  },
});
</script>
