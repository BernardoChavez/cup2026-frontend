<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 2</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Cuentas y Privilegios (RBAC)</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left side: User Accounts List -->
      <div class="glass-panel rounded-2xl p-6 lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-white uppercase tracking-wider">Cuentas Habilitadas</h3>
          <span class="text-[10px] bg-slate-800 text-indigo-300 border border-slate-700 px-2.5 py-0.5 rounded-full font-bold">4 Usuarios Activos</span>
        </div>

        <div class="space-y-3">
          <div v-for="u in users" :key="u.email" class="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400">
                {{ u.nombre[0] }}{{ u.apellido[0] }}
              </div>
              <div>
                <p class="text-xs font-bold text-white">{{ u.nombre }} {{ u.apellido }}</p>
                <p class="text-[10px] text-slate-450 font-mono">{{ u.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span class="px-2 py-0.5 rounded text-[9px] font-bold border" :class="getRoleStyles(u.rol)">
                {{ u.rol }}
              </span>
              <span class="h-2 w-2 rounded-full" :class="u.activo ? 'bg-emerald-400' : 'bg-rose-400'"></span>
            </div>
          </div>
        </div>

        <button type="button" disabled class="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/25 text-xs font-bold rounded-xl cursor-not-allowed">
          + Crear Nueva Cuenta de Usuario
        </button>
      </div>

      <!-- Right side: Matriz de Privilegios -->
      <div class="glass-panel rounded-2xl p-6 space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Matriz de Privilegios</h3>
        <p class="text-[10px] text-slate-450 leading-relaxed">
          Definición del control de acceso basado en roles (RBAC) por módulos del sistema.
        </p>

        <div class="space-y-3 pt-2">
          <div v-for="module in privileges" :key="module.name" class="p-3 bg-slate-950/60 border border-slate-850 rounded-xl space-y-2.5">
            <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-wide block">{{ module.name }}</span>
            <div class="grid grid-cols-2 gap-2 text-[10px]">
              <div v-for="(val, role) in module.roles" :key="role" class="flex items-center justify-between p-1 bg-slate-900/40 rounded border border-slate-800">
                <span class="text-slate-400 capitalize">{{ role.toLowerCase() }}</span>
                <span :class="val ? 'text-emerald-400' : 'text-rose-500'">
                  {{ val ? '✔' : '✘' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { nombre: 'Carlos', apellido: 'Paz', email: 'admin@cup.edu.bo', rol: 'ADMIN', activo: true },
  { nombre: 'Mariana', apellido: 'Rojas', email: 'coordinador@cup.edu.bo', rol: 'COORDINADOR', activo: true },
  { nombre: 'Alberto', apellido: 'Gutiérrez', email: 'docente@cup.edu.bo', rol: 'DOCENTE', activo: true },
  { nombre: 'Fernando', apellido: 'Vargas', email: 'postulante.fv@gmail.com', rol: 'POSTULANTE', activo: true }
]);

const privileges = ref([
  {
    name: 'Carga Masiva (CSV)',
    roles: { ADMIN: true, COORDINADOR: false, DOCENTE: false, POSTULANTE: false }
  },
  {
    name: 'Gestión Estudiantes',
    roles: { ADMIN: true, COORDINADOR: true, DOCENTE: false, POSTULANTE: false }
  },
  {
    name: 'Calificaciones',
    roles: { ADMIN: true, COORDINADOR: true, DOCENTE: true, POSTULANTE: false }
  },
  {
    name: 'Bitácora / Auditoría',
    roles: { ADMIN: true, COORDINADOR: false, DOCENTE: false, POSTULANTE: false }
  }
]);

function getRoleStyles(rol) {
  switch (rol) {
    case 'ADMIN': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'COORDINADOR': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'DOCENTE': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}
</script>
