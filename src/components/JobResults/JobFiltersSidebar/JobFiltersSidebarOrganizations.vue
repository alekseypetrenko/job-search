<template>
  <Accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            v-for="organization in uniqueOrganizations"
            :key="organization"
            class="w-1/2 h-8"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              class="mr-3"
              :data-test="organization"
              type="checkbox"
              @change="selectOrganization"
            />
            <label :for="organization" data-test="organization">{{
              organization
            }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useUniqueOrganizations } from "@/store/composables";

import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";
import Accordion from "@/components/Shared/Accordion";

export default {
  name: "JobFilterSidebarOrganizations",
  components: { Accordion },
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedOrganizations = ref([]);
    const uniqueOrganizations = useUniqueOrganizations();

    const selectOrganization = () => {
      store.commit(ADD_SELECTED_ORGANIZATIONS, selectedOrganizations.value);
      router.push({ name: "JobResults" });
    };

    return { uniqueOrganizations, selectOrganization, selectedOrganizations };
  },
};
</script>
