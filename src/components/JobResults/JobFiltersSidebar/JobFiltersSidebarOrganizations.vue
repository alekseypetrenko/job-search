<template>
  <Accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="w-1/2 h-8">
            <input id="VueTube" class="mr-3" type="checkbox" />
            <label for="VueTube">VueTube</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="Between Vue and Me" class="mr-3" type="checkbox" />
            <label for="Between Vue and Me">Between Vue</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="Et Vue Brute" class="mr-3" type="checkbox" />
            <label for="Et Vue Brute">Et Vue Brute</label>
          </li>
          <li class="w-1/2 h-8">
            <input id="Vue and a Half Men" class="mr-3" type="checkbox" />
            <label for="Vue and a Half Men">Vue and a Half Men</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </Accordion>
</template>

<script>
import Accordion from "@/components/Shared/Accordion";

export default {
  name: "JobFilterSidebarOrganizations",
  components: { Accordion },
};
</script>
