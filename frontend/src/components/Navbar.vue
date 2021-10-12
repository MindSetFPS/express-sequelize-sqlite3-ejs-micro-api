<template>
    <nav class="bg-blue-200 w-1/12 sticky  h-screen flex flex-col items-center justify-evenly left-0  top-0" > 
        <router-link to="/" class="" > 
            <span class="material-icons" >&#xe88a;</span>
            <p class="hidden" > Inicio </p> 
        </router-link>
        <router-link to="/pedidos" > 
            <span class="material-icons">&#xef6e;</span>
            <p class="hidden" >Pedidos</p>
        </router-link>

        <router-link to="/calendar/create-menu" >
            <span class="material-icons">&#xe561;</span>
            <p class="hidden" > Crear un menu  </p>
        </router-link>


        <router-link to="/calendar/list" > 
            <span class="material-icons">&#xe8df;</span>
            <p class="hidden" >Calendario</p>
        </router-link>

        <router-link to="/food" >
            <span class="material-icons block">&#xea20;</span>
            <p class="hidden" > Nuevo <br/> Platillo  </p>
        </router-link>

        <router-link to="/food/list" >
            <span class="material-icons">&#xe0ee;</span>
            <p class="hidden" >Platillos </p>
        </router-link>

        <router-link to="/accounts">
            <span class="material-icons" >&#xe853;</span>
            <p class="hidden" >Cuentas</p>
        </router-link>

    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
    .lateral-nav{
        position: fixed;
    }
</style>