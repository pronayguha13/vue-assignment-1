import { createRouter, createWebHistory } from "vue-router";

//local component import
import Students from "@/views/Students";
import StudentDetails from "@/views/StudentDetails";

const routes = [
  {
    path: "/",
    name: "Students",
    component: Students,
  },
  {
    path: "/students/:id",
    name: "StudentDetails",
    component: StudentDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
