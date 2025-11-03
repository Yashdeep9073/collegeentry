import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.use(router);

router.afterEach((to) => {
  document.title = to.meta.title || "College Entry";
});

app.mount("#app");
