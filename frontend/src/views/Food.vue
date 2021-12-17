<template>
    <div>
        <page-title text="Estadisticas Platillo" />
        <div>
            <h1> {{ food.name }} </h1>
        </div>
        <div>
            Sold in the las 30 days: {{ soldLast30Days }}
        </div>
    </div>
</template>

<script>
import PageTitle from '../components/PageTitle.vue'

export default {
    name: 'Food',
    components: {
        PageTitle
    },
    data(){
        return{
            api: process.env.VUE_APP_API,
            food: '',
            soldLast30Days: 0,
        }
    },
    methods: {
        async getFoodDetails(){
            const res = await 
                fetch(this.api + '/food/api/' + this.$route.params.id)
                    .then(res => res.json())
                    .catch(error => console.error(error))

            if(res.ok){
                this.food = res.data,
                this.calculateSoldLast30Days(res.stats)
            }
            console.log(res)
        },
        calculateSoldLast30Days(stats){
            stats.map( s => {
                this.soldLast30Days = this.soldLast30Days + s.quantity
            })
        }
    },
    mounted(){
        this.getFoodDetails()
    }
}
</script>