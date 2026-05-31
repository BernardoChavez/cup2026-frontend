<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 12</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Gestión Académica</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left side: Open new academic term form mockup -->
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Aperturar Ciclo</h3>
        <p class="text-xs text-slate-450 leading-relaxed">
          Inicie una nueva gestión académica habilitando postulaciones y aranceles asociados.
        </p>

        <form class="space-y-3 text-xs" @submit.prevent>
          <div>
            <label class="block text-slate-500 mb-1">Año de Gestión</label>
            <input type="text" value="2026" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          <div>
            <label class="block text-slate-500 mb-1">Período de Nivelación</label>
            <input type="text" value="CUP-II" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          <div class="flex items-center gap-3 py-2">
            <input type="checkbox" disabled class="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-indigo-650" />
            <span class="text-slate-400">Establecer como ciclo activo por defecto</span>
          </div>

          <div class="pt-3 border-t border-slate-900 flex justify-end">
            <button type="button" disabled class="w-full py-2.5 bg-indigo-600 rounded-xl text-white font-bold cursor-not-allowed">Habilitar Ciclo Académico</button>
          </div>
        </form>
      </div>

      <!-- Right side: Cycles List Table mockup -->
      <div class="glass-panel rounded-2xl p-5 lg:col-span-2 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Ciclos Académicos Registrados</h3>
        
        <div class="overflow-x-auto text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-slate-450 uppercase font-semibold">
                <th class="p-3">ID</th>
                <th class="p-3">Periodo</th>
                <th class="p-3 text-center">Año</th>
                <th class="p-3 text-center">Estado de Admisión</th>
                <th class="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300">
              <tr v-for="g in list" :key="g.id" class="hover:bg-slate-900/10 transition-colors">
                <td class="p-3 font-mono text-slate-500">#{{ g.id }}</td>
                <td class="p-3 font-bold text-white">{{ g.periodo }}</td>
                <td class="p-3 text-center">{{ g.anio }}</td>
                <td class="p-3 text-center">
                  <span class="px-2 py-0.5 rounded text-[9px] font-bold border" :class="g.activo ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500'">
                    {{ g.activo ? 'ACTIVO' : 'CONCLUIDO' }}
                  </span>
                </td>
                <td class="p-3 text-right">
                  <button type="button" disabled class="text-[10px] text-indigo-400 font-bold hover:underline cursor-not-allowed">
                    {{ g.activo ? 'Cerrar Ciclo' : 'Archivado' }}
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
import { ref } from 'vue';

const list = ref([
  { id: 1, periodo: 'CUP-I', anio: 2026, activo: true },
  { id: 2, periodo: 'CUP-II', anio: 2025, activo: false }
]);
</script>
