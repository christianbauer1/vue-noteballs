import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import { getAdditionalUserInfo } from 'firebase/auth'

const routes = [
    {
        path: '/',
        name: 'notes',
        component: () => import('@/views/ViewNotes.vue'),
    },
    {
        path: '/stats',
        name: 'stats',
        component: () => import('@/views/ViewStats.vue'),
    },
    {
        path: '/editNote/:id',
        name: 'edit-note',
        component: () => import('@/views/ViewEditNote.vue'),
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/ViewAuth.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Navigation guards
router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()
    if (!storeAuth.user.id && to.name !== 'auth') {
        // wenn kein user eingeloggt, dann kann er keine andere route als auth betreten
        return { name: 'auth' }
    }
    if (storeAuth.user.id && to.name === 'auth') {
        // wenn user eingeloggt, dann kann er auth nicht mehr betreten. Mit false bleibt er einfach auf der aktuellen seite
        return false
    }
})

export default router