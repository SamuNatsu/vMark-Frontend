import { createRouter, createWebHistory } from "vue-router";

// View imports
import IndexView from "../views/IndexView.vue";
import SearchView from "../views/SearchView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserView from "../views/UserView.vue";
import AdminView from "../views/AdminView.vue";
import ItemView from "../views/ItemView.vue";
import CartView from "../views/CartView.vue";

// Create router
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "index",
			component: IndexView
		},
        {
            path: "/search",
            name: "search",
            component: SearchView
        },
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
        },
        {
            path: "/item",
            name: "item",
            component: ItemView
        },
        {
            path: "/cart",
            name: "cart",
            component: CartView
        }
	]
});

// Export default
export default router;
