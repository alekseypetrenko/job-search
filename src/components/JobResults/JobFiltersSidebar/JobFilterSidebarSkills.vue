<template>
  <div class="mt-5">
    <input
      v-model="skillsSearchTerm"
      type="text"
      class="p-3 h-12 border border-solid border-brand-gray-1 shadow-gray rounded w-full text-base"
      placeholder="Computed programming, Finance degree"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { computed } from "vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { UPDATE_SKILLS_SEARCH_TERM } from "@/store/constants";

export default defineComponent({
  name: "JobFilterSidebarSkills",

  setup() {
    const store = useStore(key);

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
