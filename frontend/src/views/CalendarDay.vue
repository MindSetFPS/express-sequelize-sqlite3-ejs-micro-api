<template>
    <div>
        <h1>Ventas del dia {{ calendar.date }} </h1>
        <pedido-item 
            v-for="pedido in pedidos" 
            :key="pedido.id" 
            :pedidoId="pedido.id"
            :comida0="pedido.food[0].pedidoItems.quantity"
            :comida1="pedido.food[1].pedidoItems.quantity"
            :createdAt="pedido.createdAt"
            :customer="pedido.customer.name"
            :delivered="pedido.delivered"
            :paid="pedido.paid"            
            :location="pedido.location.name"
            :customerFilter="pedido.customer.name"
            :locationFilter="pedido.location.name"
        />

    </div>

</template>
<script>
import PedidoItem from '../components/PedidoItem.vue'

export default {
    name: 'CalendarDay',
    components: {
        PedidoItem
    },
    data(){
        return{
            id: this.$route.params.id,
            api: process.env.VUE_APP_API,
            pedidos: '',
            calendar: '',
        }
    },
    methods: {
        async getCalendar(){
            const cal = await fetch(this.api + '/calendar/api/' + this.id)
                .then(res => res.json())
                .catch(e => console.error(e))

            if(cal.ok){
                this.pedidos = cal.pedidos
                this.calendar = cal.calendar
            }
            console.log(cal)
        },
    },
    mounted(){
        this.getCalendar()
    }
}
</script>