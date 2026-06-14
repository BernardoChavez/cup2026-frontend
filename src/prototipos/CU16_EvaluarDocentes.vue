<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 16</span>
        <h2 class="text-2xl font-black text-white mt-1">Evaluar Perfil y Competencias Docentes</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Teacher selection & checklist -->
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Criterios de Evaluación</h3>
        <p class="text-xs text-slate-450 leading-relaxed">
          Pondere la idoneidad académica y técnica del postulante docente para el área preuniversitaria.
        </p>

        <form class="space-y-4 text-xs" @submit.prevent>
          <div>
            <label class="block text-slate-500 mb-1">Docente Postulante</label>
            <input type="text" value="Dra. María Castro" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-bold" />
          </div>

          <div class="space-y-3 pt-2 border-t border-slate-900">
            <!-- Criterion 1 -->
            <div class="flex items-start gap-2.5">
              <input type="checkbox" checked disabled class="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-indigo-650 mt-0.5" />
              <div>
                <span class="font-bold text-slate-200 block">Título en Provisión Nacional (Área Exacta)</span>
                <span class="text-[10px] text-slate-500">Acredita licenciatura afín a Computación o Matemáticas.</span>
              </div>
            </div>

            <!-- Criterion 2 -->
            <div class="flex items-start gap-2.5">
              <input type="checkbox" checked disabled class="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-indigo-650 mt-0.5" />
              <div>
                <span class="font-bold text-slate-200 block">Grado Académico de Maestría</span>
                <span class="text-[10px] text-slate-500">Acredita postgrados de especialización técnica.</span>
              </div>
            </div>

            <!-- Criterion 3 -->
            <div class="flex items-start gap-2.5">
              <input type="checkbox" checked disabled class="h-4.5 w-4.5 rounded border-slate-800 bg-slate-950 text-indigo-650 mt-0.5" />
              <div>
                <span class="font-bold text-slate-200 block">Diplomado en Educación Superior</span>
                <span class="text-[10px] text-slate-500">Indispensable para ejercicio de docencia universitaria.</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-900">
            <span class="text-[10px] text-slate-500 block mb-1">Determinación de Aptitud</span>
            <span class="w-full text-center py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold rounded-xl block">
              APTO PARA CONTRATACIÓN
            </span>
          </div>
        </form>
      </div>

      <!-- Right: Radar/Competencies Graph mockup -->
      <div class="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-6">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Puntaje y Ponderación de Competencias</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <!-- Mock SVG Radar Chart -->
          <div class="flex flex-col items-center justify-center space-y-2">
            <div class="relative h-44 w-44">
              <svg class="h-full w-full text-slate-800" viewBox="0 0 100 100">
                <!-- Background pentagon lines -->
                <polygon points="50,5 95,38 78,90 22,90 5,38" fill="none" stroke="currentColor" stroke-width="0.5" />
                <polygon points="50,15 85,40 72,80 28,80 15,40" fill="none" stroke="currentColor" stroke-width="0.5" />
                <polygon points="50,25 75,43 65,70 35,70 25,43" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2" />
                <polygon points="50,35 65,45 58,60 42,60 35,45" fill="none" stroke="currentColor" stroke-width="0.5" />
                
                <!-- Axis lines -->
                <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" stroke-width="0.5" />
                <line x1="50" y1="50" x2="95" y2="38" stroke="currentColor" stroke-width="0.5" />
                <line x1="50" y1="50" x2="78" y2="90" stroke="currentColor" stroke-width="0.5" />
                <line x1="50" y1="50" x2="22" y2="90" stroke="currentColor" stroke-width="0.5" />
                <line x1="50" y1="50" x2="5" y2="38" stroke="currentColor" stroke-width="0.5" />
                
                <!-- Competency score polygon (filled area) -->
                <polygon points="50,12 88,40 70,82 30,75 12,38" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" stroke-width="1.5" />
              </svg>
              <!-- Label tags on radar chart -->
              <span class="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-400">Pedagogía</span>
              <span class="absolute top-1/3 right-0 text-[8px] font-bold text-slate-400">Técnica</span>
              <span class="absolute bottom-1 right-8 text-[8px] font-bold text-slate-400">Investigación</span>
              <span class="absolute bottom-1 left-8 text-[8px] font-bold text-slate-400">Experiencia</span>
              <span class="absolute top-1/3 left-0 text-[8px] font-bold text-slate-400">Didáctica</span>
            </div>
            <span class="text-[10px] text-slate-500 font-medium">Evaluación de Competencias (Puntaje: 92/100)</span>
          </div>

          <!-- Bar details -->
          <div class="space-y-4 text-xs">
            <div class="space-y-1">
              <div class="flex justify-between font-medium">
                <span class="text-slate-300">Competencia Didáctica y de Aula</span>
                <span class="text-indigo-400 font-bold">95%</span>
              </div>
              <div class="w-full bg-slate-950 border border-slate-900 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-500 h-full w-[95%] rounded-full"></div>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between font-medium">
                <span class="text-slate-300">Dominio Técnico de Materia</span>
                <span class="text-indigo-400 font-bold">88%</span>
              </div>
              <div class="w-full bg-slate-950 border border-slate-900 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-500 h-full w-[88%] rounded-full"></div>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between font-medium">
                <span class="text-slate-300">Producción e Investigación Científica</span>
                <span class="text-indigo-400 font-bold">80%</span>
              </div>
              <div class="w-full bg-slate-950 border border-slate-900 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-500 h-full w-[80%] rounded-full"></div>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between font-medium">
                <span class="text-slate-300">Experiencia en Educación Superior</span>
                <span class="text-indigo-400 font-bold">90%</span>
              </div>
              <div class="w-full bg-slate-950 border border-slate-900 rounded-full h-1.5 overflow-hidden">
                <div class="bg-indigo-500 h-full w-[90%] rounded-full"></div>
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
