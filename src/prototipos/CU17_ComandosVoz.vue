<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 17</span>
        <h2 class="text-2xl font-black text-white mt-1">Procesar Consultas por Comando de Voz</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Voice Command mic button & waveforms -->
      <div class="glass-panel rounded-2xl p-6 flex flex-col justify-between items-center text-center h-[350px]">
        <div>
          <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Reconocimiento por Voz (NLP)</span>
          <h3 class="text-base font-bold text-white mt-1">Haga clic y diga su consulta</h3>
        </div>

        <!-- Microphone Waveform simulator -->
        <div class="space-y-4 my-auto">
          <button type="button" disabled class="h-20 w-20 rounded-full bg-indigo-650 hover:bg-indigo-500 flex items-center justify-center text-white border-4 border-indigo-500/30 shadow-lg shadow-indigo-600/30 animate-pulse cursor-not-allowed">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          
          <!-- Animated sound waves (simulated with CSS/SVG) -->
          <div class="flex justify-center items-center gap-1 h-6">
            <span class="w-1 bg-indigo-500 rounded h-3 animate-pulse"></span>
            <span class="w-1 bg-indigo-550 rounded h-5 animate-pulse" style="animation-delay: 0.1s"></span>
            <span class="w-1 bg-indigo-400 rounded h-2 animate-pulse" style="animation-delay: 0.2s"></span>
            <span class="w-1 bg-indigo-500 rounded h-6 animate-pulse" style="animation-delay: 0.3s"></span>
            <span class="w-1 bg-indigo-600 rounded h-4 animate-pulse" style="animation-delay: 0.4s"></span>
            <span class="w-1 bg-indigo-450 rounded h-2 animate-pulse" style="animation-delay: 0.5s"></span>
          </div>
        </div>

        <div class="text-[10px] text-slate-500 font-medium">
          Estado: Transcribiendo comando de voz...
        </div>
      </div>

      <!-- Right: Transcript Output & Resolved Data mockup -->
      <div class="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
        <div>
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Resultado de la Consulta</h3>
          <!-- Transcript block -->
          <div class="p-3 bg-slate-950 border border-slate-850 rounded-xl font-mono text-xs text-slate-200">
            <span class="text-[9px] text-indigo-400 font-sans font-bold block mb-1">Transcripción de voz detectada:</span>
            "mostrar estudiantes aprobados de ingenieria informatica"
          </div>
        </div>

        <!-- Rendered results list mockup -->
        <div class="space-y-3">
          <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Postulantes Resolvidos (NLP Filtered)</span>
          <div class="space-y-2">
            <div class="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p class="font-bold text-white">Gabriela Mendoza</p>
                <p class="text-[9px] text-slate-500">C.I. 9182736-LP • Opción 1: Informática</p>
              </div>
              <div class="text-right">
                <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  APROBADO
                </span>
                <p class="text-[10px] text-slate-400 mt-1 font-bold">Promedio: 89.60</p>
              </div>
            </div>

            <div class="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
              <div>
                <p class="font-bold text-white">Mateo Salvatierra</p>
                <p class="text-[9px] text-slate-500">C.I. 7729183-SC • Opción 1: Informática</p>
              </div>
              <div class="text-right">
                <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  APROBADO
                </span>
                <p class="text-[10px] text-slate-400 mt-1 font-bold">Promedio: 78.20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
