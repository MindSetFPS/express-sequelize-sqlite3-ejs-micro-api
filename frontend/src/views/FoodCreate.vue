<template>
    <div class="" >
        <page-title text="Nuevo Platillo" />
        <form >
            <h2> Anadir un platillo al menu  </h2>

            <input-field  :inputType="text" name="name"         required v-model="name" placeholder="Nombre (Obligatorio)"  @input="showChanges" />
            <input-field  :inputType="text" name="description"  v-model="description"  placeholder="Descripcion (Opcional)"  @input="showChanges" />
            <input-field  :inputType="text" name="link"         v-model="link"  placeholder="Link (Opcional)"  @input="showChanges" />


            <button class="w-full bg-green-400 p-2 mt-2 text-white rounded-md" @click.prevent="postFood" > Crear platillo </button>
            <button class="w-full bg-green-600 p-2 mt-2 text-white rounded-md" @click.prevent="showChanges" > chow data </button>
            
        </form>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
import InputField from '../components/InputField.vue'

export default {
    name: 'FoodCreate',
    components: {
        PageTitle,
        InputField
    },
    data(){
        return{
            res: '',
            api: process.env.VUE_APP_API,
            name: '',
            description: '',
            link: '',
            ndea: ''
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
        },
        showChanges(){
            console.log(this.ndea)
        }
    },
}
</script>