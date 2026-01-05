import { defineStore } from "pinia";
import axios from "axios";

export const useCompanySettingStore = defineStore("companySetting", {
  state: () => ({
    setting: null,
    loading: false,
    loaded: false,
  }),

  actions: {
    async fetchCompanySetting() {
      if (this.loaded) return; // fetch only once

      this.loading = true;
      try {
        const res = await axios.get(import.meta.env.VITE_FETCH_COMPANY_SETTING);

        if (res.data?.data) {
          this.setting = res.data.data;
          this.loaded = true;
        }
      } catch (error) {
        console.error("Failed to fetch company settings", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
