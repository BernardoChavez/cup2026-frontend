<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    <!-- Navbar Shell -->
    <header class="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <div>
          <span class="font-extrabold text-lg text-slate-100 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent tracking-wider">CUP 2026 - Galería de Prototipos</span>
          <span class="ml-2 text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase">Ciclo 1 & 2</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <router-link to="/" class="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la App Real
        </router-link>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar Navigation -->
      <aside class="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16">
        <div class="p-4 border-b border-slate-800/80">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Casos de Uso a Documentar (17)</p>
        </div>
        <nav class="flex-1 overflow-y-auto p-3 space-y-1">
          <router-link
            v-for="cu in useCases"
            :key="cu.path"
            :to="`/prototipos/${cu.path}`"
            v-slot="{ navigate, isActive }"
            custom
          >
            <a
              @click="navigate"
              :class="[
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/90 to-violet-600/90 text-white font-medium shadow-md shadow-indigo-600/10'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200',
                'group flex items-start gap-3 p-3 text-xs rounded-xl transition-all duration-200 cursor-pointer border border-transparent',
                isActive ? 'border-indigo-500/30' : ''
              ]"
            >
              <span class="flex-shrink-0 inline-flex items-center justify-center h-5 w-10 text-[10px] font-black rounded bg-slate-950/60 text-indigo-400 border border-slate-800">
                {{ cu.id }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="font-bold truncate text-slate-100 group-hover:text-white">{{ cu.title }}</p>
                <p class="text-[10px] text-slate-450 truncate mt-0.5">{{ cu.desc }}</p>
              </div>
            </a>
          </router-link>
        </nav>
      </aside>

      <!-- Main Workspace Viewport -->
      <main class="flex-1 overflow-y-auto bg-slate-950 p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const useCases = ref([
  { id: 'CU1', path: 'cu1', title: 'Gestionar Autenticación', desc: 'Inicio de sesión, Roles y Privilegios', type: 'Seguridad' },
  { id: 'CU2', path: 'cu2', title: 'Cuentas y Privilegios', desc: 'Gestión de cuentas y matriz RBAC', type: 'Seguridad' },
  { id: 'CU3', path: 'cu3', title: 'Gestionar Postulantes', desc: 'Registro y perfil del postulante', type: 'Admisión' },
  { id: 'CU4', path: 'cu4', title: 'Pago de Inscripción', desc: 'Arancel, QR y Comprobante', type: 'Finanzas' },
  { id: 'CU5', path: 'cu5', title: 'Gestionar Calificaciones', desc: 'Planilla de notas de parciales', type: 'Académico' },
  { id: 'CU6', path: 'cu6', title: 'Admisión Automática', desc: 'Cierre de ciclo por mérito y cupo', type: 'Admisión' },
  { id: 'CU7', path: 'cu7', title: 'Grupos de Nivelación', desc: 'Paralelización automática de alumnos', type: 'Académico' },
  { id: 'CU8', path: 'cu8', title: 'Docentes y Asistencia', desc: 'Hojas de asistencia diaria por grupo', type: 'Académico' },
  { id: 'CU9', path: 'cu9', title: 'Dashboard Administrativo', desc: 'KPIs, estadísticas y estados globales', type: 'Administración' },
  { id: 'CU10', path: 'cu10', title: 'Consultas y Reportes IA', desc: 'Predicciones y consultas con LLM', type: 'Inteligencia' },
  { id: 'CU11', path: 'cu11', title: 'Carreras y Cupos', desc: 'Parámetros y límites de carreras', type: 'Parámetros' },
  { id: 'CU12', path: 'cu12', title: 'Gestión Académica', desc: 'Años, periodos y cierres de ciclos', type: 'Parámetros' },
  { id: 'CU13', path: 'cu13', title: 'Gestionar Materias', desc: 'Códigos y planes de estudio', type: 'Parámetros' },
  { id: 'CU14', path: 'cu14', title: 'Conciliación de Pagos', desc: 'Comprobación de depósitos vs banco', type: 'Finanzas' },
  { id: 'CU15', path: 'cu15', title: 'Registrar Bitácora', desc: 'Log transaccional y auditoría global', type: 'Administración' },
  { id: 'CU16', path: 'cu16', title: 'Evaluar Competencias Docentes', desc: 'Checklist de idoneidad y radar de perfil', type: 'Docentes' },
  { id: 'CU17', path: 'cu17', title: 'Consultas por Comando de Voz', desc: 'Transcripción y filtro por micrófono', type: 'Inteligencia' }
]);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
