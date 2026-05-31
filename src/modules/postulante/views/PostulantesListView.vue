<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">Gestión de Postulantes</h1>
        <p class="text-slate-400 mt-1">Busque, edite y registre estudiantes postulantes para el ciclo académico.</p>
      </div>
      <div>
        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer text-sm"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Registrar Postulante
        </button>
      </div>
    </div>

    <!-- Alert status message -->
    <div v-if="alert.show" :class="[alert.isSuccess ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400', 'border rounded-xl px-4 py-3 text-sm flex items-center justify-between gap-3']">
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
          v-model="filters.search"
          type="text"
          placeholder="Buscar por Nombre, CI, Email..."
          class="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div class="w-full md:w-auto flex flex-wrap gap-3 items-center">
        <!-- Estado Filter -->
        <select
          v-model="filters.estado"
          class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="">Todos los Estados</option>
          <option value="CURSANDO">Cursando</option>
          <option value="APROBADO">Aprobado</option>
          <option value="REPROBADO">Reprobado</option>
        </select>

        <!-- Sexo Filter -->
        <select
          v-model="filters.sexo"
          class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="">Cualquier Género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <!-- Pago Filter -->
        <select
          v-model="filters.pago"
          class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="">Cualquier Pago</option>
          <option value="1">Pago Procesado</option>
          <option value="0">Pago Pendiente</option>
        </select>
      </div>
    </div>

    <!-- Table Container -->
    <div class="glass-panel rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/30 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <th class="px-6 py-4">Postulante</th>
              <th class="px-6 py-4">C.I. / Género</th>
              <th class="px-6 py-4">Carreras Opción</th>
              <th class="px-6 py-4">Carrera Asignada</th>
              <th class="px-6 py-4 text-center">Pago</th>
              <th class="px-6 py-4 text-center">Estado</th>
              <th class="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-sm">
            <tr v-if="loading" class="text-slate-400">
              <td colspan="7" class="px-6 py-10 text-center">
                <div class="flex justify-center items-center gap-2">
                  <div class="h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  Cargando postulantes...
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredPostulantes.length === 0" class="text-slate-500">
              <td colspan="7" class="px-6 py-10 text-center">
                No se encontraron postulantes registrados.
              </td>
            </tr>
            <tr
              v-for="postulante in filteredPostulantes"
              :key="postulante.id"
              class="hover:bg-slate-900/20 transition-colors"
            >
              <td class="px-6 py-4">
                <div>
                  <div class="font-bold text-white">
                    {{ postulante.usuario?.nombre }} {{ postulante.usuario?.apellido }}
                  </div>
                  <div class="text-xs text-slate-400 mt-0.5">
                    {{ postulante.usuario?.email }}
                  </div>
                  <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <svg class="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Período: {{ postulante.gestion_academica?.periodo }} - {{ postulante.gestion_academica?.anio }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-white font-medium">{{ postulante.ci }}</div>
                <div class="text-xs text-slate-400">Sex: {{ postulante.sexo }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-xs space-y-1">
                  <div>
                    <span class="text-indigo-400 font-semibold">1:</span>
                    <span class="text-slate-300 ml-1">{{ postulante.carrera_opcion1?.nombre || 'No disp.' }}</span>
                  </div>
                  <div>
                    <span class="text-indigo-400 font-semibold">2:</span>
                    <span class="text-slate-300 ml-1">{{ postulante.carrera_opcion2?.nombre || 'No disp.' }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="postulante.carrera_asignada"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {{ postulante.carrera_asignada?.nombre }}
                </span>
                <span v-else class="text-xs text-slate-500 italic">No Asignada</span>
              </td>
              <td class="px-6 py-4 text-center whitespace-nowrap">
                <span
                  :class="[
                    postulante.pago_procesado
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                    'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border'
                  ]"
                >
                  {{ postulante.pago_procesado ? 'Procesado' : 'Pendiente' }}
                </span>
              </td>
              <td class="px-6 py-4 text-center whitespace-nowrap">
                <span
                  :class="[
                    postulante.estado_final === 'APROBADO'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : postulante.estado_final === 'REPROBADO'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border capitalize'
                  ]"
                >
                  {{ postulante.estado_final?.toLowerCase() }}
                </span>
              </td>
              <td class="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEditModal(postulante)"
                    class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Editar Perfil"
                  >
                    <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    v-if="authStore.role === 'ADMIN'"
                    @click="eliminarPostulante(postulante.id)"
                    class="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Eliminar Postulante"
                  >
                    <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form (Create / Edit) -->
    <div v-if="modal.show" class="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in border border-slate-800">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
          <h3 class="text-xl font-bold text-white">
            {{ modal.isEdit ? 'Actualizar Postulante' : 'Registrar Nuevo Postulante' }}
          </h3>
          <button @click="modal.show = false" class="text-slate-400 hover:text-slate-200 cursor-pointer">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="guardarPostulante" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nombre -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Nombre *</label>
              <input
                v-model="form.nombre"
                type="text"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                placeholder="Nombre del estudiante"
              />
            </div>

            <!-- Apellido -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Apellido *</label>
              <input
                v-model="form.apellido"
                type="text"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                placeholder="Apellido del estudiante"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Email *</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <!-- Contraseña (only for create) -->
            <div v-if="!modal.isEdit">
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Contraseña (Opcional)</label>
              <input
                v-model="form.password"
                type="password"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                placeholder="Por defecto: 123456"
              />
            </div>

            <!-- CI -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Cédula de Identidad (C.I.) *</label>
              <input
                v-model="form.ci"
                type="text"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: 8765432"
              />
            </div>

            <!-- Fecha Nacimiento -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Fecha de Nacimiento *</label>
              <input
                v-model="form.fecha_nacimiento"
                type="date"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Género -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Género *</label>
              <select
                v-model="form.sexo"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>

            <!-- Gestión Académica -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Gestión Académica *</label>
              <select
                v-model="form.id_gestion_academica"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option v-for="g in gestiones" :key="g.id" :value="g.id">
                  {{ g.periodo }} - {{ g.anio }}
                </option>
              </select>
            </div>

            <!-- Carrera Opción 1 -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Carrera Opción 1 *</label>
              <select
                v-model="form.id_carrera_opcion1"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option v-for="c in carreras" :key="c.id" :value="c.id">
                  {{ c.nombre }} ({{ c.codigo }})
                </option>
              </select>
            </div>

            <!-- Carrera Opción 2 -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Carrera Opción 2 *</label>
              <select
                v-model="form.id_carrera_opcion2"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option v-for="c in carreras" :key="c.id" :value="c.id">
                  {{ c.nombre }} ({{ c.codigo }})
                </option>
              </select>
            </div>

            <!-- Carrera Asignada (only for edit) -->
            <div v-if="modal.isEdit">
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Carrera Asignada</label>
              <select
                v-model="form.id_carrera_asignada"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option :value="null">Ninguna (Pendiente)</option>
                <option v-for="c in carreras" :key="c.id" :value="c.id">
                  {{ c.nombre }} ({{ c.codigo }})
                </option>
              </select>
            </div>

            <!-- Estado Final (only for edit) -->
            <div v-if="modal.isEdit">
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Estado Académico *</label>
              <select
                v-model="form.estado_final"
                required
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="CURSANDO">Cursando</option>
                <option value="APROBADO">Aprobado</option>
                <option value="REPROBADO">Reprobado</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4">
            <!-- Teléfono -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Teléfono</label>
              <input
                v-model="form.telefono"
                type="text"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: 76543210"
              />
            </div>

            <!-- Colegio Procedencia -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Colegio de Procedencia</label>
              <input
                v-model="form.colegio_procedencia"
                type="text"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: Colegio San Agustín"
              />
            </div>

            <!-- Ciudad -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Ciudad de Origen</label>
              <input
                v-model="form.ciudad"
                type="text"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: Santa Cruz"
              />
            </div>

            <!-- Dirección -->
            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Dirección de Domicilio</label>
              <input
                v-model="form.direccion"
                type="text"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Ej: Av. Principal Nro 123"
              />
            </div>
          </div>

          <!-- Documentos y Otros Requisitos -->
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <input
                v-model="form.titulo_bachiller"
                type="checkbox"
                id="titulo_bachiller"
                class="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
              />
              <label for="titulo_bachiller" class="text-sm text-slate-350 select-none cursor-pointer">
                Presentó Título de Bachiller legalizado / certificado de estudios
              </label>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Observaciones / Otros Requisitos</label>
              <textarea
                v-model="form.otros_requisitos"
                rows="2"
                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-650 focus:outline-none focus:border-indigo-500"
                placeholder="Notas adicionales (Ej: Debe fotocopia legalizada de CI, certificado de nacimiento, etc.)"
              ></textarea>
            </div>
          </div>

          <!-- Modal Footer Buttons -->
          <div class="flex items-center justify-end gap-3 border-t border-slate-800 pt-4 bg-slate-900/10">
            <button
              type="button"
              @click="modal.show = false"
              class="px-4 py-2 border border-slate-850 hover:bg-slate-900 rounded-xl text-slate-300 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {{ saving ? 'Guardando...' : (modal.isEdit ? 'Actualizar' : 'Registrar') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useAuthStore } from '../../auth/store/auth';
import api from '../../../services/api';

const authStore = useAuthStore();

const postulantes = ref([]);
const carreras = ref([]);
const gestiones = ref([]);
const loading = ref(false);
const saving = ref(false);

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

const filters = reactive({
  search: '',
  estado: '',
  sexo: '',
  pago: ''
});

const modal = reactive({
  show: false,
  isEdit: false,
  editId: null
});

const form = reactive({
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  ci: '',
  fecha_nacimiento: '',
  sexo: 'M',
  direccion: '',
  telefono: '',
  colegio_procedencia: '',
  ciudad: '',
  titulo_bachiller: false,
  otros_requisitos: '',
  id_gestion_academica: '',
  id_carrera_opcion1: '',
  id_carrera_opcion2: '',
  id_carrera_asignada: null,
  estado_final: 'CURSANDO'
});

async function loadData() {
  loading.value = true;
  alert.show = false;
  try {
    const [postRes, carrRes, gestRes] = await Promise.all([
      api.get('/postulantes'),
      api.get('/carreras'),
      api.get('/gestiones-academicas')
    ]);
    postulantes.value = postRes.data;
    carreras.value = carrRes.data;
    gestiones.value = gestRes.data;

    // Pick first academic period as default if not defined
    if (gestiones.value.length > 0 && !form.id_gestion_academica) {
      form.id_gestion_academica = gestiones.value[0].id;
    }
    // Pick default careers if not defined
    if (carreras.value.length > 0) {
      if (!form.id_carrera_opcion1) form.id_carrera_opcion1 = carreras.value[0].id;
      if (carreras.value.length > 1 && !form.id_carrera_opcion2) form.id_carrera_opcion2 = carreras.value[1].id;
      else if (!form.id_carrera_opcion2) form.id_carrera_opcion2 = carreras.value[0].id;
    }
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al obtener la información de postulantes.';
    alert.show = true;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
});

const filteredPostulantes = computed(() => {
  return postulantes.value.filter(p => {
    const q = filters.search.toLowerCase();
    const matchesSearch = !q ||
      (p.usuario?.nombre?.toLowerCase().includes(q)) ||
      (p.usuario?.apellido?.toLowerCase().includes(q)) ||
      (p.usuario?.email?.toLowerCase().includes(q)) ||
      (p.ci?.toLowerCase().includes(q));

    const matchesEstado = !filters.estado || p.estado_final === filters.estado;
    const matchesSexo = !filters.sexo || p.sexo === filters.sexo;
    
    let matchesPago = true;
    if (filters.pago !== '') {
      const targetVal = filters.pago === '1';
      matchesPago = p.pago_procesado === targetVal;
    }

    return matchesSearch && matchesEstado && matchesSexo && matchesPago;
  });
});

function resetForm() {
  form.nombre = '';
  form.apellido = '';
  form.email = '';
  form.password = '';
  form.ci = '';
  form.fecha_nacimiento = '';
  form.sexo = 'M';
  form.direccion = '';
  form.telefono = '';
  form.colegio_procedencia = '';
  form.ciudad = '';
  form.titulo_bachiller = false;
  form.otros_requisitos = '';
  form.estado_final = 'CURSANDO';
  form.id_carrera_asignada = null;

  if (gestiones.value.length > 0) {
    form.id_gestion_academica = gestiones.value[0].id;
  }
  if (carreras.value.length > 0) {
    form.id_carrera_opcion1 = carreras.value[0].id;
    form.id_carrera_opcion2 = carreras.value[1]?.id || carreras.value[0].id;
  }
}

function openCreateModal() {
  resetForm();
  modal.isEdit = false;
  modal.editId = null;
  modal.show = true;
}

function openEditModal(postulante) {
  modal.isEdit = true;
  modal.editId = postulante.id;

  form.nombre = postulante.usuario?.nombre || '';
  form.apellido = postulante.usuario?.apellido || '';
  form.email = postulante.usuario?.email || '';
  form.password = ''; // Don't bind password on edit
  form.ci = postulante.ci || '';
  form.fecha_nacimiento = postulante.fecha_nacimiento || '';
  form.sexo = postulante.sexo || 'M';
  form.direccion = postulante.direccion || '';
  form.telefono = postulante.telefono || '';
  form.colegio_procedencia = postulante.colegio_procedencia || '';
  form.ciudad = postulante.ciudad || '';
  form.titulo_bachiller = !!postulante.titulo_bachiller;
  form.otros_requisitos = postulante.otros_requisitos || '';
  form.id_gestion_academica = postulante.id_gestion_academica;
  form.id_carrera_opcion1 = postulante.id_carrera_opcion1;
  form.id_carrera_opcion2 = postulante.id_carrera_opcion2;
  form.id_carrera_asignada = postulante.id_carrera_asignada;
  form.estado_final = postulante.estado_final || 'CURSANDO';

  modal.show = true;
}

async function guardarPostulante() {
  saving.value = true;
  alert.show = false;
  try {
    const payload = { ...form };
    if (!payload.password) delete payload.password; // clean empty password

    if (modal.isEdit) {
      await api.put(`/postulantes/${modal.editId}`, payload);
      alert.message = 'El perfil del postulante se ha actualizado correctamente.';
    } else {
      await api.post('/postulantes', payload);
      alert.message = 'El postulante se ha registrado correctamente.';
    }
    alert.isSuccess = true;
    alert.show = true;
    modal.show = false;
    await loadData();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al guardar el postulante.';
    alert.show = true;
  } finally {
    saving.value = false;
  }
}

async function eliminarPostulante(id) {
  if (!confirm('¿Está seguro de que desea eliminar permanentemente este postulante? Se eliminará también su cuenta de usuario vinculada.')) {
    return;
  }

  loading.value = true;
  alert.show = false;
  try {
    await api.delete(`/postulantes/${id}`);
    alert.isSuccess = true;
    alert.message = 'Postulante eliminado de forma permanente.';
    alert.show = true;
    await loadData();
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Error al eliminar el postulante.';
    alert.show = true;
    loading.value = false;
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
