<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Carga Masiva Transaccional</h1>
      <p class="text-slate-400 mt-1">Cargue archivos CSV estructurados con la información oficial para el ciclo académico.</p>
    </div>

    <!-- Alert status message -->
    <div v-if="alert.show" :class="[alert.isSuccess ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400', 'border rounded-xl px-4 py-3 text-sm flex items-center gap-3 animate-pulse-subtle']">
      <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{{ alert.message }}</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 1. Postulantes Carga -->
      <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px]">
        <div>
          <div class="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mt-4">Importar Postulantes</h3>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">
            Sube el archivo CSV conteniendo las columnas obligatorias:<br>
            <code class="text-[10px] mt-1 bg-slate-950/80 text-indigo-300">nombre, apellido, email, password, ci, fecha_nacimiento, sexo, id_gestion_academica, id_carrera_opcion1, id_carrera_opcion2</code>
          </p>
        </div>

        <div class="space-y-4">
          <input 
            type="file" 
            ref="filePostulantes" 
            accept=".csv" 
            class="hidden" 
            @change="handleFileChange('postulantes')" 
          />
          <button 
            @click="$refs.filePostulantes.click()"
            class="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl text-sm text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer bg-slate-900/10"
          >
            {{ files.postulantes ? files.postulantes.name : 'Seleccionar Archivo CSV' }}
          </button>

          <button 
            @click="subirArchivo('postulantes')" 
            :disabled="loading.postulantes || !files.postulantes"
            class="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading.postulantes ? 'Importando...' : 'Iniciar Carga de Alumnos' }}
          </button>
        </div>
      </div>

      <!-- 2. Docentes Carga -->
      <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px]">
        <div>
          <div class="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mt-4">Importar Docentes</h3>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">
            Sube el archivo CSV conteniendo las columnas oficiales:<br>
            <code class="text-[10px] mt-1 bg-slate-950/80 text-indigo-300">nombre, apellido, email, password, profesional_area, maestria, diplomado_edu_sup, contratado</code>
          </p>
        </div>

        <div class="space-y-4">
          <input 
            type="file" 
            ref="fileDocentes" 
            accept=".csv" 
            class="hidden" 
            @change="handleFileChange('docentes')" 
          />
          <button 
            @click="$refs.fileDocentes.click()"
            class="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl text-sm text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer bg-slate-900/10"
          >
            {{ files.docentes ? files.docentes.name : 'Seleccionar Archivo CSV' }}
          </button>

          <button 
            @click="subirArchivo('docentes')" 
            :disabled="loading.docentes || !files.docentes"
            class="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading.docentes ? 'Importando...' : 'Iniciar Carga de Docentes' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import api from '../../../services/api';

const files = reactive({
  postulantes: null,
  docentes: null
});

const loading = reactive({
  postulantes: false,
  docentes: false
});

const alert = reactive({
  show: false,
  isSuccess: true,
  message: ''
});

const filePostulantes = ref(null);
const fileDocentes = ref(null);

function handleFileChange(type) {
  if (type === 'postulantes') {
    files.postulantes = filePostulantes.value.files[0] || null;
  } else {
    files.docentes = fileDocentes.value.files[0] || null;
  }
}

async function subirArchivo(type) {
  const file = files[type];
  if (!file) return;

  loading[type] = true;
  alert.show = false;

  const formData = new FormData();
  formData.append('archivo', file);

  try {
    const endpoint = type === 'postulantes' ? '/admin/carga-masiva/postulantes' : '/admin/carga-masiva/docentes';
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    alert.isSuccess = true;
    alert.message = response.data.message;
    alert.show = true;

    // Reset input
    files[type] = null;
    if (type === 'postulantes') filePostulantes.value.value = '';
    else fileDocentes.value.value = '';
  } catch (err) {
    alert.isSuccess = false;
    alert.message = err.response?.data?.message || 'Ocurrió un error al subir el archivo.';
    alert.show = true;
  } finally {
    loading[type] = false;
  }
}
</script>
