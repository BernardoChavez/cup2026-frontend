<template>
  <div class="space-y-6 max-w-4xl mx-auto">
    <!-- Breadcrumb & Info -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Caso de Uso 1</span>
        <h2 class="text-2xl font-black text-white mt-1">Gestionar Autenticación</h2>
      </div>
      <span class="text-xs text-slate-400">Prototipo de UI / Imagen para Documento</span>
    </div>

    <!-- Interface Wrapper -->
    <div class="glass-panel rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
      <!-- Left Side: App Branding & Mascot/Hero -->
      <div class="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-indigo-900/60 p-8 flex flex-col justify-between border-r border-slate-800/80">
        <div class="flex items-center gap-2">
          <svg class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span class="font-extrabold text-slate-100 tracking-widest text-sm uppercase">CUP Security Portal</span>
        </div>
        <div class="my-auto space-y-4 py-8">
          <h1 class="text-3xl font-black text-white tracking-tight leading-tight">Acceso Seguro de Admisiones</h1>
          <p class="text-slate-400 text-xs leading-relaxed">
            Plataforma académica protegida bajo protocolos criptográficos estandarizados de clave simétrica y asimétrica con MFA por token y roles específicos.
          </p>
          <div class="flex flex-wrap gap-2 pt-2">
            <span class="px-2 py-1 rounded bg-slate-950 text-[10px] text-slate-350 font-bold border border-slate-800">SHA-256 Hashing</span>
            <span class="px-2 py-1 rounded bg-slate-950 text-[10px] text-slate-350 font-bold border border-slate-800">RBAC Guarded</span>
            <span class="px-2 py-1 rounded bg-slate-950 text-[10px] text-slate-350 font-bold border border-slate-800">SSL / TLS 1.3</span>
          </div>
        </div>
        <div class="text-[10px] text-slate-500">
          U.A.G.R.M. © 2026 - Gestión de Admisión Estudiantil
        </div>
      </div>

      <!-- Right Side: Login form Mockup -->
      <div class="p-8 flex flex-col justify-center bg-slate-900/20">
        <div class="w-full max-w-sm mx-auto space-y-6">
          <div>
            <h3 class="text-xl font-bold text-slate-150">Iniciar Sesión</h3>
            <p class="text-slate-450 text-xs mt-1">Ingrese sus credenciales registradas para continuar.</p>
          </div>

          <!-- Input fields -->
          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1">Correo Electrónico</label>
              <input type="email" value="admin@cup.edu.bo" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1">Contraseña</label>
              <input type="password" value="••••••••••••" disabled class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

          <!-- Multi-Factor Verification Mock Dialog -->
          <div class="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Verificación MFA Requerida</span>
              <span class="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            </div>
            <p class="text-[10px] text-slate-400">Código de 6 dígitos enviado a su correo de recuperación.</p>
            <div class="flex gap-2 justify-center py-1.5">
              <input type="text" maxlength="1" value="7" disabled class="h-8 w-8 text-center bg-slate-950 border border-slate-850 text-white font-bold rounded" />
              <input type="text" maxlength="1" value="9" disabled class="h-8 w-8 text-center bg-slate-950 border border-slate-850 text-white font-bold rounded" />
              <input type="text" maxlength="1" value="2" disabled class="h-8 w-8 text-center bg-slate-950 border border-slate-850 text-white font-bold rounded" />
              <input type="text" maxlength="1" value="8" disabled class="h-8 w-8 text-center bg-slate-950 border border-slate-850 text-white font-bold rounded" />
              <input type="text" maxlength="1" value="•" disabled class="h-8 w-8 text-center bg-slate-950 border border-indigo-500 text-indigo-400 font-bold rounded" />
              <input type="text" maxlength="1" value="" disabled class="h-8 w-8 text-center bg-slate-950 border border-slate-850 text-white font-bold rounded" />
            </div>
          </div>

          <!-- Remember me & Recover -->
          <div class="flex items-center justify-between text-xs">
            <label class="flex items-center gap-2 text-slate-400">
              <input type="checkbox" checked disabled class="h-4 w-4 bg-slate-950 rounded border-slate-800 text-indigo-600 focus:ring-offset-slate-900" />
              Recordarme
            </label>
            <a href="#" class="text-indigo-400 font-semibold hover:underline">¿Olvidó su contraseña?</a>
          </div>

          <!-- Login Button -->
          <button type="button" disabled class="w-full py-2.5 bg-indigo-600 rounded-xl text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 cursor-not-allowed">
            Verificar y Entrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
