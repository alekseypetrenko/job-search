import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobResults from "@/views/JobResultsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/jobs/results",
    name: "Jobs",
    component: JobResults,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
