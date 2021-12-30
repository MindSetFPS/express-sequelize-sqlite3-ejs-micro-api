<template>
    <div class=""> 
            <page-title text="Menu" />
            <h3 class="text-xl my-3 " >{{ hint }}</h3>
            <Dialog text="Crear nuevo platillo" >
                <food-create @new-food-added="getFood" />
            </Dialog>
            <div v-if="foodList.ok" >
                <div v-for="food in foodList.data" :key="food.id" class="bg-white p-2 my-2 flex justify-between rounded-md" >
                    <div>
                        <router-link :to="'/food/' + food.id" class="hover:underline" >  {{ food.name }}   </router-link>
                    </div>
                    <p> {{ food.description }} </p>
                    <div class="flex" >
                        <router-link :to="'/food/edit/' + food.id" class="rounded-md bg-blue-100 text-blue-500 p-2 mr-2 hover:underline " > Editar  </router-link>
                        <button class="rounded-md bg-red-100 p-2 text-red-500 hover:underline " @click="deleteFood(food.id)" >
                            Borrar
                        </button>
                    </div>
                </div>
            </div>
            <div v-else  >
                <food-create @new-food-added="getFood" />
            </div>
    </div>
</template>

<script>
import Dialog from '../components/Dialog.vue'
import FoodCreate from '../components/FoodCreate.vue'
import PageTitle from '../components/PageTitle.vue'

export default {
    name: 'FoodList',
    components: {
        Dialog,
        FoodCreate,
        PageTitle,
    },
    data(){
        return{
            error: '',
            link: '',
            foodList: '',
            hint: '',
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getFood(){
            const req = await fetch(this.api + '/food/api')
                .then(res => res.json())
                .catch(e => console.error(e))
            this.foodList = req
            console.log(this.foodList)
            if(this.foodList.ok == false) this.hint = 'Agrega al menos 2 platillos al menu.'
        },
        async deleteFood(id){
            await fetch(this.api + '/food/delete/' + id, {
                headers: {'Content-Type': 'application/json'},
                method: "DELETE"
            })
            .then(res => res.json())
            .catch(error => console.error(error))
            this.$router.push('/')
        }
    },
    mounted(){
        this.getFood()
    }
}
</script>

<style scoped >
    .container{
        min-width: 50vw;
    }
    
</style>