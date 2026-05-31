<template>
  <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
    <!-- Brand Header -->
    <div class="h-16 flex items-center justify-center border-b border-slate-800 gap-2 px-6">
      <svg class="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <span class="font-extrabold text-xl tracking-wider text-slate-100 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">CUP 2026</span>
    </div>

    <!-- Navigation links -->
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <router-link 
        v-for="item in filteredNavItems" 
        :key="item.name" 
        :to="item.to" 
        custom
        v-slot="{ href, navigate, isActive }"
      >
        <a 
          :href="href" 
          @click="navigate" 
          :class="[
            isActive 
              ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-600/10' 
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200',
            'group flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200'
          ]"
        >
          <component 
            :is="item.icon" 
            :class="[
              isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300',
              'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200'
            ]" 
          />
          {{ item.label }}
        </a>
      </router-link>
    </nav>

    <!-- User Section footer -->
    <div class="p-4 border-t border-slate-800 flex items-center gap-3">
      <div class="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-slate-700">
        {{ authStore.user?.nombre?.[0] || 'U' }}{{ authStore.user?.apellido?.[0] || '' }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-slate-200 truncate">{{ authStore.userName }}</p>
        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-400/10 text-indigo-400 border border-indigo-400/20 capitalize">
          {{ authStore.role?.toLowerCase() }}
        </span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, h } from 'vue';
import { useAuthStore } from '../modules/auth/store/auth';

const authStore = useAuthStore();

// Basic SVG Icon components defined inline
const HomeIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
]);
const FolderIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 13h6m-3-3v6m-9 1V4a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z' })
]);
const UsersIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })
]);
const CreditCardIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' })
]);
const AcademicCapIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' })
]);
const ClipboardCheckIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' })
]);
const ShieldCheckIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
]);
const UserIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
]);

const navItems = [
  { name: 'dashboard', label: 'Inicio', to: { name: 'dashboard' }, icon: HomeIcon, roles: ['ADMIN', 'COORDINADOR', 'DOCENTE', 'POSTULANTE'] },
  { name: 'carga-masiva', label: 'Carga Masiva', to: { name: 'carga-masiva' }, icon: FolderIcon, roles: ['ADMIN'] },
  { name: 'postulantes', label: 'Postulantes', to: { name: 'postulantes' }, icon: UsersIcon, roles: ['ADMIN', 'COORDINADOR'] },
  { name: 'perfil', label: 'Mi Perfil', to: { name: 'perfil' }, icon: UserIcon, roles: ['POSTULANTE'] },
  { name: 'pago', label: 'Registrar Pago', to: { name: 'pago' }, icon: CreditCardIcon, roles: ['POSTULANTE'] },
  { name: 'grupos', label: 'Organizar Grupos', to: { name: 'grupos' }, icon: AcademicCapIcon, roles: ['ADMIN', 'COORDINADOR'] },
  { name: 'calificaciones', label: 'Calificaciones', to: { name: 'calificaciones' }, icon: ClipboardCheckIcon, roles: ['ADMIN', 'COORDINADOR', 'DOCENTE'] },
  { name: 'asistencias', label: 'Asistencia', to: { name: 'asistencias' }, icon: ClipboardCheckIcon, roles: ['ADMIN', 'DOCENTE'] },
  { name: 'bitacora', label: 'Bitácora', to: { name: 'bitacora' }, icon: ShieldCheckIcon, roles: ['ADMIN'] }
];

const filteredNavItems = computed(() => {
  const currentRole = authStore.role;
  return navItems.filter(item => item.roles.includes(currentRole));
});
</script>
