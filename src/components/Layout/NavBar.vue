<template>
    <nav class="navbar is-success" aria-label="main navigation" role="navigation">
        <div class="container is-max-desktop">
            <div class="navbar-brand">
                <div class="navbar-item is-size-4 is-family-monospace">
                    Noteballs
                </div>

                <a ref="navbarBurgerRef" :class="{ 'is-active' : showMobileNav }"
                    @click.prevent="showMobileNav = !showMobileNav" class="navbar-burger" aria-expanded="false"
                    aria-label="menu" data-target="navbarBasicExample" role="button">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div :class="{ 'is-active' : showMobileNav }" id="navbarBasicExample" class="navbar-menu"
                ref="navbarMenuRef">
                <div class="navbar-start">
                    <button v-if="storeAuth.user.id" class="button is-small is-info mt-3 ml-3" @click="logout">Logout {{
                    storeAuth.user.email }}</button>
                </div>
                <div class="navbar-end">
                    <router-link @click="showMobileNav = false" class="navbar-item" to="/" active-class="is-active">
                        Notes
                    </router-link>
                    <router-link @click="showMobileNav = false" class="navbar-item" active-class="is-active"
                        to="/stats">
                        Stats
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useStoreAuth } from '@/stores/storeAuth'

const showMobileNav = ref(false)
const navbarMenuRef = ref(null)
const navbarBurgerRef = ref(null)
const storeAuth = useStoreAuth()

onClickOutside(
    navbarMenuRef, () => {
        showMobileNav.value = false
    },
    {
        ignore: [navbarBurgerRef]
    })

const logout = () => {
    storeAuth.logoutUser()
    showMobileNav.value = false
}
</script>

<style>
@media (max-width: 1023px) {
    .navbar-menu {
        position: absolute;
        left: 0;
        width: 100%;
    }
}
</style>