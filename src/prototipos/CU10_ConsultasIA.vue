<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 10</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Reportes y Consultas IA</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Prompt Shortcuts & Templates -->
      <div class="glass-panel rounded-2xl p-5 space-y-4">
        <h3 class="text-xs font-bold text-white uppercase tracking-wider">Consultas Prediseñadas</h3>
        <p class="text-[10px] text-slate-450 leading-relaxed">
          Seleccione plantillas de prompt entrenadas para analizar el rendimiento del CUP 2026.
        </p>

        <div class="space-y-2 pt-2">
          <div v-for="p in prompts" :key="p.title" class="p-3 bg-slate-950/40 hover:bg-slate-900/40 border border-slate-800 rounded-xl cursor-pointer transition-colors space-y-1">
            <h4 class="text-xs font-bold text-slate-200">{{ p.title }}</h4>
            <p class="text-[10px] text-slate-500 leading-normal">{{ p.prompt }}</p>
          </div>
        </div>
      </div>

      <!-- Right: AI Chat Interface Mockup -->
      <div class="glass-panel rounded-2xl overflow-hidden lg:col-span-2 flex flex-col h-[480px]">
        <!-- AI header -->
        <div class="px-5 py-3 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="h-7 w-7 rounded-lg bg-indigo-650 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-600/15">
              AI
            </div>
            <div>
              <span class="text-xs font-bold text-white block">CUP-AI Academic Advisor</span>
              <span class="text-[9px] text-slate-500">Modelo: Gemini 1.5 Pro</span>
            </div>
          </div>
          <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
        </div>

        <!-- Chat Viewport -->
        <div class="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/30 text-xs">
          <!-- Message 1 (User) -->
          <div class="flex items-start gap-3 justify-end">
            <div class="bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]">
              ¿Cuál es la predicción de deserción del ciclo actual y qué alumnos están en riesgo por inasistencia?
            </div>
          </div>

          <!-- Message 2 (AI response) -->
          <div class="flex items-start gap-3">
            <div class="h-6 w-6 rounded-full bg-indigo-650 flex items-center justify-center font-bold text-[9px] text-white flex-shrink-0">AI</div>
            <div class="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none max-w-[85%] space-y-2.5 leading-relaxed text-slate-300">
              <p>Analizando la asistencia cruzada con el historial de parciales del ciclo <strong>CUP-I 2026</strong>...</p>
              <p>He identificado <strong>2 estudiantes</strong> con una probabilidad de deserción superior al <strong>70%</strong>:</p>
              
              <ul class="list-disc pl-4 space-y-1 text-[11px] text-slate-400">
                <li><strong>Humberto Ortega (C.I. 7483921):</strong> Inasistencia del 40% en Física y calificaciones insuficientes (promedio actual 39.60).</li>
                <li><strong>Estudiante CI 8921832:</strong> Inasistencia del 33% en Computación y promedio menor a 51.</li>
              </ul>
              
              <p class="text-[10px] text-indigo-400 font-semibold">Sugerencia: Notificar automáticamente al tutor académico o docente responsable del paralelo.</p>
            </div>
          </div>
        </div>

        <!-- Chat Input mockup -->
        <div class="p-3 bg-slate-900/40 border-t border-slate-800 flex items-center gap-2">
          <input type="text" disabled placeholder="Consulte al CUP-AI Advisor..." class="flex-1 bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-400 focus:outline-none" />
          <button type="button" disabled class="h-8 w-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white cursor-not-allowed">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const prompts = ref([
  { title: 'Predecir Deserción', prompt: 'Identificar alumnos con calificaciones bajas e inasistencias acumuladas en la gestión.' },
  { title: 'Análisis de Carrera', prompt: 'Estadísticas de ocupación de cupos y efectividad en la asignación por orden de mérito.' },
  { title: 'Generar Reporte de Rendimiento', prompt: 'Exportar informe de promedios consolidados por paralelo y materia.' }
]);
</script>
