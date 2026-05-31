<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 11</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Carreras y Cupos</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left side: Edit Career parameters mockup -->
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Habilitar Carrera</h3>
        <p class="text-xs text-slate-450 leading-relaxed">
          Configure los límites de aforo y vacantes máximas admisibles por ciclo.
        </p>

        <form class="space-y-3 text-xs" @submit.prevent>
          <div>
            <label class="block text-slate-500 mb-1">Código de Carrera</label>
            <input type="text" value="SIST" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          <div>
            <label class="block text-slate-500 mb-1">Nombre Oficial</label>
            <input type="text" value="Ingeniería de Sistemas" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          <div>
            <label class="block text-slate-500 mb-1">Cupos Máximos del Ciclo</label>
            <input type="number" value="5" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350 font-bold" />
          </div>
          
          <div class="pt-3 border-t border-slate-900 flex justify-end">
            <button type="button" disabled class="w-full py-2 bg-indigo-600 rounded-xl text-white font-bold cursor-not-allowed">Guardar Parámetros</button>
          </div>
        </form>
      </div>

      <!-- Right side: Careers List Table mockup -->
      <div class="glass-panel rounded-2xl p-5 lg:col-span-2 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Oferta Académica Habilitada</h3>
        
        <div class="overflow-x-auto text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-slate-450 uppercase font-semibold">
                <th class="p-3">Código</th>
                <th class="p-3">Nombre Carrera</th>
                <th class="p-3 text-center">Plazas Máximas</th>
                <th class="p-3 text-center">Cupos Ocupados</th>
                <th class="p-3 text-right">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300">
              <tr v-for="c in list" :key="c.codigo" class="hover:bg-slate-900/10 transition-colors">
                <td class="p-3 font-mono font-bold text-indigo-400">{{ c.codigo }}</td>
                <td class="p-3 font-bold text-white">{{ c.nombre }}</td>
                <td class="p-3 text-center font-bold">{{ c.total }}</td>
                <td class="p-3 text-center font-bold" :class="c.ocupados >= c.total ? 'text-rose-400' : 'text-emerald-450'">
                  {{ c.ocupados }}
                </td>
                <td class="p-3 text-right">
                  <span class="px-2 py-0.5 rounded text-[9px] font-bold border" :class="c.ocupados >= c.total ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'">
                    {{ c.ocupados >= c.total ? 'SATURADO' : 'VACANTES' }}
                  </span>
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
  { codigo: 'SIST', nombre: 'Ingeniería de Sistemas', total: 5, ocupados: 5 },
  { codigo: 'INF', nombre: 'Ingeniería Informática', total: 5, ocupados: 4 },
  { codigo: 'REDES', nombre: 'Ingeniería de Redes y Telecomunicaciones', total: 3, ocupados: 1 }
]);
</script>
