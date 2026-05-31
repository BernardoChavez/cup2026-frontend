<template>
  <div class="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
    <!-- Sidebar on the left -->
    <Sidebar />

    <!-- Main Content on the right -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Navbar on the top -->
      <Navbar />

      <!-- Page Content Area -->
      <main class="flex-grow overflow-y-auto p-8 bg-slate-950/90">
        <router-view v-slot="{ Component }">
          <transition 
            name="fade" 
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
