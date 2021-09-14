<template>
    <nav class="lateral-nav" > 
        <router-link to="/" class="mt-4 mb-4" > 
            <span class="material-icons" >&#xe88a;</span>
            <p class="nav-link-text" > Inicio </p> 
        </router-link>
        <router-link to="/pedidos" > 
            <span class="material-icons">&#xef6e;</span>
            <p class="nav-link-text" >Pedidos</p>
        </router-link>

        <router-link to="/calendar/create-menu" >
            <span class="material-icons">&#xe561;</span>
            <p class="nav-link-text" > Crear un menu  </p>
        </router-link>


        <router-link to="/calendar/list" > 
            <span class="material-icons">&#xe8df;</span>
            <p class="nav-link-text" >Calendario</p>
        </router-link>

        <router-link to="/food" >
            <span class="material-icons">&#xea20;</span>
            <p class="nav-link-text" > Nuevo <br/> Platillo  </p>
        </router-link>

        <router-link to="/food/list" >
            <span class="material-icons">&#xe0ee;</span>
            <p class="nav-link-text" >Platillos </p>
        </router-link>

        <router-link to="/accounts">
            <span class="material-icons" >&#xe853;</span>
            <p class="nav-link-text" >Cuentas</p>
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