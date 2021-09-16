<template>
    <div class="container" >
        <h1 class="title"> Crear Menu del Dia </h1>

        <form autocomplete="off">
            
            <label > Elige un platillo.  </label>
            <input type="text" name="comida1" placeholder="Nombre del platillo" v-model="comida0" autocomplete="off" list="menudata" />

            <label > Elige un platillo mas.</label>
            <input type="text" name="comida2" placeholder="Nombre del platillo" v-model="comida1" autocomplete="off" list="menudata"  />
        
            <label > En que fecha estara disponible este menu? </label>
            <input type="date" name="date" v-model="date"   />
            
            <button @click.prevent="postCalendar" class="button blue mt-4 title" >Crear Menu</button>
        </form>

        <div v-if="res.error" class="love secondary rounded p4 m4" >
            <h1>Hubo un error: {{ this.res.message }}</h1>
        </div>

        <datalist id="menudata" >
                <option v-for="food in foodList" :key="food.id" > {{ food.name }} </option>
        </datalist>
    </div>
</template>
<script>
export default {
    name: 'Calendar',
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
            this.foodList = foodList
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
        }

    },
    mounted(){
        this.getFood()

    }

}
</script>