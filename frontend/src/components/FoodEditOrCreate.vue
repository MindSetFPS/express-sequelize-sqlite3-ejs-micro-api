<template>
    <div class="container" >
        <h1 class="title" > {{ food ? 'Editar Platillo' : 'Nuevo Platillo' }} </h1>
        <form >
            <h2> Anadir un platillo al menu  </h2>
            <input class="mt-2" name="name" placeholder="Nombre (Obligatorio)" required v-model="name" />
            <input class="mt-2" name="description" placeholder="Descripcion (Opcional)" v-model="description" />
            <input class="mt-2" name="link" placeholder="Link (Opcional) " v-model="link" />

            <button class="mt-2 green" @click.prevent="postFood" > Crear platillo </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'FoodEditOrCreate',
    props: ['food'],
    data(){
        return{
            
        }
    }
    
}
</script>