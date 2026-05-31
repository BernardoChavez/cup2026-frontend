<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 8</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Docentes y Asistencia</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left side: Docente qualifications registry -->
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Habilitación de Docentes</h3>
        <p class="text-xs text-slate-450 leading-relaxed">
          Verifique las credenciales mínimas de los docentes para su contratación e impartición en los paralelos de nivelación.
        </p>

        <div class="space-y-3 pt-2">
          <div v-for="t in teachers" :key="t.email" class="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl space-y-2 text-xs">
            <div class="flex justify-between items-center">
              <span class="font-bold text-white">{{ t.name }}</span>
              <span class="px-2 py-0.5 rounded text-[9px] font-bold" :class="t.contratado ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-500'">
                {{ t.contratado ? 'Contratado' : 'Pendiente' }}
              </span>
            </div>
            
            <div class="grid grid-cols-1 gap-1 pt-1.5 border-t border-slate-900 text-[10px] text-slate-400">
              <div class="flex justify-between">
                <span>Título Profesional Área:</span>
                <span class="font-bold" :class="t.titulo ? 'text-emerald-400' : 'text-rose-500'">{{ t.titulo ? 'SÍ' : 'NO' }}</span>
              </div>
              <div class="flex justify-between">
                <span>Grado de Maestría:</span>
                <span class="font-bold" :class="t.maestria ? 'text-emerald-400' : 'text-rose-500'">{{ t.maestria ? 'SÍ' : 'NO' }}</span>
              </div>
              <div class="flex justify-between">
                <span>Diplomado Edu. Sup.:</span>
                <span class="font-bold" :class="t.diplomado ? 'text-emerald-400' : 'text-rose-500'">{{ t.diplomado ? 'SÍ' : 'NO' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Daily Attendance Sheet Mockup -->
      <div class="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Parte de Asistencia Diaria</h3>
            <p class="text-[10px] text-slate-450 mt-0.5">Grupo: COMP - Paralelo A</p>
          </div>
          <div class="flex items-center gap-2">
            <input type="date" value="2026-06-13" disabled class="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 font-bold" />
          </div>
        </div>

        <div class="space-y-2">
          <div v-for="student in attendanceList" :key="student.ci" class="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
            <div>
              <p class="font-bold text-white">{{ student.nombre }} {{ student.apellido }}</p>
              <p class="text-[9px] text-slate-500">C.I. {{ student.ci }}</p>
            </div>
            <div class="flex gap-1">
              <button type="button" disabled class="px-2.5 py-1 rounded text-[10px] font-bold border" :class="student.estado === 'PRESENTE' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-850 text-slate-500'">
                PRESENTE
              </button>
              <button type="button" disabled class="px-2.5 py-1 rounded text-[10px] font-bold border" :class="student.estado === 'FALTA' ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-950 border-slate-850 text-slate-500'">
                FALTA
              </button>
              <button type="button" disabled class="px-2.5 py-1 rounded text-[10px] font-bold border" :class="student.estado === 'LICENCIA' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-950 border-slate-850 text-slate-500'">
                LICENCIA
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-3 border-t border-slate-850">
          <button type="button" disabled class="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold text-white cursor-not-allowed">
            Guardar Asistencia
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teachers = ref([
  { name: 'Ing. Alberto Gutiérrez', email: 'alberto@cup.edu.bo', titulo: true, maestria: true, diplomado: true, contratado: true },
  { name: 'Lic. Juan Pérez', email: 'juan@cup.edu.bo', titulo: true, maestria: false, diplomado: true, contratado: true },
  { name: 'Dra. María Castro', email: 'maria@cup.edu.bo', titulo: true, maestria: true, diplomado: true, contratado: false }
]);

const attendanceList = ref([
  { nombre: 'Fernando', apellido: 'Vargas', ci: '8327461-SC', estado: 'PRESENTE' },
  { nombre: 'Gabriela', apellido: 'Mendoza', ci: '9182736-LP', estado: 'PRESENTE' },
  { nombre: 'Humberto', apellido: 'Ortega', ci: '7483921-CB', estado: 'FALTA' }
]);
</script>
