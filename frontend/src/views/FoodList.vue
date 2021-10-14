<template>
    <div class=""> 
            <page-title text="Menu" />
            <div class=""  >
                <div class="bg-white p-2 my-2 flex justify-between rounded-md" v-for="food in foodList" :key="food.id" >
                    <div class="" >
                        <h1 class="">  {{ food.name }}   </h1>
                    </div>
                    <p> {{ food.description }} </p>
                    <a href="{ food.link }}" target="_blank" rel="noopener noreferrer" > {{ food.link  /*fix this*/ }} </a>
                    <div class="flex" >
                        <form method="GET" class="" >
                            <input type="submit" formaction="/food/edit/{food.id}}" class="rounded-md bg-blue-100 text-blue-500 p-2 mr-2" value="Editar">
                        </form>
                        <form method="GET" class="mx-1" >
                            <input type="submit" formaction="/food/delete/{food.id}}" class="rounded-md bg-red-100 p-2 text-red-500" value="Borrar">
                        </form>
                    </div>
                </div>

            </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'
export default {
    name: 'FoodList',
    components: {
        PageTitle

    },
    data(){
        return{
            foodList: '',
            api: process.env.VUE_APP_API
        }
    },
    methods: {
        async getFood(){
            const foodList = await fetch(this.api + '/food/api').then(res => res.json()).catch(e => console.error(e))
            this.foodList = foodList
            console.log(foodList)
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