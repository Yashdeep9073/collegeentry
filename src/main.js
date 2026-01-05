import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.use(router);

router.afterEach((to) => {
  const defaultTitle = "College";

  // Lazy import Pinia store INSIDE guard
  const { useCompanySettingStore } = require("../store/companySettingStore");
  const store = useCompanySettingStore();

  const companyName = store.setting?.organizationName || defaultTitle;

  document.title = to.meta?.title
    ? `${to.meta.title} - ${companyName}`
    : companyName;
});

app.mount("#app");
