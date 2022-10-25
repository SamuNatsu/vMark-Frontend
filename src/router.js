import { createRouter, createWebHistory } from "vue-router";

// View imports
import IndexView from "./views/IndexView.vue";

// Create router
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "index",
			component: IndexView
		}/*,
		{
			path: "/login",
            name: "login",
            component: LoginView
		},
        {
            path: "/register",
            name: "register",
            component: RegisterView
        },
        {
            path: "/user",
            name: "user",
            component: UserView
        },
        {
            path: "/admin",
            name: "admin",
            component: AdminView
        }*/
	]
});

// Export default
export default router;
