import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../../../services/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!token.value);
  const role = computed(() => user.value?.rol || null);
  const userName = computed(() => {
    if (!user.value) return '';
    return `${user.value.nombre} ${user.value.apellido}`;
  });

  async function login(email, password) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post('/auth/login', { email, password });
      
      token.value = response.data.token;
      user.value = response.data.user;

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al iniciar sesión.';
      return { success: false, message: error.value };
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout request failed:', err);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      loading.value = false;
    }
  }

  async function fetchMe() {
    if (!token.value) return;
    try {
      const response = await api.get('/auth/me');
      user.value = response.data;
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (err) {
      console.error('Failed to fetch profile details:', err);
      // Auto logout if token expires or is invalid
      token.value = null;
      user.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    role,
    userName,
    login,
    logout,
    fetchMe,
  };
});
