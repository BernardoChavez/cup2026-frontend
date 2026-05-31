<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Grupos de Nivelación</h1>
        <p class="text-slate-400 mt-1">Organice paralelos por materia y asigne profesores y aulas de forma automática.</p>
      </div>
      <div>
        <button
          @click="openGenerarModal"
          class="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer text-sm"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Generar Grupos Automáticos
        </button>
      </div>
    </div>

    <!-- Alert message -->
    <div v-if="alert.show" :class="[alert.isSuccess ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400', 'border rounded-xl px-4 py-3 text-sm flex justify-between items-center gap-3']">
      <div class="flex items-center gap-3">
        <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ alert.message }}</span>
      </div>
      <button @click="alert.show = false" class="text-slate-400 hover:text-slate-200">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Tabs by Subject -->
    <div class="flex border-b border-slate-800 space-x-2">
      <button
        @click="activeSubject = 'ALL'"
        :class="[
          activeSubject === 'ALL'
            ? 'border-indigo-500 text-white font-medium'
            : 'border-transparent text-slate-450 hover:text-slate-200',
          'px-4 py-2 text-sm border-b-2 transition-all cursor-pointer'
        ]"
      >
        Todas las Materias
      </button>
      <button
        v-for="m in uniqueSubjects"
        :key="m.codigo"
        @click="activeSubject = m.codigo"
        :class="[
          activeSubject === m.codigo
            ? 'border-indigo-500 text-white font-medium'
            : 'border-transparent text-slate-450 hover:text-slate-200',
          'px-4 py-2 text-sm border-b-2 transition-all cursor-pointer'
        ]"
      >
        {{ m.nombre }}
      </button>
    </div>

    <!-- Grid Layout of Group Cards -->
    <div v-if="loading" class="text-slate-400 text-center py-12">
      <div class="inline-flex items-center gap-2">
        <div class="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        Cargando grupos...
      </div>
    </div>
    <div v-else-if="filteredGroups.length === 0" class="text-slate-500 text-center py-12">
      No se han generado grupos de nivelación para esta gestión. Use el botón "Generar Grupos Automáticos" arriba.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="grupo in filteredGroups"
        :key="grupo.id"
        class="glass-panel rounded-2xl p-5 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <!-- Header Card -->
          <div class="flex justify-between items-start gap-2">
            <div>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                {{ grupo.materia?.nombre }}
              </span>
              <h3 class="text-lg font-black text-white mt-1.5">{{ grupo.nombre }}</h3>
            </div>
            <!-- Count of students badge -->
            <div class="text-right">
              <span class="text-xs text-slate-450">Estudiantes</span>
              <p class="text-lg font-black text-white leading-tight">
                {{ grupo.postulantes_count || 0 }} <span class="text-xs text-slate-500 font-normal">/ 70</span>
              </p>
            </div>
          </div>

          <!-- Group Details -->
          <div class="space-y-2.5 mt-5 border-t border-slate-800/80 pt-4 text-xs">
            <div class="flex items-center gap-2 text-slate-350">
              <svg class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Horario: <strong>{{ grupo.horario }}</strong></span>
            </div>

            <div class="flex items-center gap-2 text-slate-350">
              <svg class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Aula: <strong>{{ grupo.aula?.nombre }}</strong></span>
            </div>

            <div class="flex items-center gap-2 text-slate-350">
              <svg class="h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="truncate">
                Docente:
                <strong v-if="grupo.docente?.usuario">
                  {{ grupo.docente.usuario.nombre }} {{ grupo.docente.usuario.apellido }}
                </strong>
                <strong v-else class="text-rose-400 italic">No asignado</strong>
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800/40 flex justify-between items-center text-[10px] text-slate-500">
          <span>Aforo máximo: 70</span>
          <span>CUP 2026 - Balanceado</span>
        </div>
      </div>
    </div>

    <!-- Generar Grupos Modal -->
    <div v-if="modal.show" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fade-in border border-slate-800">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <h3 class="text-lg font-bold text-white">Algoritmo de Agrupamiento</h3>
          <button @click="modal.show = false" class="text-slate-400 hover:text-slate-200 cursor-pointer">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-4">
          <p class="text-xs text-slate-400 leading-relaxed">
            Se ejecutará un balanceador dinámico para distribuir automáticamente a los alumnos con <strong>pago aprobado</strong> en paralelos de máximo 70 estudiantes, asignándoles aulas físicas y docentes de manera equitativa.
          </p>

          <div>
            <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Seleccionar Ciclo Académico *</label>
            <select
              v-model="modal.id_gestion_academica"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-350 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="">-- Seleccionar Periodo --</option>
              <option v-for="g in gestiones" :key="g.id" :value="g.id">
                {{ g.periodo }} - {{ g.anio }}
              </option>
            </select>
          </div>

          <div class="p-3 bg-indigo-950/15 border border-indigo-900/30 rounded-xl text-xs text-slate-450 leading-relaxed">
            <span class="text-indigo-400 font-bold block mb-0.5">Nota:</span>
            Este proceso es idempotente. Si ya existen grupos en el ciclo seleccionado, se eliminarán y se recalcularán todos los paralelos desde cero para garantizar la distribución exacta.
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-800 flex items-center justify-end gap-3 bg-slate-900/10">
          <button
            @click="modal.show = false"
            class="px-4 py-2 border border-slate-850 hover:bg-slate-900 rounded-xl text-slate-350 text-sm font-semibold transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            @click="generarGrupos"
            :disabled="generating || !modal.id_gestion_academica"
            class="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all disabled:opacity-50 cursor-pointer"
          >
            {{ generating ? 'Procesando...' : 'Iniciar Distribución' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import api from '../../../services/api';

const loading = ref(false);
const generating = ref(false);

const grupos = ref([]);
const gestiones = ref([]);

const activeSubject = ref('ALL');

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

const modal = reactive({
  show: false,
  id_gestion_academica: ''
});

async function loadData() {
  loading.value = true;
  alert.show = false;
  try {
    const [grupRes, gestRes] = await Promise.all([
      api.get('/grupos'),
      api.get('/gestiones-academicas')
    ]);
    grupos.value = grupRes.data;
    gestiones.value = gestRes.data;

    if (gestiones.value.length > 0) {
      modal.id_gestion_academica = gestiones.value[0].id;
    }
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al cargar los grupos.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
});

// Extract list of subjects present in the groups for filtering tabs
const uniqueSubjects = computed(() => {
  const map = new Map();
  grupos.value.forEach(g => {
    if (g.materia) {
      map.set(g.materia.codigo, g.materia);
    }
  });
  return Array.from(map.values());
});

const filteredGroups = computed(() => {
  if (activeSubject.value === 'ALL') {
    return grupos.value;
  }
  return grupos.value.filter(g => g.materia?.codigo === activeSubject.value);
});

function openGenerarModal() {
  modal.show = true;
}

async function generarGrupos() {
  generating.value = true;
  alert.show = false;
  try {
    const response = await api.post('/admin/grupos/generar', {
      id_gestion_academica: modal.id_gestion_academica
    });
    alert.isSuccess = true;
    alert.message = response.data.message;
    alert.show = true;
    modal.show = false;
    await loadData();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al ejecutar el agrupamiento automático.';
    alert.show = true;
  } finally {
    generating.value = false;
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}
</style>
