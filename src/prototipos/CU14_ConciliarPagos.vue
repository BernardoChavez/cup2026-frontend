<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 14</span>
        <h2 class="text-2xl font-black text-white mt-1">Conciliar Transacciones de Pago</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Stats & Actions panel -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="w in summary" :key="w.title" class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
        <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{{ w.title }}</span>
        <p class="text-2xl font-black text-white leading-none">{{ w.value }}</p>
        <span class="text-[9px] text-slate-450">{{ w.desc }}</span>
      </div>
    </div>

    <!-- Conciliation Table mockup -->
    <div class="glass-panel rounded-2xl overflow-hidden space-y-4">
      <div class="px-6 py-4 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Reportes Bancarios vs Declaraciones de Postulantes</h3>
        <button type="button" disabled class="px-3 py-1.5 bg-indigo-650 rounded-lg text-[10px] font-bold text-white cursor-not-allowed">
          Conciliar por Lotes
        </button>
      </div>

      <div class="overflow-x-auto p-4 text-xs">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/10 text-slate-450 uppercase font-semibold">
              <th class="p-3">Referencia Declarada</th>
              <th class="p-3">Banco Reportado</th>
              <th class="p-3 text-center">Monto</th>
              <th class="p-3">Postulante Relacionado</th>
              <th class="p-3 text-center">Nivel Coincidencia</th>
              <th class="p-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-300">
            <tr v-for="t in transactions" :key="t.ref" class="hover:bg-slate-900/10 transition-colors">
              <td class="p-3 font-mono font-bold text-slate-200">{{ t.ref }}</td>
              <td class="p-3 text-slate-400">{{ t.bank }}</td>
              <td class="p-3 text-center font-bold text-indigo-400">Bs. {{ t.amount }}</td>
              <td class="p-3">
                <p class="font-bold text-white">{{ t.student }}</p>
                <p class="text-[9px] text-slate-500">CI: {{ t.ci }}</p>
              </td>
              <td class="p-3 text-center">
                <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold" :class="getMatchStyles(t.match)">
                  {{ t.match }}% Coincidencia
                </span>
              </td>
              <td class="p-3 text-right">
                <button type="button" disabled class="px-3 py-1 bg-emerald-600 rounded text-[10px] font-bold text-white hover:bg-emerald-500 cursor-not-allowed">
                  Aprobar Conciliación
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const summary = ref([
  { title: 'Depósitos Declarados', value: '182', desc: 'Pendientes por validar' },
  { title: 'Monto a Conciliar', value: 'Bs. 63,700', desc: '350 Bs por matrícula' },
  { title: 'Conexión Core Bancario', value: 'ONLINE', desc: 'Banco Unión API v2.0' }
]);

const transactions = ref([
  { ref: 'DEP-9981273', bank: 'Banco Mercantil', amount: '350.00', student: 'Fernando Vargas', ci: '8327461-SC', match: 100 },
  { ref: 'DEP-7736183', bank: 'Banco Unión', amount: '350.00', student: 'Gabriela Mendoza', ci: '9182736-LP', match: 100 },
  { ref: 'DEP-1029381', bank: 'Banco FIE', amount: '300.00', student: 'Humberto Ortega', ci: '7483921-CB', match: 50 }
]);

function getMatchStyles(match) {
  if (match === 100) return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
  return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
}
</script>
