<template>
    <div class="" >
        <page-title text="Editar Platillo" />
        <form >
            <input-field inputType="text" name="name"        v-model="name"        placeholder="Nombre (Obligatorio)" required />
            <input-field inputType="text" name="description" v-model="description" placeholder="Descripcion (Opcional)" />
            <input-field inputType="text" name="link"        v-model="link"        placeholder="Link (Opcional)"/>

            <button class="p-2 bg-blue-300 rounded-lg hover:bg-blue-400 transition mt-4" @click.prevent="updateFood" > Guardar </button>
        </form>
    </div>
</template>

<script>
import PageTitle from './PageTitle.vue'
import InputField from './InputField.vue'

export default {
    name: 'FoodEditOrCreate',
    components: {
        InputField,
        PageTitle
    },
    data(){
        return{
            //codigo duplicado
            api: process.env.VUE_APP_API,
            id: this.$route.params.id,
            food: '',
            name: '',
            description: '',
            link: '',
        }
    },
    methods: {
        async getFood(){
            console.log(this.api + '/food/api/' + this.id)
            const f = await fetch(this.api + '/food/api/' + this.id).then(res => res.json())
            this.food = f.data
            this.name = this.food.name
            this.description = this.food.description
            this.link = this.food.link
            console.log(f)
        },
        async updateFood(){
            const u = await fetch(this.api + '/food/api/update/' + this.id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.name,
                    description: this.description,
                    link: this.link
                })               
            })
                .then(res => res.json())
                .catch(error => console.error(error))
            
            if (u.ok && u.updated) this.$router.push('/food')

        }
    },
    mounted(){
        this.getFood()
    }
    
}
</script>