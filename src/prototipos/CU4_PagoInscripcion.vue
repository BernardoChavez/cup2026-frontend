<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 4</span>
        <h2 class="text-2xl font-black text-white mt-1">Procesar Pago de Inscripción</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left: QR and Bank Details Card -->
      <div class="glass-panel rounded-2xl p-6 space-y-6">
        <div>
          <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Método de Pago Preferido</span>
          <h3 class="text-lg font-black text-white mt-1">Pago por QR / Transferencia</h3>
        </div>

        <!-- Fake QR Box -->
        <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
          <div class="bg-white p-2 rounded-xl">
            <!-- Simulated QR code using SVG lines -->
            <svg class="h-40 w-40 text-slate-950" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm1 1h2v2H5V5zm9-3h8v8h-8V2zm2 2v4h4V4h-4zm1 1h2v2h-2V5zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm1 1h2v2H5v-2zm12-3h3v1h-3v-1zm4 1h1v3h-2v-1h1v-2zm-2 3h1v2h-2v-2zm-1-1h1v1h-1v-1zm3 3h2v1h-2v-1zm-4-3h1v1h-1v-1zm-1 2h2v1h-2v-1zm1-3h1v1h-1v-1zm-5 4h1v1h-1v-1zm3-3h1v1h-1v-1zm-3-1h1v1h-1v-1zm-1 3h2v1h-2v-1zm-3-9h1v1H8V6zm1 2h1v1H9V8zm4-3h1v1h-1V5zm-2 2h1v1h-1V7zm1-5h1v1h-1V2zm-3 9h2v1h-2v-1zm6 12h1v-3h-1v3zm1-4h1v1h-1v-1z" />
            </svg>
          </div>
          <span class="text-[10px] text-indigo-400 font-bold tracking-wider">QR Válido por 10:00 min</span>
        </div>

        <!-- Bank info details -->
        <div class="space-y-2 text-xs border-t border-slate-800/80 pt-4">
          <div class="flex justify-between">
            <span class="text-slate-400">Banco Destinatario:</span>
            <span class="text-slate-200 font-medium">Banco Unión S.A.</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Número de Cuenta:</span>
            <span class="text-slate-200 font-mono">1-29837482</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Titular de Cuenta:</span>
            <span class="text-slate-200 font-medium">U.A.G.R.M. admisiones</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Monto arancel:</span>
            <span class="text-slate-200 font-bold text-indigo-400">Bs. 350.00</span>
          </div>
        </div>
      </div>

      <!-- Right: Voucher register form mockup -->
      <div class="glass-panel rounded-2xl p-6 md:col-span-2 space-y-6">
        <div>
          <h3 class="text-lg font-bold text-white uppercase tracking-wider mb-1">Registrar Comprobante</h3>
          <p class="text-xs text-slate-400">Reporte el número de depósito para procesar su matrícula.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Número de Transacción / Depósito</label>
            <input type="text" value="DEP-9981273" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Banco Emisor</label>
            <input type="text" value="Banco Mercantil Santa Cruz" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Monto Depositado (Bs.)</label>
            <input type="text" value="350.00" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300" />
          </div>
          <div>
            <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1">Fecha de Transacción</label>
            <input type="text" value="2026-06-13" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-300" />
          </div>
        </div>

        <!-- Voucher PDF/Image attachment card mockup -->
        <div>
          <label class="block text-[10px] text-slate-500 uppercase font-semibold mb-1.5">Archivo Adjunto de Comprobante</label>
          <div class="border-2 border-dashed border-slate-800 hover:border-indigo-500 rounded-2xl p-6 text-center bg-slate-950/20 cursor-not-allowed">
            <svg class="h-8 w-8 text-indigo-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span class="text-xs font-bold text-slate-300 block">comprobante_bancario_sc.pdf</span>
            <span class="text-[10px] text-slate-500 mt-1 block">Tamaño: 2.1 MB • Tipo: PDF</span>
          </div>
        </div>

        <div class="flex items-center gap-2 text-[10px] text-slate-500">
          <svg class="h-4.5 w-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>El pago se encuentra pendiente de conciliación bancaria manual por el área administrativa.</span>
        </div>

        <div class="flex justify-end gap-3 border-t border-slate-850 pt-4">
          <button type="button" disabled class="px-5 py-2.5 bg-indigo-650 rounded-xl text-white font-bold cursor-not-allowed">Enviar Comprobante</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
