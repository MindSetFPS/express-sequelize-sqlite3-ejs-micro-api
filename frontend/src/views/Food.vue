<template>
    <div class="container" >
        <h1 class="title" >Nuevo platillo</h1>
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
    name: 'Food',
    data(){
        return{
            res: '',
            api: process.env.VUE_APP_API,
            name: '',
            description: '',
            link: ''
        }
    },
    methods: {
        async postFood(){
            const res = await fetch( this.api + '/food/api/create', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    name: this.name,
                    description: this.description,
                    link: this.link
                })
            })
            .then(res => res.json())
            .catch(e => console.error(e))

            console.log(res)
            this.name = ''
            this.description = ''
            this.link = ''
        }
    },
}
</script>