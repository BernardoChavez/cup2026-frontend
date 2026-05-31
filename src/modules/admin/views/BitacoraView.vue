<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Bitácora del Sistema</h1>
      <p class="text-slate-400 mt-1">Historial completo de auditoría y operaciones del preuniversitario.</p>
    </div>

    <!-- Filter input -->
    <div class="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 max-w-md">
      <svg class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Buscar por usuario, acción o descripción..."
        class="bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none w-full text-sm"
      />
    </div>

    <!-- Table Container -->
    <div class="glass-panel rounded-2xl overflow-hidden shadow-xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-800 text-sm">
          <thead class="bg-slate-900/80">
            <tr>
              <th scope="col" class="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Fecha</th>
              <th scope="col" class="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Usuario</th>
              <th scope="col" class="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Acción</th>
              <th scope="col" class="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Tabla</th>
              <th scope="col" class="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Descripción</th>
              <th scope="col" class="px-6 py-4 text-left font-bold text-slate-400 uppercase tracking-wider text-xs">Dirección IP</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-300">
            <tr v-if="loading" class="text-slate-400">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex items-center justify-center gap-3">
                  <svg class="animate-spin h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Cargando bitácora...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredLogs.length === 0" class="text-slate-500">
              <td colspan="6" class="px-6 py-12 text-center">
                No se encontraron registros de auditoría.
              </td>
            </tr>
            <tr 
              v-else 
              v-for="log in filteredLogs" 
              :key="log.id"
              class="hover:bg-slate-900/30 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                {{ formatFecha(log.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                  <span class="font-semibold text-slate-200">{{ log.usuario ? `${log.usuario.nombre} ${log.usuario.apellido}` : 'Sistema' }}</span>
                  <span class="text-xs text-slate-500">{{ log.usuario?.email || '' }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getActionStyle(log.accion)" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase">
                  {{ log.accion }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">
                {{ log.tabla_afectada || '-' }}
              </td>
              <td class="px-6 py-4 max-w-xs truncate text-slate-200">
                {{ log.descripcion || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                {{ log.ip_direccion || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../../../services/api';

const logs = ref([]);
const loading = ref(true);
const searchQuery = ref('');

async function fetchLogs() {
  loading.value = true;
  try {
    const response = await api.get('/admin/bitacora');
    logs.value = response.data;
  } catch (err) {
    console.error('Failed to fetch bitacora:', err);
  } finally {
    loading.value = false;
  }
}

const filteredLogs = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return logs.value;

  return logs.value.filter(log => {
    const userStr = log.usuario ? `${log.usuario.nombre} ${log.usuario.apellido} ${log.usuario.email}`.toLowerCase() : 'sistema';
    const actionStr = (log.accion || '').toLowerCase();
    const tableStr = (log.tabla_afectada || '').toLowerCase();
    const descStr = (log.descripcion || '').toLowerCase();

    return userStr.includes(query) || actionStr.includes(query) || tableStr.includes(query) || descStr.includes(query);
  });
});

function formatFecha(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('es-BO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function getActionStyle(action) {
  switch (action) {
    case 'LOGIN': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    case 'LOGOUT': return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    case 'CREAR': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    case 'ACTUALIZAR': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'ELIMINAR': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    case 'CONCILIAR_PAGO': return 'bg-teal-500/10 text-teal-400 border border-teal-500/20';
    default: return 'bg-slate-800 text-slate-300';
  }
}

onMounted(() => {
  fetchLogs();
});
</script>
