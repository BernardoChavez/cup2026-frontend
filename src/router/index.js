import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../modules/auth/store/auth';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../modules/auth/views/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/',
    component: () => import('../components/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../modules/admin/views/DashboardView.vue')
      },
      {
        path: 'carga-masiva',
        name: 'carga-masiva',
        component: () => import('../modules/admin/views/CargaMasivaView.vue'),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'bitacora',
        name: 'bitacora',
        component: () => import('../modules/admin/views/BitacoraView.vue'),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'postulantes',
        name: 'postulantes',
        component: () => import('../modules/postulante/views/PostulantesListView.vue'),
        meta: { roles: ['ADMIN', 'COORDINADOR'] }
      },
      {
        path: 'perfil',
        name: 'perfil',
        component: () => import('../modules/postulante/views/PerfilView.vue'),
        meta: { roles: ['POSTULANTE', 'ADMIN', 'COORDINADOR'] }
      },
      {
        path: 'pago',
        name: 'pago',
        component: () => import('../modules/postulante/views/PagoView.vue'),
        meta: { roles: ['POSTULANTE', 'ADMIN'] }
      },
      {
        path: 'calificaciones',
        name: 'calificaciones',
        component: () => import('../modules/academico/views/CalificacionesView.vue'),
        meta: { roles: ['ADMIN', 'DOCENTE', 'COORDINADOR'] }
      },
      {
        path: 'grupos',
        name: 'grupos',
        component: () => import('../modules/academico/views/GruposView.vue'),
        meta: { roles: ['ADMIN', 'COORDINADOR'] }
      },
      {
        path: 'asistencias',
        name: 'asistencias',
        component: () => import('../modules/academico/views/AsistenciasView.vue'),
        meta: { roles: ['ADMIN', 'DOCENTE'] }
      }
    ]
  },
  {
    path: '/prototipos',
    component: () => import('../prototipos/Index.vue'),
    children: [
      { path: '', redirect: '/prototipos/cu1' },
      { path: 'cu1', name: 'proto-cu1', component: () => import('../prototipos/CU1_Autenticacion.vue') },
      { path: 'cu2', name: 'proto-cu2', component: () => import('../prototipos/CU2_CuentasPrivilegios.vue') },
      { path: 'cu3', name: 'proto-cu3', component: () => import('../prototipos/CU3_Postulantes.vue') },
      { path: 'cu4', name: 'proto-cu4', component: () => import('../prototipos/CU4_PagoInscripcion.vue') },
      { path: 'cu5', name: 'proto-cu5', component: () => import('../prototipos/CU5_Calificaciones.vue') },
      { path: 'cu6', name: 'proto-cu6', component: () => import('../prototipos/CU6_AdmisionAutomatica.vue') },
      { path: 'cu7', name: 'proto-cu7', component: () => import('../prototipos/CU7_GruposNivelacion.vue') },
      { path: 'cu8', name: 'proto-cu8', component: () => import('../prototipos/CU8_DocentesAsistencia.vue') },
      { path: 'cu9', name: 'proto-cu9', component: () => import('../prototipos/CU9_DashboardAdministrativo.vue') },
      { path: 'cu10', name: 'proto-cu10', component: () => import('../prototipos/CU10_ConsultasIA.vue') },
      { path: 'cu11', name: 'proto-cu11', component: () => import('../prototipos/CU11_CarrerasCupos.vue') },
      { path: 'cu12', name: 'proto-cu12', component: () => import('../prototipos/CU12_GestionAcademica.vue') },
      { path: 'cu13', name: 'proto-cu13', component: () => import('../prototipos/CU13_Materias.vue') },
      { path: 'cu14', name: 'proto-cu14', component: () => import('../prototipos/CU14_ConciliarPagos.vue') },
      { path: 'cu15', name: 'proto-cu15', component: () => import('../prototipos/CU15_Bitacora.vue') }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'dashboard' });
  } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    next({ name: 'dashboard' }); // Redirect unauthorized to home dashboard
  } else {
    next();
  }
});

export default router;
