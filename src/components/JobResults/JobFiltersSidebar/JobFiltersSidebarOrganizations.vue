<template>
  <Accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="w-1/2 h-8">
            <input class="mr-3" type="checkbox" id="VueTube" />
            <label for="VueTube">VueTube</label>
          </li>
          <li class="w-1/2 h-8">
            <input class="mr-3" type="checkbox" id="Between Vue and Me" />
            <label for="Between Vue and Me">Between Vue</label>
          </li>
          <li class="w-1/2 h-8">
            <input class="mr-3" type="checkbox" id="Et Vue Brute" />
            <label for="Et Vue Brute">Et Vue Brute</label>
          </li>
          <li class="w-1/2 h-8">
            <input class="mr-3" type="checkbox" id="Vue and a Half Men" />
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
