<template>
    <div class="container" >
        <h1  class="title">Pedidos</h1>
        <QuerySettings />

    </div>
</template>

<style scoped>
    .container{
        padding: 2em;
    }
</style>

<script>
    import QuerySettings from "@/components/QuerySettings.vue";
    
    export default {
        name: 'Pedidos',
        components: {
            QuerySettings,
        },
    }
</script>