<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 3</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Postulantes</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left side: Postulantes list & search -->
      <div class="glass-panel rounded-2xl p-5 lg:col-span-1 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Lista de Postulantes</h3>
        
        <!-- Search -->
        <div class="relative">
          <input
            type="text"
            disabled
            placeholder="Buscar por CI o Apellido..."
            class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 focus:outline-none"
          />
          <svg class="h-4 w-4 absolute left-3 top-2.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Student Items -->
        <div class="space-y-2 max-h-[350px] overflow-y-auto pr-1">
          <div v-for="p in list" :key="p.ci" class="p-2.5 rounded-lg border cursor-pointer hover:bg-slate-900/40 transition-colors" :class="p.selected ? 'bg-indigo-950/20 border-indigo-500/40' : 'bg-slate-950/30 border-slate-800/80'">
            <p class="text-xs font-bold text-white">{{ p.nombre }} {{ p.apellido }}</p>
            <div class="flex justify-between items-center mt-1.5 text-[10px] text-slate-450">
              <span>CI: {{ p.ci }}</span>
              <span :class="getStatusClass(p.estado)">{{ p.estado }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Student Profile Form -->
      <div class="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">Perfil del Postulante Seleccionado</h3>
          <span class="text-xs font-bold text-indigo-400">CI: 8327461-SC</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Nombre Completo</label>
            <input type="text" value="Fernando Vargas" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Fecha de Nacimiento</label>
            <input type="text" value="2005-04-12" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Género</label>
            <input type="text" value="Masculino (M)" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Teléfono</label>
            <input type="text" value="+591 76092183" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Carrera Opción 1</label>
            <input type="text" value="Ingeniería de Sistemas (SIST)" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Carrera Opción 2</label>
            <input type="text" value="Ingeniería Informática (INF)" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Colegio de Procedencia</label>
            <input type="text" value="Colegio Mayor Santo Tomás" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Ciudad de Origen</label>
            <input type="text" value="Santa Cruz de la Sierra" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300" />
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl text-xs">
          <input type="checkbox" checked disabled class="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-indigo-650" />
          <span class="text-slate-400">Presentó Certificado de Bachiller legalizado física y digitalmente.</span>
        </div>

        <div class="flex justify-end gap-3 pt-3 border-t border-slate-850">
          <button type="button" disabled class="px-4 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white cursor-not-allowed">Editar</button>
          <button type="button" disabled class="px-4 py-2 bg-indigo-600 rounded-xl text-white font-semibold cursor-not-allowed">Guardar Datos</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const list = ref([
  { nombre: 'Fernando', apellido: 'Vargas', ci: '8327461-SC', estado: 'CURSANDO', selected: true },
  { nombre: 'Gabriela', apellido: 'Mendoza', ci: '9182736-LP', estado: 'APROBADO', selected: false },
  { nombre: 'Humberto', apellido: 'Ortega', ci: '7483921-CB', estado: 'REPROBADO', selected: false }
]);

function getStatusClass(state) {
  switch (state) {
    case 'APROBADO': return 'text-emerald-400';
    case 'REPROBADO': return 'text-rose-400';
    default: return 'text-blue-400';
  }
}
</script>
