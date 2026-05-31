<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Mi Perfil Estudiantil</h1>
      <p class="text-slate-400 mt-1">Gestione sus datos personales, revise su estado de admisión y consulte sus calificaciones.</p>
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

    <div v-if="loading" class="text-slate-400 text-center py-12">
      <div class="inline-flex items-center gap-2">
        <div class="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        Cargando perfil...
      </div>
    </div>

    <div v-else-if="!profileData" class="text-rose-400 text-center py-12">
      No se pudo cargar el perfil del estudiante. Asegúrese de que su usuario tenga un perfil de postulante asignado.
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Student Card & Status -->
      <div class="space-y-6 lg:col-span-1">
        <!-- Main Card -->
        <div class="glass-panel rounded-2xl p-6 flex flex-col items-center text-center">
          <div class="h-24 w-24 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center font-extrabold text-3xl text-indigo-400 mb-4 shadow-inner">
            {{ profileData.usuario?.nombre?.[0] || 'U' }}{{ profileData.usuario?.apellido?.[0] || '' }}
          </div>
          <h2 class="text-xl font-bold text-white">{{ profileData.usuario?.nombre }} {{ profileData.usuario?.apellido }}</h2>
          <p class="text-sm text-slate-400 mt-0.5">Postulante</p>
          <span class="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            C.I. {{ profileData.ci }}
          </span>

          <div class="w-full border-t border-slate-800/80 my-5 pt-5 space-y-3.5 text-left text-xs">
            <div class="flex justify-between">
              <span class="text-slate-400">Género:</span>
              <span class="text-slate-200 font-medium">{{ profileData.sexo === 'M' ? 'Masculino' : 'Femenino' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">F. Nacimiento:</span>
              <span class="text-slate-200 font-medium">{{ formatDate(profileData.fecha_nacimiento) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Gestión:</span>
              <span class="text-slate-200 font-medium">{{ profileData.gestion_academica?.periodo }} - {{ profileData.gestion_academica?.anio }}</span>
            </div>
          </div>
        </div>

        <!-- Academic & Payment Status -->
        <div class="glass-panel rounded-2xl p-6 space-y-4">
          <h3 class="font-bold text-white text-sm uppercase tracking-wider text-slate-300">Estado de Admisión</h3>
          
          <div class="space-y-4">
            <!-- Payment Status -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
              <div>
                <p class="text-xs text-slate-400 font-medium">Pago Inscripción</p>
                <p class="text-sm font-bold mt-0.5" :class="profileData.pago_procesado ? 'text-emerald-400' : 'text-amber-400'">
                  {{ profileData.pago_procesado ? 'Procesado' : 'Pendiente' }}
                </p>
              </div>
              <div :class="[profileData.pago_procesado ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400', 'h-8 w-8 rounded-lg flex items-center justify-center border']">
                <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <!-- Career Assignment -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
              <div>
                <p class="text-xs text-slate-400 font-medium">Carrera Asignada</p>
                <p class="text-sm font-bold text-white mt-0.5">
                  {{ profileData.carrera_asignada?.nombre || 'No Asignada Aún' }}
                </p>
              </div>
              <div class="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 h-8 w-8 rounded-lg flex items-center justify-center border">
                <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
            </div>

            <!-- Admission Status -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
              <div>
                <p class="text-xs text-slate-400 font-medium">Estado Final</p>
                <p class="text-sm font-bold mt-0.5 capitalize" :class="[
                  profileData.estado_final === 'APROBADO' ? 'text-emerald-400' :
                  profileData.estado_final === 'REPROBADO' ? 'text-rose-400' : 'text-blue-400'
                ]">
                  {{ profileData.estado_final?.toLowerCase() }}
                </p>
              </div>
              <div :class="[
                profileData.estado_final === 'APROBADO' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                profileData.estado_final === 'REPROBADO' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400',
                'h-8 w-8 rounded-lg flex items-center justify-center border'
              ]">
                <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Personal Data & Calificaciones -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Info Form -->
        <div class="glass-panel rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Editar Datos Personales
          </h3>

          <form @submit.prevent="updateProfile" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Nombre -->
              <div>
                <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Nombre</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <!-- Apellido -->
              <div>
                <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Apellido</label>
                <input
                  v-model="form.apellido"
                  type="text"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <!-- Teléfono -->
              <div>
                <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-1.5">Teléfono</label>
                <input
                  v-model="form.telefono"
                  type="text"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                  placeholder="Ej: 76543210"
                />
              </div>

              <!-- Ciudad -->
              <div>
                <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-1.5">Ciudad</label>
                <input
                  v-model="form.ciudad"
                  type="text"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                  placeholder="Ej: Santa Cruz"
                />
              </div>

              <!-- Colegio -->
              <div>
                <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-1.5">Colegio de Procedencia</label>
                <input
                  v-model="form.colegio_procedencia"
                  type="text"
                  class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                  placeholder="Ej: Colegio San Agustín"
                />
              </div>
            </div>

            <!-- Dirección -->
            <div>
              <label class="block text-xs font-semibold text-slate-455 uppercase tracking-wider mb-1.5">Dirección de Domicilio</label>
              <input
                v-model="form.direccion"
                type="text"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: Av. Principal Nro 123"
              />
            </div>

            <!-- Document Check read-only -->
            <div class="pt-2 flex items-center gap-2">
              <svg class="h-4.5 w-4.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs text-slate-400">
                Título Bachiller Verificado:
                <strong class="text-slate-200">{{ profileData.titulo_bachiller ? 'SÍ' : 'NO' }}</strong>
              </span>
            </div>

            <div class="flex justify-end pt-3">
              <button
                type="submit"
                :disabled="saving"
                class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Guardando Cambios...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Career choices and notes -->
        <div class="glass-panel rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Preferencia de Carreras
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div class="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span class="text-xs text-indigo-400 font-bold uppercase">Opción 1</span>
              <p class="font-semibold text-white mt-1">{{ profileData.carrera_opcion1?.nombre || 'No definida' }}</p>
              <p class="text-xs text-slate-500 mt-0.5">Código: {{ profileData.carrera_opcion1?.codigo || 'N/A' }}</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
              <span class="text-xs text-indigo-400 font-bold uppercase">Opción 2</span>
              <p class="font-semibold text-white mt-1">{{ profileData.carrera_opcion2?.nombre || 'No definida' }}</p>
              <p class="text-xs text-slate-500 mt-0.5">Código: {{ profileData.carrera_opcion2?.codigo || 'N/A' }}</p>
            </div>
          </div>
          
          <div v-if="profileData.otros_requisitos" class="mt-4 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl">
            <span class="text-xs text-amber-400 font-bold uppercase block">Observaciones Académicas</span>
            <p class="text-xs text-slate-300 mt-1 whitespace-pre-line leading-relaxed">{{ profileData.otros_requisitos }}</p>
          </div>
        </div>

        <!-- Grades Card (CU5 & CU6 Outcome) -->
        <div class="glass-panel rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
            <svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Historial de Calificaciones
          </h3>

          <div v-if="!profileData.calificacion" class="text-slate-500 text-center py-6 text-xs">
            Aún no se han registrado calificaciones para esta gestión académica.
          </div>
          <div v-else class="space-y-4">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Examen 1</span>
                <p class="text-lg font-bold text-white mt-1">{{ profileData.calificacion.nota1 || '0' }} / 100</p>
              </div>
              <div class="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Examen 2</span>
                <p class="text-lg font-bold text-white mt-1">{{ profileData.calificacion.nota2 || '0' }} / 100</p>
              </div>
              <div class="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
                <span class="text-[10px] text-slate-400 uppercase font-semibold">Examen 3</span>
                <p class="text-lg font-bold text-white mt-1">{{ profileData.calificacion.nota3 || '0' }} / 100</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30">
              <div>
                <p class="text-xs text-indigo-300 font-semibold">Calificación Final Promedio</p>
                <p class="text-[10px] text-slate-500">Calculado automáticamente sobre base aritmética.</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-extrabold text-indigo-400">{{ profileData.calificacion.promedio || '0.00' }}</p>
                <span :class="[
                  profileData.calificacion.promedio >= 51 ? 'text-emerald-400' : 'text-rose-400',
                  'text-[10px] font-bold uppercase'
                ]">
                  {{ profileData.calificacion.promedio >= 51 ? 'Nota de Aprobación' : 'Nota de Reprobación' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '../../auth/store/auth';
import api from '../../../services/api';

const authStore = useAuthStore();

const loading = ref(false);
const saving = ref(false);
const profileData = ref(null);

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

const form = reactive({
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  colegio_procedencia: '',
  ciudad: ''
});

async function loadProfile() {
  loading.value = true;
  alert.show = false;
  try {
    // 1. Fetch fresh user context from auth/me
    await authStore.fetchMe();
    
    // 2. Identify the student's primary profile key
    const postProfile = authStore.user?.postulante;
    if (!postProfile) {
      profileData.value = null;
      return;
    }

    // 3. Query the detailed profile endpoint
    const response = await api.get(`/postulantes/${postProfile.id}`);
    profileData.value = response.data;

    // Bind form fields
    form.nombre = response.data.usuario?.nombre || '';
    form.apellido = response.data.usuario?.apellido || '';
    form.email = response.data.usuario?.email || '';
    form.telefono = response.data.telefono || '';
    form.direccion = response.data.direccion || '';
    form.colegio_procedencia = response.data.colegio_procedencia || '';
    form.ciudad = response.data.ciudad || '';
  } catch (err) {
    profileData.value = null;
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al obtener la información de perfil.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadProfile();
});

async function updateProfile() {
  if (!profileData.value) return;
  saving.value = true;
  alert.show = false;
  try {
    await api.put(`/postulantes/${profileData.value.id}`, form);
    alert.isSuccess = true;
    alert.message = 'Sus datos personales se actualizaron correctamente.';
    alert.show = true;
    await loadProfile();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al guardar los cambios en su perfil.';
    alert.show = true;
  } finally {
    saving.value = false;
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
</script>
