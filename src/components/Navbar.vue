<template>
  <header class="h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
    <!-- Breadcrumb / Page Title -->
    <div>
      <h2 class="text-lg font-semibold text-slate-100 uppercase tracking-wider bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text text-transparent">
        {{ currentRouteName }}
      </h2>
    </div>

    <!-- Right Side Settings and Actions -->
    <div class="flex items-center gap-6">
      <!-- User profile info -->
      <div class="text-right hidden sm:block">
        <p class="text-sm font-medium text-slate-200">{{ authStore.userName }}</p>
        <p class="text-xs text-slate-400 capitalize">{{ authStore.role?.toLowerCase() }}</p>
      </div>

      <!-- Logout Button -->
      <button 
        @click="handleLogout" 
        :disabled="authStore.loading"
        class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-slate-300 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700/60 hover:border-rose-900/50 transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Cerrar Sesión
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../modules/auth/store/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// Map route names to friendly titles
const currentRouteName = computed(() => {
  const name = route.name;
  if (!name) return 'Preuniversitario';
  switch (name) {
    case 'dashboard': return 'Panel de Inicio';
    case 'carga-masiva': return 'Carga Masiva Transaccional';
    case 'postulantes': return 'Gestión de Postulantes';
    case 'perfil': return 'Ficha de Postulante';
    case 'pago': return 'Control de Pagos';
    case 'calificaciones': return 'Registro de Calificaciones';
    case 'grupos': return 'Organización de Grupos';
    case 'asistencias': return 'Control de Asistencias';
    case 'bitacora': return 'Bitácora del Sistema';
    default: return name;
  }
});

async function handleLogout() {
  await authStore.logout();
  router.push({ name: 'login' });
}
</script>
