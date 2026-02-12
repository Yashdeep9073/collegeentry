import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initUTMTracking } from "./utils/UTM_Tracking_Module";

// Initialize UTM tracking
router.isReady().then(() => {
  initUTMTracking();
});

router.afterEach(() => {
  initUTMTracking();
});
import { createPinia } from "pinia";

import { useCompanySettingStore } from "./store/companySettingStore";
import tawk from "./plugin/tawk";

const app = createApp(App);

const pinia = createPinia();
app.use(tawk);

app.use(pinia);
app.use(router);

router.afterEach((to) => {
  const defaultTitle = "College";

  const store = useCompanySettingStore(pinia);

  const companyName = store.setting?.organizationName || defaultTitle;

  document.title = to.meta?.title
    ? `${to.meta.title} - ${companyName}`
    : companyName;
});

app.mount("#app");
