<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 13</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Materias</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left side: Add new subject form mockup -->
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Registrar Materia</h3>
        <p class="text-xs text-slate-450 leading-relaxed">
          Incorpore materias al plan de estudios oficial de nivelación académica.
        </p>

        <form class="space-y-3 text-xs" @submit.prevent>
          <div>
            <label class="block text-slate-500 mb-1">Código de Materia</label>
            <input type="text" value="COMP" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          <div>
            <label class="block text-slate-500 mb-1">Nombre Oficial</label>
            <input type="text" value="Computación básica" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          <div>
            <label class="block text-slate-500 mb-1">Carga Horaria Semanal (Hrs)</label>
            <input type="number" value="12" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-350" />
          </div>
          
          <div class="pt-3 border-t border-slate-900 flex justify-end">
            <button type="button" disabled class="w-full py-2 bg-indigo-600 rounded-xl text-white font-bold cursor-not-allowed">Guardar Asignatura</button>
          </div>
        </form>
      </div>

      <!-- Right side: Subjects List Table mockup -->
      <div class="glass-panel rounded-2xl p-5 lg:col-span-2 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Plan de Asignaturas Habilitadas</h3>
        
        <div class="overflow-x-auto text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-slate-450 uppercase font-semibold">
                <th class="p-3">Código</th>
                <th class="p-3">Materia</th>
                <th class="p-3 text-center">Horas / Sem</th>
                <th class="p-3 text-center">Paralelos Habilitados</th>
                <th class="p-3 text-right">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60 text-slate-300">
              <tr v-for="m in list" :key="m.codigo" class="hover:bg-slate-900/10 transition-colors">
                <td class="p-3 font-mono font-bold text-indigo-400">{{ m.codigo }}</td>
                <td class="p-3 font-bold text-white">{{ m.nombre }}</td>
                <td class="p-3 text-center font-medium">{{ m.horas }} hrs</td>
                <td class="p-3 text-center font-bold text-slate-300">{{ m.paralelos }}</td>
                <td class="p-3 text-right">
                  <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    ACTIVA
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
  { codigo: 'COMP', nombre: 'Computación', horas: 12, paralelos: 1 },
  { codigo: 'MAT', nombre: 'Matemáticas', horas: 16, paralelos: 1 },
  { codigo: 'ING', nombre: 'Inglés', horas: 8, paralelos: 1 },
  { codigo: 'FIS', nombre: 'Física', horas: 12, paralelos: 1 }
]);
</script>
