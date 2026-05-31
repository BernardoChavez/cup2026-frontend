<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Hola, {{ authStore.userName }}</h1>
        <p class="text-slate-400 mt-1">Bienvenido a la gestión académica del preuniversitario CUP 2026.</p>
      </div>
      <div v-if="authStore.role === 'ADMIN' || authStore.role === 'COORDINADOR'" class="flex items-center gap-3">
        <!-- Automatic Admission Button -->
        <button 
          @click="ejecutarAdmision" 
          :disabled="loadingAdmision"
          class="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
        >
          <svg v-if="loadingAdmision" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesar Admisión Automática
        </button>
      </div>
    </div>

    <!-- ROLE: ADMIN or COORDINADOR -->
    <div v-if="authStore.role === 'ADMIN' || authStore.role === 'COORDINADOR'" class="space-y-8">
      <!-- Statistics KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Total Postulantes -->
        <div class="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Postulantes</p>
              <h3 class="text-3xl font-extrabold text-white mt-2">{{ stats.totalPostulantes }}</h3>
            </div>
            <div class="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Approved -->
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aprobados</p>
              <h3 class="text-3xl font-extrabold text-emerald-400 mt-2">{{ stats.totalAprobados }}</h3>
            </div>
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Reproved -->
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reprobados</p>
              <h3 class="text-3xl font-extrabold text-rose-400 mt-2">{{ stats.totalReprobados }}</h3>
            </div>
            <div class="h-12 w-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Groups -->
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Grupos Nivelación</p>
              <h3 class="text-3xl font-extrabold text-indigo-400 mt-2">{{ stats.totalGrupos }}</h3>
            </div>
            <div class="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div>
        <h3 class="text-lg font-bold text-white mb-4">Accesos Directos Administrativos</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <router-link :to="{ name: 'postulantes' }" class="glass-card rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer block">
            <h4 class="font-bold text-slate-100">Fichas de Postulantes</h4>
            <p class="text-xs text-slate-400 mt-1">Revisar datos personales, colegio de procedencia y requisitos documentales de los inscritos.</p>
          </router-link>
          <router-link :to="{ name: 'grupos' }" class="glass-card rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer block">
            <h4 class="font-bold text-slate-100">Organizar Grupos</h4>
            <p class="text-xs text-slate-400 mt-1">Ejecutar el algoritmo para distribuir postulantes en aulas físicas respetando el aforo de 70.</p>
          </router-link>
          <router-link :to="{ name: 'calificaciones' }" class="glass-card rounded-2xl p-6 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer block">
            <h4 class="font-bold text-slate-100">Registro de Calificaciones</h4>
            <p class="text-xs text-slate-400 mt-1">Ingresar o revisar las calificaciones obtenidas en Computación, Matemáticas, Inglés y Física.</p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- ROLE: DOCENTE -->
    <div v-else-if="authStore.role === 'DOCENTE'" class="space-y-6">
      <h3 class="text-lg font-bold text-white mb-4">Tus Grupos Asignados</h3>
      <div v-if="misGrupos.length === 0" class="glass-panel rounded-2xl p-8 text-center text-slate-400">
        No tienes paralelos asignados bajo tu responsabilidad en la gestión activa.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="grupo in misGrupos" :key="grupo.id" class="glass-card rounded-2xl p-6 flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                {{ grupo.materia?.codigo }}
              </span>
              <span class="text-xs text-slate-400">{{ grupo.horario }}</span>
            </div>
            <h4 class="text-xl font-bold text-white mt-3">{{ grupo.nombre }}</h4>
            <p class="text-sm text-slate-400 mt-1">Aula: {{ grupo.aula?.nombre || 'No asignada' }}</p>
            <p class="text-sm text-slate-400">Alumnos inscritos: {{ grupo.postulantes_count }}</p>
          </div>
          <div class="flex items-center gap-3 mt-4">
            <router-link 
              :to="{ name: 'asistencias', query: { grupo: grupo.id } }" 
              class="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-all duration-200"
            >
              Control de Asistencia
            </router-link>
            <router-link 
              :to="{ name: 'calificaciones', query: { grupo: grupo.id } }" 
              class="flex-1 text-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/10 transition-all duration-200"
            >
              Ingresar Notas
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ROLE: POSTULANTE -->
    <div v-else-if="authStore.role === 'POSTULANTE'" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Left column: Profile card -->
      <div class="md:col-span-2 space-y-6">
        <!-- Personal info -->
        <div class="glass-panel rounded-2xl p-6 space-y-4">
          <h3 class="text-lg font-bold text-white border-b border-slate-800 pb-3">Ficha de Postulación</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-slate-500 font-semibold uppercase tracking-wider text-xs">Cédula Identidad</p>
              <p class="text-slate-200 font-medium mt-1">{{ authStore.user?.postulante?.ci }}</p>
            </div>
            <div>
              <p class="text-slate-500 font-semibold uppercase tracking-wider text-xs">Colegio de Procedencia</p>
              <p class="text-slate-200 font-medium mt-1">{{ authStore.user?.postulante?.colegio_procedencia || 'No registrado' }}</p>
            </div>
            <div>
              <p class="text-slate-500 font-semibold uppercase tracking-wider text-xs">Primera Opción de Carrera</p>
              <p class="text-slate-200 font-medium mt-1">{{ carreraOpcion1Name }}</p>
            </div>
            <div>
              <p class="text-slate-500 font-semibold uppercase tracking-wider text-xs">Segunda Opción de Carrera</p>
              <p class="text-slate-200 font-medium mt-1">{{ carreraOpcion2Name }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-slate-500 font-semibold uppercase tracking-wider text-xs">Carrera Asignada</p>
              <p v-if="authStore.user?.postulante?.id_carrera_asignada" class="text-indigo-400 font-extrabold text-base mt-1">
                {{ carreraAsignadaName }}
              </p>
              <p v-else class="text-slate-400 italic mt-1">Pendiente de Aprobación y Distribución de Cupos</p>
            </div>
          </div>
        </div>

        <!-- Grades if available -->
        <div class="glass-panel rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white border-b border-slate-800 pb-3 mb-4">Boleta de Calificaciones</h3>
          <div v-if="!calificacion" class="text-slate-400 text-center py-6 text-sm">
            Tus calificaciones parciales y promedio final se publicarán una vez evaluadas por los docentes.
          </div>
          <div v-else class="space-y-4">
            <div class="grid grid-cols-5 text-center font-bold text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2">
              <span class="text-left">Materia</span>
              <span>Nota 1</span>
              <span>Nota 2</span>
              <span>Nota 3</span>
              <span class="text-indigo-400">Promedio</span>
            </div>
            <div 
              v-for="sub in [['COMP', 'Computación', 'comp'], ['MAT', 'Matemáticas', 'mat'], ['ING', 'Inglés', 'ing'], ['FIS', 'Física', 'fis']]" 
              :key="sub[0]"
              class="grid grid-cols-5 text-center items-center text-sm border-b border-slate-800/40 py-2.5 text-slate-300"
            >
              <span class="text-left font-semibold">{{ sub[1] }}</span>
              <span>{{ calificacion[`${sub[2]}_n1`] }}</span>
              <span>{{ calificacion[`${sub[2]}_n2`] }}</span>
              <span>{{ calificacion[`${sub[2]}_n3`] }}</span>
              <span class="font-bold text-indigo-400">{{ calificacion[`${sub[2]}_promedio`] }}</span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-slate-800">
              <span class="font-extrabold text-slate-200">PROMEDIO FINAL GLOBAL</span>
              <span class="text-2xl font-black text-indigo-400">{{ calificacion.promedio_final_global }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right column: State card -->
      <div class="space-y-6">
        <!-- Status badge card -->
        <div class="glass-panel rounded-2xl p-6 text-center space-y-4 flex flex-col items-center">
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado Académico Final</p>
          <div class="h-20 w-20 rounded-full flex items-center justify-center border-4" :class="statusStyle.border">
            <svg class="h-10 w-10" :class="statusStyle.text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path v-if="authStore.user?.postulante?.estado_final === 'APROBADO'" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-else-if="authStore.user?.postulante?.estado_final === 'REPROBADO'" stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 class="text-xl font-bold uppercase tracking-wide" :class="statusStyle.text">
              {{ authStore.user?.postulante?.estado_final }}
            </h4>
            <p class="text-xs text-slate-400 mt-1">{{ statusStyle.desc }}</p>
          </div>
        </div>

        <!-- Payment Status card -->
        <div class="glass-panel rounded-2xl p-6 space-y-4">
          <h3 class="text-sm font-bold text-white border-b border-slate-800 pb-2">Estado Financiero</h3>
          <div class="flex items-center justify-between">
            <span class="text-slate-400 text-sm">Pago de Inscripción</span>
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
              :class="authStore.user?.postulante?.pago_procesado ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'"
            >
              {{ authStore.user?.postulante?.pago_procesado ? 'CONCILIADO' : 'PENDIENTE' }}
            </span>
          </div>
          <div v-if="!authStore.user?.postulante?.pago_procesado" class="pt-2">
            <router-link 
              :to="{ name: 'pago' }" 
              class="w-full block text-center py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold transition-all duration-200 cursor-pointer"
            >
              Subir Comprobante de Pago
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../../auth/store/auth';
import api from '../../../services/api';

const authStore = useAuthStore();
const loadingAdmision = ref(false);
const stats = ref({
  totalPostulantes: 0,
  totalAprobados: 0,
  totalReprobados: 0,
  totalGrupos: 0
});
const misGrupos = ref([]);
const calificacion = ref(null);
const carreras = ref([]);

// Role-based Status UI for students
const statusStyle = computed(() => {
  const state = authStore.user?.postulante?.estado_final;
  if (state === 'APROBADO') {
    return {
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      desc: '¡Felicitaciones! Has aprobado el curso preuniversitario y tienes cupo asignado.'
    };
  } else if (state === 'REPROBADO') {
    return {
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      desc: 'No has alcanzado la nota mínima aprobatoria de 60 puntos.'
    };
  } else {
    return {
      border: 'border-slate-800',
      text: 'text-slate-400',
      desc: 'Te encuentras cursando las asignaturas del ciclo de nivelación académica.'
    };
  }
});

// Resolve career names
const carreraOpcion1Name = computed(() => {
  const id = authStore.user?.postulante?.id_carrera_opcion1;
  return carreras.value.find(c => c.id === id)?.nombre || `Opción ${id}`;
});
const carreraOpcion2Name = computed(() => {
  const id = authStore.user?.postulante?.id_carrera_opcion2;
  return carreras.value.find(c => c.id === id)?.nombre || `Opción ${id}`;
});
const carreraAsignadaName = computed(() => {
  const id = authStore.user?.postulante?.id_carrera_asignada;
  return carreras.value.find(c => c.id === id)?.nombre || 'Ninguna';
});

async function loadData() {
  if (authStore.role === 'ADMIN' || authStore.role === 'COORDINADOR') {
    // Load dashboard metrics
    try {
      const [resPostulantes, resGrupos] = await Promise.all([
        api.get('/postulantes'),
        api.get('/grupos')
      ]);
      const list = resPostulantes.data;
      stats.value.totalPostulantes = list.length;
      stats.value.totalAprobados = list.filter(p => p.estado_final === 'APROBADO').length;
      stats.value.totalReprobados = list.filter(p => p.estado_final === 'REPROBADO').length;
      stats.value.totalGrupos = resGrupos.data.length;
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    }
  } else if (authStore.role === 'DOCENTE') {
    try {
      const response = await api.get('/docente/grupos');
      misGrupos.value = response.data;
    } catch (err) {
      console.error('Failed to load teacher classes:', err);
    }
  } else if (authStore.role === 'POSTULANTE') {
    try {
      // Reload profile first
      await authStore.fetchMe();
      
      // Load student grades
      const resCal = await api.get(`/calificaciones/${authStore.user.postulante.id}`);
      calificacion.value = resCal.data;
    } catch (err) {
      // 404 is normal if grades are not published yet
      if (err.response?.status !== 404) {
        console.error('Failed to load grades:', err);
      }
    }
  }
}

async function loadCarreras() {
  if (authStore.role === 'POSTULANTE') {
    try {
      // Create a temporary axios call to fetch catalog. Since we don't have catalog controllers yet, 
      // we can hardcode a fallback mapping or fetch from backend if available.
      // We will define a fallback list since catalog is static:
      carreras.value = [
        { id: 1, nombre: 'Ingeniería Informática' },
        { id: 2, nombre: 'Ingeniería en Sistemas' },
        { id: 3, nombre: 'Ingeniería de Redes y Telecomunicaciones' }
      ];
    } catch (err) {
      console.error(err);
    }
  }
}

async function ejecutarAdmision() {
  if (!confirm('¿Está seguro de procesar la admisión automática para los alumnos con pagos conciliados? Esta acción evaluará las notas y asignará los cupos de carrera.')) return;
  
  loadingAdmision.value = true;
  try {
    const res = await api.post('/admin/admision/procesar', { id_gestion_academica: 1 }); // Default to cycle 1
    alert(res.data.message);
    await loadData();
  } catch (err) {
    alert(err.response?.data?.message || 'Error al procesar la admisión.');
  } finally {
    loadingAdmision.value = false;
  }
}

onMounted(() => {
  loadData();
  loadCarreras();
});
</script>
