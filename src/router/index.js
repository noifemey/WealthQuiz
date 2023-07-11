import { createWebHistory, createRouter } from "vue-router";
import quiz from "@/components/QuizPage.vue";

const routes = [
    {
        path: "/quiz",
        name: "quiz",
        component: quiz
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
