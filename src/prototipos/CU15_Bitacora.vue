<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 15</span>
        <h2 class="text-2xl font-black text-white mt-1">Registrar Bitácora</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Filter & Logs Interface mockup -->
    <div class="glass-panel rounded-2xl overflow-hidden space-y-4">
      <div class="px-6 py-4 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Bitácora Transaccional del Sistema (Logs)</h3>
        <span class="text-xs text-slate-400">Nivel de Seguridad: Alto (Inmutable)</span>
      </div>

      <div class="overflow-x-auto p-4 text-xs font-mono">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-900/10 text-slate-450 uppercase font-semibold">
              <th class="p-3">Timestamp</th>
              <th class="p-3">Usuario</th>
              <th class="p-3">Operación</th>
              <th class="p-3">Tabla Afectada</th>
              <th class="p-3">Detalle / Acción</th>
              <th class="p-3 text-right">Dirección IP</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-slate-350">
            <tr v-for="log in logs" :key="log.time" class="hover:bg-slate-900/10 transition-colors">
              <td class="p-3 text-[10px] text-slate-500 whitespace-nowrap">{{ log.time }}</td>
              <td class="p-3">
                <span class="font-bold text-slate-200 block">{{ log.user }}</span>
                <span class="text-[9px] text-indigo-400 font-sans font-bold capitalize">{{ log.role.toLowerCase() }}</span>
              </td>
              <td class="p-3">
                <span class="px-2 py-0.5 rounded text-[9px] font-bold border" :class="getOpStyles(log.op)">
                  {{ log.op }}
                </span>
              </td>
              <td class="p-3 text-slate-400 font-bold">{{ log.table }}</td>
              <td class="p-3 font-sans text-xs text-slate-300 leading-relaxed">{{ log.desc }}</td>
              <td class="p-3 text-right text-slate-500">{{ log.ip }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const logs = ref([
  { time: '2026-06-13 22:15:36', user: 'carlos.paz@cup.edu.bo', role: 'ADMIN', op: 'GENERAR_GRUPOS', table: 'grupos_nivelacion', desc: "Se generaron automáticamente 4 grupos para 182 estudiantes matriculados en CUP-I 2026.", ip: '192.168.1.102' },
  { time: '2026-06-13 21:48:12', user: 'carlos.paz@cup.edu.bo', role: 'ADMIN', op: 'CONCILIAR_PAGO', table: 'postulantes', desc: "Se concilió el pago para el postulante CI: 8327461-SC. Monto: 350.00 Bs.", ip: '192.168.1.102' },
  { time: '2026-06-13 18:32:04', user: 'alberto@cup.edu.bo', role: 'DOCENTE', op: 'REGISTRAR_CALIFICACIONES', table: 'calificaciones', desc: "Se registraron calificaciones para el postulante CI: 8327461-SC. Promedio: 65.40.", ip: '10.0.0.45' },
  { time: '2026-06-13 14:10:55', user: 'postulante.fv@gmail.com', role: 'POSTULANTE', op: 'REGISTRAR_PAGO', table: 'postulantes', desc: "El postulante CI: 8327461-SC registró el comprobante transacción DEP-9981273.", ip: '190.186.42.12' },
  { time: '2026-06-13 09:05:00', user: 'carlos.paz@cup.edu.bo', role: 'ADMIN', op: 'CREAR', table: 'usuarios', desc: "Se registró manualmente el postulante Fernando Vargas CI: 8327461-SC.", ip: '192.168.1.102' }
]);

function getOpStyles(op) {
  if (op.startsWith('CREAR')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  if (op.startsWith('CONCILIAR') || op.startsWith('REGISTRAR')) return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  if (op.startsWith('GENERAR')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  return 'bg-slate-800 text-slate-400 border-slate-700';
}
</script>
