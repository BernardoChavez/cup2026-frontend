<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Registro de Asistencia Diaria</h1>
      <p class="text-slate-400 mt-1">Registre la asistencia de sus alumnos. Presione sobre los estados para cambiarlos.</p>
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

    <!-- Group Selection Header Panel -->
    <div class="glass-panel rounded-2xl p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <!-- Grupo Selector -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Grupo de Nivelación *</label>
          <select
            v-model="selectedGroupId"
            @change="loadStudents"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-250 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="">-- Seleccionar Grupo --</option>
            <option v-for="g in grupos" :key="g.id" :value="g.id">
              {{ g.nombre }} ({{ g.horario }})
            </option>
          </select>
        </div>

        <!-- Fecha Picker -->
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Fecha de Registro *</label>
          <input
            v-model="fecha"
            type="date"
            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Quick actions -->
        <div class="flex gap-2">
          <button
            @click="bulkMark('PRESENTE')"
            :disabled="!selectedGroupId || students.length === 0"
            class="flex-1 py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-semibold border border-emerald-500/20 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-center"
          >
            Marcar Todos Presente
          </button>
          <button
            @click="bulkMark('FALTA')"
            :disabled="!selectedGroupId || students.length === 0"
            class="flex-1 py-2.5 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 font-semibold border border-rose-500/20 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-center"
          >
            Marcar Todos Falta
          </button>
        </div>
      </div>
    </div>

    <!-- Student Attendance List -->
    <div class="glass-panel rounded-2xl overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between">
        <h3 class="text-lg font-bold text-white">Alumnos Inscritos</h3>
        <span class="text-xs text-slate-450 font-semibold" v-if="students.length > 0">
          Total: {{ students.length }} estudiantes
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 text-xs font-semibold text-slate-450 uppercase tracking-wider bg-slate-900/10">
              <th class="px-6 py-4">Estudiante</th>
              <th class="px-6 py-4">C.I.</th>
              <th class="px-6 py-4 text-center">Estado de Asistencia</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-sm">
            <tr v-if="!selectedGroupId" class="text-slate-500">
              <td colspan="3" class="px-6 py-12 text-center italic">
                Seleccione un grupo de nivelación arriba para cargar la lista de alumnos.
              </td>
            </tr>
            <tr v-else-if="loadingStudents" class="text-slate-450">
              <td colspan="3" class="px-6 py-12 text-center">
                <div class="flex justify-center items-center gap-2">
                  <div class="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  Cargando estudiantes del paralelo...
                </div>
              </td>
            </tr>
            <tr v-else-if="students.length === 0" class="text-slate-500">
              <td colspan="3" class="px-6 py-12 text-center">
                Este grupo no tiene estudiantes matriculados.
              </td>
            </tr>
            <tr
              v-else
              v-for="student in students"
              :key="student.id"
              class="hover:bg-slate-900/10 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-bold text-white">
                  {{ student.usuario?.nombre }} {{ student.usuario?.apellido }}
                </div>
                <div class="text-xs text-slate-450">{{ student.usuario?.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-slate-350 font-medium">
                {{ student.ci }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <!-- Presente -->
                  <button
                    type="button"
                    @click="setAttendanceState(student.id, 'PRESENTE')"
                    :class="[
                      attendanceMap[student.id] === 'PRESENTE'
                        ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-350 hover:bg-slate-900/40',
                      'px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer w-24'
                    ]"
                  >
                    PRESENTE
                  </button>

                  <!-- Falta -->
                  <button
                    type="button"
                    @click="setAttendanceState(student.id, 'FALTA')"
                    :class="[
                      attendanceMap[student.id] === 'FALTA'
                        ? 'bg-rose-600 border-rose-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-350 hover:bg-slate-900/40',
                      'px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer w-24'
                    ]"
                  >
                    FALTA
                  </button>

                  <!-- Licencia -->
                  <button
                    type="button"
                    @click="setAttendanceState(student.id, 'LICENCIA')"
                    :class="[
                      attendanceMap[student.id] === 'LICENCIA'
                        ? 'bg-amber-600 border-amber-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-350 hover:bg-slate-900/40',
                      'px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer w-24'
                    ]"
                  >
                    LICENCIA
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Footer -->
      <div v-if="selectedGroupId && students.length > 0" class="px-6 py-4 bg-slate-900/20 border-t border-slate-850 flex justify-end">
        <button
          @click="guardarAsistencias"
          :disabled="submitting"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer disabled:opacity-50"
        >
          {{ submitting ? 'Guardando Asistencia...' : 'Guardar Lista de Asistencia' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../auth/store/auth';
import api from '../../../services/api';

const authStore = useAuthStore();

const grupos = ref([]);
const students = ref([]);
const selectedGroupId = ref('');
const fecha = ref(new Date().toISOString().substring(0, 10)); // Default to today

const loadingStudents = ref(false);
const submitting = ref(false);

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

// id_postulante => 'PRESENTE' | 'FALTA' | 'LICENCIA'
const attendanceMap = ref({});

async function loadGroups() {
  alert.show = false;
  try {
    const endpoint = authStore.role === 'DOCENTE' ? '/docente/grupos' : '/grupos';
    const response = await api.get(endpoint);
    grupos.value = response.data;
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al obtener la lista de paralelos.';
    alert.show = true;
  }
}

onMounted(() => {
  loadGroups();
});

async function loadStudents() {
  if (!selectedGroupId.value) {
    students.value = [];
    attendanceMap.value = {};
    return;
  }

  loadingStudents.value = true;
  alert.show = false;
  try {
    const response = await api.get(`/docente/grupos/${selectedGroupId.value}/estudiantes`);
    students.value = response.data;

    // Reset map, default all to PRESENTE
    const newMap = {};
    students.value.forEach(s => {
      newMap[s.id] = 'PRESENTE';
    });
    attendanceMap.value = newMap;
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al obtener alumnos del grupo.';
    alert.show = true;
    students.value = [];
  } finally {
    loadingStudents.value = false;
  }
}

function setAttendanceState(studentId, state) {
  attendanceMap.value[studentId] = state;
}

function bulkMark(state) {
  Object.keys(attendanceMap.value).forEach(key => {
    attendanceMap.value[key] = state;
  });
}

async function guardarAsistencias() {
  if (!selectedGroupId.value) return;

  submitting.value = true;
  alert.show = false;

  const estudiantesPayload = Object.keys(attendanceMap.value).map(id => ({
    id_postulante: Number(id),
    estado: attendanceMap.value[id]
  }));

  try {
    await api.post('/docente/asistencias', {
      id_grupo: Number(selectedGroupId.value),
      fecha: fecha.value,
      estudiantes: estudiantesPayload
    });

    alert.isSuccess = true;
    alert.message = 'Parte de asistencia guardado exitosamente en el sistema.';
    alert.show = true;
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al registrar asistencias.';
    alert.show = true;
  } finally {
    submitting.value = false;
  }
}
</script>
