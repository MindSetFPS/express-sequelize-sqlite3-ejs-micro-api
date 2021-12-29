<template>
    <div class="container bg-white p-2 rounded-md shadow-xl " >
        <h1 class="text-3xl font-bold"> Crear Menu del Dia </h1>

        <form autocomplete="off">
            
            <input-field inputType="text" placeholder="Nombre del platillo" name="comida1"  v-model="comida0" autocomplete="on" list="menudata" />
            <input-field inputType="text" placeholder="Nombre del platillo" name="comida2"  v-model="comida1" autocomplete="on" list="menudata" />
        
            <label > En que fecha estara disponible este menu? </label>
            <input class="w-full p-1 rounded-md" type="date" name="date" v-model="date"/>

            <div class="mx-auto mt-2 text-center" >
                <button @click.prevent="postCalendar" class="rounded-md bg-pink-200 p-2  " >Crear Menu</button>
            </div>
        </form>

        <div v-if="res.error" class="" >
            <h1>Hubo un error: {{ this.res.message }}</h1>
        </div>

        <datalist id="menudata" >
                <option v-for="food in foodList" :key="food.id" > {{ food.name }} </option>
        </datalist>
    </div>
</template>
<script>
import InputField from '../components/InputField.vue'
import dayjs from 'dayjs'

export default {
    name: 'CalendarCreate',
    components: {
        InputField
    },
    data () {
        return{
            api: process.env.VUE_APP_API,
            foodList: '',
            comida0: '',
            comida1: '',
            date: '',
            something: '"/calendar/create-menu"',
            res: '',
            error: false,
        }
    },
    methods: {
        async getFood(){
            const foodList = await fetch( this.api + '/food/api' ).then(res => res.json()).catch(e => console.error(e))
            this.foodList = foodList.data
            console.log(foodList)
            console.log(this.api)
        },
        async postCalendar(){
            const res = await fetch( this.api + '/calendar/api/create', {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    comida1: this.comida0,
                    comida2: this.comida1,
                    date: this.date
                })
            })
            .then(res => res.json())
            .catch(e => console.error(e))
            
            this.res = res
            console.log(this.res)
            if(this.res.ok) this.$router.push('/')
        },
        getDate(){
            const d = dayjs().format("YYYY-MM-DD")
            this.date = d
            console.log(this.date)
        }

    },
    mounted(){
        this.getFood()
        this.getDate()
    }

}
</script>