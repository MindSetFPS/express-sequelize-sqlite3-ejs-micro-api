<template>
    <div class="" >
        <h1 class="" > {{ food ? 'Editar Platillo' : 'Nuevo Platillo' }} </h1>
        <form >
            <h2> Anadir un platillo al menu  </h2>
            <input class="" name="name" placeholder="Nombre (Obligatorio)" required v-model="name" />
            <input class="" name="description" placeholder="Descripcion (Opcional)" v-model="description" />
            <input class="" name="link" placeholder="Link (Opcional) " v-model="link" />

            <button class="" @click.prevent="postFood" > Crear platillo </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'FoodEditOrCreate',
    props: ['food'],
    data(){
        return{
            //codigo duplicado
        }
    }
    
}
</script>