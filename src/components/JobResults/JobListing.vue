<template>
  <li class="mb-7">
    <router-link
      to="/jobs/results/1"
      class="block mx-auto bg-white border border-solid bolid-brand-gray-2 rounded hover:shadow-gray"
    >
      <div class="pt-5 pd2 mx-8 border-b border-solid border-brand-gray-2">
        <h2 class="mb-2 text-2xl">Fronr-End Developer, Vue Developer</h2>

        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>Alex</span>
          </div>
          <div>
            <span>Ukraine, Dnipro</span>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qualifications:</h3>
          <div>
            <ul class="pl-8 list-disc">
              <li>Bachelors degree</li>
              <li>5 years of experience in management</li>
              <li>Analizyng data</li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link to="/jobs/results/1" class="text-brand-blue-1">
            Expand
          </router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "JobListing",
};
</script>
