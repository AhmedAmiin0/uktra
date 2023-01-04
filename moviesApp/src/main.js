import App from "./App.vue";
import { createPinia } from "pinia";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";
import router from "@/router/routes";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.component("Datepicker", Datepicker);

registerPlugins(app);
app.use(pinia);
app.mount("#app");
