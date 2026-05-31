<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 5</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Calificaciones</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="glass-panel rounded-2xl overflow-hidden space-y-4">
      <div class="px-6 py-4 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Planilla de Notas - Paralelo A</h3>
        <span class="text-xs text-slate-400">Docente: Ing. Alberto Gutiérrez</span>
      </div>

      <div class="overflow-x-auto p-4">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/10 text-slate-450 uppercase font-semibold">
              <th class="p-3">Postulante</th>
              <th class="p-3 text-center">C.I.</th>
              <th class="p-3 text-center bg-indigo-950/20 border-x border-slate-800/40">COMP (N1, N2, N3)</th>
              <th class="p-3 text-center border-r border-slate-800/40">MAT (N1, N2, N3)</th>
              <th class="p-3 text-center border-r border-slate-800/40">ING (N1, N2, N3)</th>
              <th class="p-3 text-center">FIS (N1, N2, N3)</th>
              <th class="p-3 text-center bg-indigo-900/10">Promedio</th>
              <th class="p-3 text-right">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-300">
            <tr v-for="s in list" :key="s.ci" class="hover:bg-slate-900/10 transition-colors">
              <td class="p-3">
                <p class="font-bold text-white">{{ s.nombre }} {{ s.apellido }}</p>
                <p class="text-[9px] text-slate-500">OP: {{ s.opcion1 }}</p>
              </td>
              <td class="p-3 text-center font-mono">{{ s.ci }}</td>
              
              <!-- COMP -->
              <td class="p-3 text-center bg-indigo-950/10 border-x border-slate-850">
                <div class="flex gap-1 justify-center">
                  <input type="text" :value="s.notes.comp.n1" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.comp.n2" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.comp.n3" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                </div>
              </td>

              <!-- MAT -->
              <td class="p-3 text-center border-r border-slate-850">
                <div class="flex gap-1 justify-center">
                  <input type="text" :value="s.notes.mat.n1" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.mat.n2" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.mat.n3" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                </div>
              </td>

              <!-- ING -->
              <td class="p-3 text-center border-r border-slate-850">
                <div class="flex gap-1 justify-center">
                  <input type="text" :value="s.notes.ing.n1" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.ing.n2" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.ing.n3" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                </div>
              </td>

              <!-- FIS -->
              <td class="p-3 text-center">
                <div class="flex gap-1 justify-center">
                  <input type="text" :value="s.notes.fis.n1" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.fis.n2" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                  <input type="text" :value="s.notes.fis.n3" disabled class="h-6 w-8 text-center bg-slate-950 border border-slate-800 text-white rounded font-bold" />
                </div>
              </td>

              <!-- Global Average -->
              <td class="p-3 text-center bg-indigo-900/10 font-black" :class="s.promedio >= 51 ? 'text-emerald-450' : 'text-rose-400'">
                {{ s.promedio }}
              </td>

              <!-- Status -->
              <td class="p-3 text-right">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold" :class="s.promedio >= 51 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'">
                  {{ s.promedio >= 51 ? 'Aprobado' : 'Reprobado' }}
                </span>
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

const list = ref([
  {
    nombre: 'Fernando',
    apellido: 'Vargas',
    ci: '8327461-SC',
    opcion1: 'SIST',
    notes: {
      comp: { n1: 70, n2: 85, n3: 65 },
      mat: { n1: 50, n2: 45, n3: 60 },
      ing: { n1: 90, n2: 80, n3: 95 },
      fis: { n1: 40, n2: 55, n3: 50 }
    },
    promedio: 65.40
  },
  {
    nombre: 'Gabriela',
    apellido: 'Mendoza',
    ci: '9182736-LP',
    opcion1: 'INF',
    notes: {
      comp: { n1: 95, n2: 90, n3: 100 },
      mat: { n1: 85, n2: 90, n3: 95 },
      ing: { n1: 95, n2: 90, n3: 90 },
      fis: { n1: 80, n2: 75, n3: 85 }
    },
    promedio: 89.60
  },
  {
    nombre: 'Humberto',
    apellido: 'Ortega',
    ci: '7483921-CB',
    opcion1: 'REDES',
    notes: {
      comp: { n1: 30, n2: 40, n3: 50 },
      mat: { n1: 20, n2: 30, n3: 40 },
      ing: { n1: 50, n2: 60, n3: 55 },
      fis: { n1: 30, n2: 45, n3: 40 }
    },
    promedio: 39.60
  }
]);
</script>
