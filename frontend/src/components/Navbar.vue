<template>
    <nav 
    class="
        bg-blue-100 h-screen w-1/12 sticky text-center  flex flex-col items-center justify-evenly left-0  top-0 " > 
        <navbar-item v-for="item in pages" :key="item.name" :text="item.name" :icon="item.icon"  :to="item.link" class="mx-auto text-center" />
    </nav>
</template>
<script>
import NavbarItem from './NavbarItem.vue'


export default {
    name: 'Navbar',
    components: {
        NavbarItem,
    }, 
    data(){
        return{
            pages: [
                {name: 'Inicio',         icon: 'home', link: '/'},
                {name: 'Pedidos',        icon: 'clipboard-text-outline', link: '/pedidos'},
                {name: 'Crear Menu',     icon: 'calendar-edit', link: '/calendar/create-menu'},
                {name: 'Calendario',     icon: 'calendar', link: '/calendar/list'},
                {name: 'Crear Platillo', icon: 'text-box-plus-outline', link: '/food/create'},
                {name: 'Platillos',      icon: 'text-box-outline', link: '/food'},
                {name: 'Customers',      icon: 'account', link: '/customers'},
                
            ]
        }
    }
}
</script>

<style scoped>

</style>