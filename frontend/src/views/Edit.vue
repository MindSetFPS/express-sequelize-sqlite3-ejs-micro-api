<template>
    <div class="container">
        <h1 class="title">Editar</h1>

        <div class="comida" v-if="type == 'pedido'" >
            <h2>Esto es un {{ type }}</h2>
        </div>

        <div class="comida" v-if="type == 'food'" >
            <h2>Esto es un {{ type }}</h2>
        </div>

        <div class="comida" v-if="type == 'calendar'" >
            <h2>Esto es un {{ type }}</h2>
        </div>
        
        <div class="comida" v-if="type == 'account'" >
            <h2>Esto es un {{ type }}</h2>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Edit',
    data(){
        return{
            type: 'food'
        }
    }
}
</script>