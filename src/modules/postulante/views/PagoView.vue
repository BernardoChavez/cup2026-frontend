<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Registro y Conciliación de Pagos</h1>
      <p class="text-slate-400 mt-1">
        {{ isPostulante ? 'Registre su comprobante de pago bancario para habilitar sus opciones académicas.' : 'Revise y apruebe las solicitudes de pago enviadas por los postulantes.' }}
      </p>
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

    <!-- 1. POSTULANTE VIEW -->
    <div v-if="isPostulante" class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Payment Status Card -->
      <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[280px]">
        <div>
          <span class="text-xs text-indigo-400 font-bold uppercase tracking-wider">Estado del Pago</span>
          <h3 class="text-2xl font-black mt-2" :class="[
            paymentStatus === 'PAID' ? 'text-emerald-400' :
            paymentStatus === 'PENDING' ? 'text-amber-400' : 'text-slate-400'
          ]">
            {{ paymentStatus === 'PAID' ? 'CONCILIADO' : paymentStatus === 'PENDING' ? 'EN REVISIÓN' : 'NO REGISTRADO' }}
          </h3>
          <p class="text-xs text-slate-450 mt-3 leading-relaxed">
            {{
              paymentStatus === 'PAID'
                ? 'Su pago ha sido validado correctamente. Ya se encuentra completamente habilitado en el sistema.'
                : paymentStatus === 'PENDING'
                ? 'Hemos recibido los datos de su transferencia. Un administrador verificará la transacción a la brevedad.'
                : 'Por favor, realice el depósito bancario e ingrese los datos del comprobante a la derecha para iniciar la revisión.'
            }}
          </p>
        </div>

        <!-- Visual Badge -->
        <div class="flex items-center gap-3 pt-4 border-t border-slate-800/80">
          <div :class="[
            paymentStatus === 'PAID' ? 'bg-emerald-500/10 text-emerald-400' :
            paymentStatus === 'PENDING' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-500',
            'h-10 w-10 rounded-xl flex items-center justify-center border border-current/20'
          ]">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <p class="text-[10px] text-slate-550 uppercase font-semibold">Monto del Arancel</p>
            <p class="text-sm font-bold text-slate-200">Bs. 350.00</p>
          </div>
        </div>
      </div>

      <!-- Payment Register Form / Detail View -->
      <div class="glass-panel rounded-2xl p-6 md:col-span-2">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {{ paymentStatus === 'NONE' ? 'Registrar Datos de Transferencia' : 'Datos del Comprobante' }}
        </h3>

        <!-- Form (None status) -->
        <form v-if="paymentStatus === 'NONE'" @submit.prevent="registrarPago" class="space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Número de Transacción / Depósito *</label>
              <input
                v-model="studentForm.nro_transaccion_pago"
                type="text"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: DEP-9821736"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Monto Depositado (Bs.) *</label>
              <input
                v-model.number="studentForm.monto_pago"
                type="number"
                step="0.01"
                min="1"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: 350.00"
              />
            </div>
          </div>
          
          <div class="p-3 bg-slate-950/60 border border-slate-850 rounded-xl text-xs text-slate-450 leading-relaxed">
            <strong class="text-indigo-400 font-bold block mb-0.5">Nota Importante:</strong>
            Asegúrese de ingresar el número exacto del comprobante físico o digital. Cualquier error tipográfico demorará el proceso de conciliación manual de su matrícula.
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="submitting"
              class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Enviando...' : 'Enviar Comprobante' }}
            </button>
          </div>
        </form>

        <!-- Details (Pending / Paid status) -->
        <div v-else class="space-y-4">
          <div class="grid grid-cols-2 gap-4 text-sm bg-slate-950/40 p-4 border border-slate-850 rounded-xl">
            <div>
              <span class="text-xs text-slate-500">Nro. de Transacción:</span>
              <p class="font-mono font-bold text-white mt-0.5">{{ studentProfile?.nro_transaccion_pago }}</p>
            </div>
            <div>
              <span class="text-xs text-slate-500">Monto Reportado:</span>
              <p class="font-bold text-white mt-0.5">Bs. {{ studentProfile?.monto_pago }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 text-xs" :class="paymentStatus === 'PAID' ? 'text-emerald-400' : 'text-amber-400'">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {{ paymentStatus === 'PAID' ? 'Validado y aprobado por el área de finanzas.' : 'El comprobante está siendo revisado por nuestro equipo.' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. ADMIN / COORDINATOR VIEW -->
    <div v-else class="space-y-6">
      <!-- Search and Quick Register on Behalf -->
      <div class="glass-panel rounded-2xl p-6">
        <h3 class="text-lg font-bold text-white mb-4">Registrar Pago en Ventanilla</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Seleccionar Postulante</label>
            <select
              v-model="adminRegister.id_postulante"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="">-- Seleccionar Alumno --</option>
              <option v-for="p in allPostulantes" :key="p.id" :value="p.id">
                {{ p.usuario?.nombre }} {{ p.usuario?.apellido }} (C.I. {{ p.ci }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Código Transacción</label>
            <input
              v-model="adminRegister.nro_transaccion_pago"
              type="text"
              class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
              placeholder="Ej: EFECTIVO-102"
            />
          </div>
          <div class="flex items-end gap-3">
            <div class="flex-1">
              <label class="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-1.5">Monto (Bs.)</label>
              <input
                v-model.number="adminRegister.monto_pago"
                type="number"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="350.00"
              />
            </div>
            <button
              @click="registrarPagoAdmin"
              :disabled="submitting || !adminRegister.id_postulante || !adminRegister.nro_transaccion_pago"
              class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Registrar
            </button>
          </div>
        </div>
      </div>

      <!-- Pending Payments List -->
      <div class="glass-panel rounded-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between">
          <h3 class="text-lg font-bold text-white">Comprobantes Pendientes de Conciliación</h3>
          <button @click="loadPendientes" class="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 cursor-pointer">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 4.79M9 9h1.586l4.7 4.7" />
            </svg>
            Actualizar
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-xs font-semibold text-slate-450 uppercase tracking-wider bg-slate-900/10">
                <th class="px-6 py-4">Postulante</th>
                <th class="px-6 py-4">C.I.</th>
                <th class="px-6 py-4">Nro. Transacción</th>
                <th class="px-6 py-4">Monto Reportado</th>
                <th class="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-sm">
              <tr v-if="loading" class="text-slate-450">
                <td colspan="5" class="px-6 py-8 text-center">
                  <div class="flex justify-center items-center gap-2">
                    <div class="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    Cargando solicitudes...
                  </div>
                </td>
              </tr>
              <tr v-else-if="pendientes.length === 0" class="text-slate-500">
                <td colspan="5" class="px-6 py-8 text-center">
                  No hay comprobantes pendientes de conciliación.
                </td>
              </tr>
              <tr
                v-for="p in pendientes"
                :key="p.id"
                class="hover:bg-slate-900/10 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-bold text-white">
                    {{ p.usuario?.nombre }} {{ p.usuario?.apellido }}
                  </div>
                  <div class="text-xs text-slate-450">{{ p.usuario?.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-white font-medium">
                  {{ p.ci }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-indigo-300 font-mono font-bold">
                  {{ p.nro_transaccion_pago }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-white font-bold">
                  Bs. {{ p.monto_pago }}
                </td>
                <td class="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    @click="conciliarPago(p.id)"
                    :disabled="loadingConciliar === p.id"
                    class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {{ loadingConciliar === p.id ? 'Aprobando...' : 'Aprobar Pago' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useAuthStore } from '../../auth/store/auth';
import api from '../../../services/api';

const authStore = useAuthStore();

const isPostulante = computed(() => authStore.role === 'POSTULANTE');

const loading = ref(false);
const submitting = ref(false);
const loadingConciliar = ref(null);

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

// Student specifics
const studentProfile = ref(null);
const studentForm = reactive({
  nro_transaccion_pago: '',
  monto_pago: 350.00
});

// Admin specifics
const pendientes = ref([]);
const allPostulantes = ref([]);
const adminRegister = reactive({
  id_postulante: '',
  nro_transaccion_pago: '',
  monto_pago: 350.00
});

const paymentStatus = computed(() => {
  if (!studentProfile.value) return 'NONE';
  if (studentProfile.value.pago_procesado) return 'PAID';
  if (studentProfile.value.nro_transaccion_pago) return 'PENDING';
  return 'NONE';
});

async function loadStudentData() {
  loading.value = true;
  alert.show = false;
  try {
    await authStore.fetchMe();
    const myProfile = authStore.user?.postulante;
    if (myProfile) {
      const response = await api.get(`/postulantes/${myProfile.id}`);
      studentProfile.value = response.data;
    }
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al obtener sus datos de pago.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
}

async function loadPendientes() {
  loading.value = true;
  alert.show = false;
  try {
    const response = await api.get('/admin/pago/pendientes');
    pendientes.value = response.data;
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al listar pagos pendientes.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
}

async function loadAllPostulantes() {
  try {
    const response = await api.get('/postulantes');
    // Filter to those who haven't paid yet
    allPostulantes.value = response.data.filter(p => !p.pago_procesado);
  } catch (err) {
    console.error('Failed to load all student records:', err);
  }
}

onMounted(() => {
  if (isPostulante.value) {
    loadStudentData();
  } else {
    loadPendientes();
    loadAllPostulantes();
  }
});

async function registrarPago() {
  submitting.value = true;
  alert.show = false;
  try {
    const response = await api.post('/postulantes/pago', studentForm);
    alert.isSuccess = true;
    alert.message = response.data.message;
    alert.show = true;
    await loadStudentData();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al enviar comprobante.';
    alert.show = true;
  } finally {
    submitting.value = false;
  }
}

async function registrarPagoAdmin() {
  submitting.value = true;
  alert.show = false;
  try {
    const response = await api.post('/postulantes/pago', adminRegister);
    alert.isSuccess = true;
    alert.message = 'El pago se registró correctamente en el perfil del alumno.';
    alert.show = true;

    // Reset admin form
    adminRegister.id_postulante = '';
    adminRegister.nro_transaccion_pago = '';
    adminRegister.monto_pago = 350.00;

    await loadPendientes();
    await loadAllPostulantes();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al registrar el pago.';
    alert.show = true;
  } finally {
    submitting.value = false;
  }
}

async function conciliarPago(id) {
  loadingConciliar.value = id;
  alert.show = false;
  try {
    const response = await api.post(`/admin/pago/conciliar/${id}`);
    alert.isSuccess = true;
    alert.message = response.data.message;
    alert.show = true;
    
    await loadPendientes();
    await loadAllPostulantes();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al conciliar pago.';
    alert.show = true;
  } finally {
    loadingConciliar.value = null;
  }
}
</script>
