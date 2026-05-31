<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 9</span>
        <h2 class="text-2xl font-black text-white mt-1">Consultar Dashboard Administrativo</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Metrics Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div v-for="m in metrics" :key="m.title" class="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
        <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{{ m.title }}</span>
        <p class="text-2xl font-black text-white leading-none">{{ m.value }}</p>
        <span class="text-[9px] px-1.5 py-0.5 rounded font-semibold inline-block" :class="m.badgeStyle">
          {{ m.badge }}
        </span>
      </div>
    </div>

    <!-- Charts / Stats grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Simulated SVG Donut Chart Card -->
      <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[300px]">
        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Tasa de Admisión Global</h3>
          <p class="text-[10px] text-slate-500 mt-1">Porcentaje de estudiantes admitidos en la gestión 2026.</p>
        </div>

        <div class="flex items-center justify-center gap-6 my-auto">
          <!-- SVG Circular chart -->
          <div class="relative h-28 w-28 flex items-center justify-center">
            <svg class="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-slate-850" stroke="currentColor" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="text-indigo-550" stroke="currentColor" stroke-dasharray="57, 100" stroke-width="3" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div class="absolute text-center">
              <span class="text-xl font-black text-white">57.1%</span>
            </div>
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-indigo-500"></span>
              <span class="text-slate-300">Admitidos (104)</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="h-2 w-2 rounded-full bg-slate-700"></span>
              <span class="text-slate-500">Reprobados (78)</span>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-900 pt-3 text-[10px] text-slate-500 text-center">
          Meta de Rendimiento Institucional: 60%
        </div>
      </div>

      <!-- Cupos Asignados por Carrera (Simulated Bar Graph) -->
      <div class="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col justify-between h-[300px]">
        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Cupos Asignados por Carrera</h3>
          <p class="text-[10px] text-slate-500 mt-1">Progreso de ocupación de vacantes habilitadas por carrera.</p>
        </div>

        <div class="space-y-4 my-auto">
          <div v-for="c in careers" :key="c.name" class="space-y-1">
            <div class="flex justify-between text-xs font-bold">
              <span class="text-slate-300">{{ c.name }}</span>
              <span class="text-slate-450">{{ c.ocupados }} / {{ c.total }} cupos</span>
            </div>
            <div class="w-full bg-slate-950 border border-slate-900 rounded-full h-2.5 overflow-hidden">
              <div class="h-full rounded-full bg-gradient-to-r" :class="c.color" :style="{ width: (c.ocupados / c.total * 100) + '%' }"></div>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-900 pt-3 text-[10px] text-slate-500 flex justify-between">
          <span>Actualizado en tiempo real</span>
          <span>Cerrando cupos automáticamente</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const metrics = ref([
  { title: 'Total Postulantes', value: '182', badge: 'Habilitados para CUP', badgeStyle: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' },
  { title: 'Pagos Conciliados', value: 'Bs. 63,700', badge: '182 Transacciones', badgeStyle: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  { title: 'Alumnos Admitidos', value: '104', badge: '57% Tasa Éxito', badgeStyle: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  { title: 'Docentes Activos', value: '8', badge: '4 Paralelos', badgeStyle: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' }
]);

const careers = ref([
  { name: 'Ingeniería de Sistemas', ocupados: 5, total: 5, color: 'from-emerald-500 to-teal-500' },
  { name: 'Ingeniería Informática', ocupados: 4, total: 5, color: 'from-indigo-500 to-purple-500' },
  { name: 'Ingeniería de Redes y Telecomunicaciones', ocupados: 1, total: 3, color: 'from-amber-500 to-orange-500' }
]);
</script>
