<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 7</span>
        <h2 class="text-2xl font-black text-white mt-1">Organizar Grupos de Nivelación</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Actions Panel -->
    <div class="glass-panel rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2">
        <select disabled class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-350">
          <option>Filtrar por Materia: Todas</option>
        </select>
        <select disabled class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-350">
          <option>Gestión CUP-I 2026</option>
        </select>
      </div>

      <button type="button" disabled class="px-4 py-2.5 bg-indigo-650 rounded-xl text-xs font-bold text-white cursor-not-allowed">
        Generar Grupos Balanceados (Round-Robin)
      </button>
    </div>

    <!-- Grid of Groups cards mockup -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="g in groups" :key="g.name" class="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between hover:border-slate-700/60 transition-colors">
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                {{ g.subject }}
              </span>
              <h4 class="text-base font-bold text-white mt-1">{{ g.name }}</h4>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-slate-500">Estudiantes</span>
              <p class="text-sm font-bold text-white">{{ g.students }} / 70</p>
            </div>
          </div>

          <div class="space-y-2 text-xs pt-2 border-t border-slate-900">
            <div class="flex items-center gap-2 text-slate-400">
              <span class="text-indigo-400 font-bold">Horario:</span>
              <span>{{ g.schedule }}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400">
              <span class="text-indigo-400 font-bold">Aula:</span>
              <span>{{ g.classroom }}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400">
              <span class="text-indigo-400 font-bold">Docente:</span>
              <span class="truncate">{{ g.teacher }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-900 flex justify-end">
          <button type="button" disabled class="text-[10px] text-indigo-400 hover:underline cursor-not-allowed">
            Ver Listado de Estudiantes →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const groups = ref([
  { name: 'COMP - Paralelo A', subject: 'Computación', students: 62, schedule: '07:00 - 09:15', classroom: 'Aula 101 - FICCT', teacher: 'Ing. Alberto Gutiérrez' },
  { name: 'MAT - Paralelo A', subject: 'Matemáticas', students: 62, schedule: '09:15 - 11:30', classroom: 'Aula 102 - FICCT', teacher: 'Lic. Juan Pérez' },
  { name: 'FIS - Paralelo A', subject: 'Física', students: 58, schedule: '11:30 - 13:45', classroom: 'Aula 101 - FICCT', teacher: 'Dr. Hernán Silva' },
  { name: 'ING - Paralelo A', subject: 'Inglés', students: 60, schedule: '14:00 - 16:15', classroom: 'Aula 103 - FICCT', teacher: 'Lic. Claudia Melgar' }
]);
</script>
