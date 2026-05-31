<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Registro de Calificaciones</h1>
        <p class="text-slate-400 mt-1">Gestione las notas de Computación, Matemáticas, Inglés y Física por parcial.</p>
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

    <!-- Filter & Search Controls -->
    <div class="glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:w-96 relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar estudiante por nombre o C.I..."
          class="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div class="w-full md:w-auto flex items-center gap-3">
        <!-- Filter Status -->
        <select
          v-model="filterStatus"
          class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="ALL">Todos los Alumnos</option>
          <option value="GRADED">Con Notas Registradas</option>
          <option value="UNGRADED">Sin Notas Registradas</option>
          <option value="PASSED">Aprobados (>= 51)</option>
          <option value="FAILED">Reprobados (< 51)</option>
        </select>
      </div>
    </div>

    <!-- Main List Card -->
    <div class="glass-panel rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/30 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th class="px-6 py-4">Postulante</th>
              <th class="px-6 py-4 text-center">C.I.</th>
              <th class="px-6 py-4 text-center">Comp. Promedio</th>
              <th class="px-6 py-4 text-center">Mat. Promedio</th>
              <th class="px-6 py-4 text-center">Ing. Promedio</th>
              <th class="px-6 py-4 text-center">Fis. Promedio</th>
              <th class="px-6 py-4 text-center">Promedio Global</th>
              <th class="px-6 py-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-sm">
            <tr v-if="loading" class="text-slate-400">
              <td colspan="8" class="px-6 py-10 text-center">
                <div class="flex justify-center items-center gap-2">
                  <div class="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  Cargando calificaciones...
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredList.length === 0" class="text-slate-555">
              <td colspan="8" class="px-6 py-10 text-center">
                No se encontraron estudiantes para los criterios seleccionados.
              </td>
            </tr>
            <tr
              v-for="student in filteredList"
              :key="student.id"
              class="hover:bg-slate-900/20 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="font-bold text-white">
                  {{ student.usuario?.nombre }} {{ student.usuario?.apellido }}
                </div>
                <div class="text-xs text-slate-450">{{ student.usuario?.email }}</div>
              </td>
              <td class="px-6 py-4 text-center text-slate-300 font-medium">
                {{ student.ci }}
              </td>
              <!-- Comp Average -->
              <td class="px-6 py-4 text-center">
                <span class="font-semibold" :class="getScoreColor(student.grades?.comp_promedio)">
                  {{ student.grades ? student.grades.comp_promedio : '-' }}
                </span>
              </td>
              <!-- Mat Average -->
              <td class="px-6 py-4 text-center">
                <span class="font-semibold" :class="getScoreColor(student.grades?.mat_promedio)">
                  {{ student.grades ? student.grades.mat_promedio : '-' }}
                </span>
              </td>
              <!-- Ing Average -->
              <td class="px-6 py-4 text-center">
                <span class="font-semibold" :class="getScoreColor(student.grades?.ing_promedio)">
                  {{ student.grades ? student.grades.ing_promedio : '-' }}
                </span>
              </td>
              <!-- Fis Average -->
              <td class="px-6 py-4 text-center">
                <span class="font-semibold" :class="getScoreColor(student.grades?.fis_promedio)">
                  {{ student.grades ? student.grades.fis_promedio : '-' }}
                </span>
              </td>
              <!-- Global Average -->
              <td class="px-6 py-4 text-center">
                <span
                  v-if="student.grades"
                  :class="[
                    student.grades.promedio_final_global >= 51
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                    'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-black border'
                  ]"
                >
                  {{ student.grades.promedio_final_global }}
                </span>
                <span v-else class="text-slate-500 italic text-xs">Sin evaluar</span>
              </td>
              <!-- Action -->
              <td class="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                <button
                  @click="openGradeModal(student)"
                  class="flex items-center gap-1 ml-auto px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Evaluar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Evaluation Modal -->
    <div v-if="modal.show" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white">Registrar Notas Parciales</h3>
            <p class="text-xs text-slate-400 mt-0.5">Estudiante: {{ modal.studentName }} (C.I. {{ modal.studentCi }})</p>
          </div>
          <button @click="modal.show = false" class="text-slate-400 hover:text-slate-200 cursor-pointer">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <form @submit.prevent="saveGrades" class="p-6 space-y-6">
          <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            <!-- Computación -->
            <div class="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-3">
              <div class="flex justify-between items-center border-b border-slate-900 pb-2">
                <span class="text-sm font-bold text-indigo-400 uppercase tracking-wide">Computación</span>
                <span class="text-xs text-slate-450 font-medium">Promedio: {{ calculateSubjectAverage('comp') }}</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 1</label>
                  <input v-model.number="form.comp_n1" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 2</label>
                  <input v-model.number="form.comp_n2" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 3</label>
                  <input v-model.number="form.comp_n3" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

            <!-- Matemáticas -->
            <div class="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-3">
              <div class="flex justify-between items-center border-b border-slate-900 pb-2">
                <span class="text-sm font-bold text-indigo-400 uppercase tracking-wide">Matemáticas</span>
                <span class="text-xs text-slate-450 font-medium">Promedio: {{ calculateSubjectAverage('mat') }}</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 1</label>
                  <input v-model.number="form.mat_n1" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 2</label>
                  <input v-model.number="form.mat_n2" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 3</label>
                  <input v-model.number="form.mat_n3" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

            <!-- Inglés -->
            <div class="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-3">
              <div class="flex justify-between items-center border-b border-slate-900 pb-2">
                <span class="text-sm font-bold text-indigo-400 uppercase tracking-wide">Inglés</span>
                <span class="text-xs text-slate-450 font-medium">Promedio: {{ calculateSubjectAverage('ing') }}</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 1</label>
                  <input v-model.number="form.ing_n1" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 2</label>
                  <input v-model.number="form.ing_n2" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 3</label>
                  <input v-model.number="form.ing_n3" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

            <!-- Física -->
            <div class="p-4 rounded-xl bg-slate-950/40 border border-slate-850 space-y-3">
              <div class="flex justify-between items-center border-b border-slate-900 pb-2">
                <span class="text-sm font-bold text-indigo-400 uppercase tracking-wide">Física</span>
                <span class="text-xs text-slate-450 font-medium">Promedio: {{ calculateSubjectAverage('fis') }}</span>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 1</label>
                  <input v-model.number="form.fis_n1" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 2</label>
                  <input v-model.number="form.fis_n2" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Parcial 3</label>
                  <input v-model.number="form.fis_n3" type="number" min="0" max="100" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- Total Estimado -->
          <div class="flex justify-between items-center bg-indigo-950/15 border border-indigo-900/30 p-4 rounded-xl">
            <div>
              <span class="text-xs font-semibold text-indigo-300">Estimación de Promedio Final Global</span>
              <p class="text-[10px] text-slate-450">Calculado sobre la media de las 4 asignaturas.</p>
            </div>
            <div class="text-right">
              <span class="text-xl font-extrabold text-indigo-400">{{ calculateGlobalAverage() }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 border-t border-slate-800 pt-4 bg-slate-900/10">
            <button
              type="button"
              @click="modal.show = false"
              class="px-4 py-2 border border-slate-850 hover:bg-slate-900 rounded-xl text-slate-350 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all disabled:opacity-50 cursor-pointer"
            >
              {{ saving ? 'Guardando...' : 'Guardar Calificaciones' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import api from '../../../services/api';

const loading = ref(false);
const saving = ref(false);

const postulantes = ref([]);
const calificaciones = ref([]);

const searchQuery = ref('');
const filterStatus = ref('ALL');

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

const modal = reactive({
  show: false,
  studentId: null,
  studentName: '',
  studentCi: ''
});

const form = reactive({
  comp_n1: 0, comp_n2: 0, comp_n3: 0,
  mat_n1: 0, mat_n2: 0, mat_n3: 0,
  ing_n1: 0, ing_n2: 0, ing_n3: 0,
  fis_n1: 0, fis_n2: 0, fis_n3: 0
});

async function loadData() {
  loading.value = true;
  alert.show = false;
  try {
    const [postRes, calRes] = await Promise.all([
      api.get('/postulantes'),
      api.get('/calificaciones')
    ]);
    postulantes.value = postRes.data;
    calificaciones.value = calRes.data;
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al obtener calificaciones.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
});

// Join postulantes with their grades
const joinedList = computed(() => {
  return postulantes.value.map(p => {
    const grades = calificaciones.value.find(c => c.id_postulante === p.id);
    return {
      ...p,
      grades: grades || null
    };
  });
});

const filteredList = computed(() => {
  return joinedList.value.filter(item => {
    const q = searchQuery.value.toLowerCase();
    const nameMatch = !q ||
      item.usuario?.nombre?.toLowerCase().includes(q) ||
      item.usuario?.apellido?.toLowerCase().includes(q) ||
      item.ci?.toLowerCase().includes(q);

    if (!nameMatch) return false;

    if (filterStatus.value === 'ALL') return true;
    if (filterStatus.value === 'GRADED') return item.grades !== null;
    if (filterStatus.value === 'UNGRADED') return item.grades === null;
    
    if (filterStatus.value === 'PASSED') {
      return item.grades && Number(item.grades.promedio_final_global) >= 51;
    }
    if (filterStatus.value === 'FAILED') {
      return item.grades && Number(item.grades.promedio_final_global) < 51;
    }

    return true;
  });
});

function getScoreColor(val) {
  if (val === undefined || val === null) return 'text-slate-550';
  const num = Number(val);
  if (num >= 51) return 'text-emerald-400';
  return 'text-rose-400';
}

function openGradeModal(student) {
  modal.studentId = student.id;
  modal.studentName = `${student.usuario?.nombre} ${student.usuario?.apellido}`;
  modal.studentCi = student.ci;

  const currentGrades = student.grades;
  if (currentGrades) {
    form.comp_n1 = Number(currentGrades.comp_n1);
    form.comp_n2 = Number(currentGrades.comp_n2);
    form.comp_n3 = Number(currentGrades.comp_n3);

    form.mat_n1 = Number(currentGrades.mat_n1);
    form.mat_n2 = Number(currentGrades.mat_n2);
    form.mat_n3 = Number(currentGrades.mat_n3);

    form.ing_n1 = Number(currentGrades.ing_n1);
    form.ing_n2 = Number(currentGrades.ing_n2);
    form.ing_n3 = Number(currentGrades.ing_n3);

    form.fis_n1 = Number(currentGrades.fis_n1);
    form.fis_n2 = Number(currentGrades.fis_n2);
    form.fis_n3 = Number(currentGrades.fis_n3);
  } else {
    // defaults
    form.comp_n1 = 0; form.comp_n2 = 0; form.comp_n3 = 0;
    form.mat_n1 = 0; form.mat_n2 = 0; form.mat_n3 = 0;
    form.ing_n1 = 0; form.ing_n2 = 0; form.ing_n3 = 0;
    form.fis_n1 = 0; form.fis_n2 = 0; form.fis_n3 = 0;
  }

  modal.show = true;
}

function calculateSubjectAverage(prefix) {
  const n1 = Number(form[`${prefix}_n1`]) || 0;
  const n2 = Number(form[`${prefix}_n2`]) || 0;
  const n3 = Number(form[`${prefix}_n3`]) || 0;
  return ((n1 + n2 + n3) / 3).toFixed(2);
}

function calculateGlobalAverage() {
  const comp = Number(calculateSubjectAverage('comp'));
  const mat = Number(calculateSubjectAverage('mat'));
  const ing = Number(calculateSubjectAverage('ing'));
  const fis = Number(calculateSubjectAverage('fis'));
  return ((comp + mat + ing + fis) / 4).toFixed(2);
}

async function saveGrades() {
  saving.value = true;
  alert.show = false;
  try {
    const payload = {
      id_postulante: modal.studentId,
      ...form
    };

    // Replace undefined/empty fields with 0
    Object.keys(payload).forEach(key => {
      if (payload[key] === '' || payload[key] === null) {
        payload[key] = 0;
      }
    });

    await api.post('/calificaciones/registro', payload);
    
    alert.isSuccess = true;
    alert.message = `Calificaciones de ${modal.studentName} guardadas exitosamente.`;
    alert.show = true;
    modal.show = false;
    await loadData();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al guardar calificaciones.';
    alert.show = true;
  } finally {
    saving.value = false;
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
