<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            class="mr-3"
            :data-test="value"
            type="checkbox"
            @change="selectValue"
          />
          <label :for="value" data-test="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";
import { useRouter } from "vue-router";

// import { CLEAR_USER_JOB_FILTER_SELECTIONS } from "@/store/constants";

const props = defineProps({
  uniqueValues: {
    type: [Array, Set] as PropType<string[] | Set<string>>,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const selectedValues = ref<string[]>([]);

// store.subscribe((mutation) => {
//   if (mutation.type === CLEAR_USER_JOB_FILTER_SELECTIONS) {
//     selectedValues.value = [];
//   }
// });

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "JobResults" });
};
</script>
