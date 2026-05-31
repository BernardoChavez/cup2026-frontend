<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 6</span>
        <h2 class="text-2xl font-black text-white mt-1">Procesar Admisión Automática</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Configuration Panels -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-xs font-bold text-white uppercase tracking-wider">Configuración de Cierre</h3>
        <div class="space-y-3 text-xs">
          <div>
            <label class="block text-slate-450 mb-1">Ciclo de Admisión</label>
            <input type="text" value="CUP-I 2026" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-bold" />
          </div>
          <div>
            <label class="block text-slate-450 mb-1">Puntaje Mínimo de Aprobación</label>
            <input type="text" value="60.00 / 100" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-bold" />
          </div>
          <div class="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl text-[10px] text-slate-400 leading-relaxed">
            El sistema ordenará a los alumnos en orden descendente de promedio general y los asignará por cupo según su Opción 1. Si no hay vacantes, evaluará su Opción 2.
          </div>
        </div>
      </div>

      <!-- Trigger Algorithm -->
      <div class="glass-panel rounded-2xl p-6 md:col-span-2 flex flex-col justify-between">
        <div class="space-y-2">
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">Cierre Transaccional Automático</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Al presionar el botón, se procesará el promedio general de todos los postulantes habilitados, verificando la disponibilidad de plazas en carreras y generando las admisiones.
          </p>
        </div>

        <!-- Simulated Progress Bar -->
        <div class="space-y-2 py-4">
          <div class="flex justify-between text-[10px] font-mono text-slate-400">
            <span>Evaluando postulantes...</span>
            <span>100% Completado</span>
          </div>
          <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850">
            <div class="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full w-full rounded-full"></div>
          </div>
        </div>

        <div class="flex justify-between items-center gap-4">
          <div class="text-[10px] text-slate-500 flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Ejecutado por última vez: Hoy, 22:15
          </div>
          <button type="button" disabled class="px-5 py-2.5 bg-emerald-600 rounded-xl text-xs font-bold text-white shadow-lg cursor-not-allowed">
            Iniciar Cierre Automático
          </button>
        </div>
      </div>
    </div>

    <!-- Output logs mock -->
    <div class="glass-panel rounded-2xl p-5 space-y-3">
      <h3 class="text-xs font-bold text-white uppercase tracking-wider">Consola de Cierre de Admisiones</h3>
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-[10px] text-slate-350 space-y-1.5 leading-relaxed max-h-[220px] overflow-y-auto">
        <p class="text-indigo-400">[SISTEMA] Iniciando procesamiento de cierre de admisiones para ciclo CUP-I 2026...</p>
        <p class="text-slate-400">[DATOS] Se detectaron 182 postulantes matriculados con pagos conciliados.</p>
        <p class="text-slate-400">[DATOS] Promedios finales globales calculados y validados con éxito.</p>
        <p class="text-slate-400">[ALGORITMO] Evaluando alumnos con promedio mayor o igual a 60.00...</p>
        <p class="text-emerald-400">[ADMISIÓN] Postulante CI 9182736 asignado con éxito a opción 1: Ingeniería Informática (INF) - Cupo 1/5</p>
        <p class="text-emerald-400">[ADMISIÓN] Postulante CI 8327461 asignado con éxito a opción 1: Ingeniería de Sistemas (SIST) - Cupo 1/5</p>
        <p class="text-amber-400">[ADMISIÓN] Postulante CI 7291823 - Cupos agotados en Opción 1 (INF). Asignado con éxito a opción 2: Redes (REDES) - Cupo 1/3</p>
        <p class="text-rose-400">[REPROBACIÓN] Postulante CI 7483921 - Promedio insuficiente (39.60). Estado: REPROBADO.</p>
        <p class="text-indigo-400">[SISTEMA] Procesamiento finalizado. Total Admitidos: 104 | Total Reprobados: 78.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
