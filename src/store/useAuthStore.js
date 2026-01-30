import { defineStore } from "pinia";
import axios from "axios";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // STATE
  const user = ref(null);
  const loading = ref(false);
  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);

  // API
  const API_GET_USER = import.meta.env.VITE_GET_USER_DETAILS_API;

  // GETTERS
  const isAuthenticated = computed(() => !!user.value);

  const userInitials = computed(() => {
    if (!user.value?.name) return "U";
    return user.value.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  });

  // ACTIONS
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      user.value = null;
      return;
    }

    try {
      loading.value = true;
      const res = await axios.get(API_GET_USER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user.value = res.data.data;
    } catch (error) {
      localStorage.removeItem("token");
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    user.value = null;
  };

  const openLoginModal = () => {
    showLoginModal.value = true;
    showRegisterModal.value = false;
  };

  const closeLoginModal = () => {
    showLoginModal.value = false;
  };

  const openRegisterModal = () => {
    showRegisterModal.value = true;
    showLoginModal.value = false;
  };

  const closeRegisterModal = () => {
    showRegisterModal.value = false;
  };

  return {
    // state
    user,
    loading,
    showLoginModal,
    showRegisterModal,
    // getters
    isAuthenticated,
    userInitials,

    // actions
    fetchUser,
    logout,
    openLoginModal,
    closeLoginModal,
    openRegisterModal,
    closeRegisterModal,
  };
});
