<template>
    <div>
        <page-title :text="'Ventas del dia ' +  calendar.date " > </page-title>
        <div class="flex justify-evenly" >
            <div>
                Ventas: {{ sells }}
            </div>
            <div>
                {{ comida0Name }}: {{ sellsComida0 }}
            </div>
            <div>
                {{ comida1Name }}: {{ sellsComida1 }}
            </div>
            <div>
                Recolectado: ${{ collected }}
            </div>
            <div>
                Total: ${{ total }}
            </div>
        </div>
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
import PageTitle from '../components/PageTitle.vue'
import PedidoItem from '../components/PedidoItem.vue'

export default {
    name: 'CalendarDay',
    components: {
        PedidoItem,
        PageTitle
    },
    data(){
        return{
            id: this.$route.params.id,
            api: process.env.VUE_APP_API,
            pedidos: '',
            calendar: '',
            collected: 0,
            total: '',
            comida0Name: '',
            comida1Name: '',
            sellsComida0: 0,
            sellsComida1: 0,
            sells: 0,
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
                this.comida0Name = cal.calendar.Comida1.name
                this.comida1Name = cal.calendar.Comida2.name
            }
            console.log(cal)
            this.count()
        },
        count(){
            for( let pedido of this.pedidos){
                if(pedido.paid){
                    this.collected = this.collected + (pedido.food[0].pedidoItems.quantity * 50)
                    this.collected = this.collected + (pedido.food[1].pedidoItems.quantity * 50)
                } 
                this.sellsComida0 = this.sellsComida0 + pedido.food[0].pedidoItems.quantity
                this.sellsComida1 = this.sellsComida1 + pedido.food[1].pedidoItems.quantity
            }

            this.sells = this.sellsComida0 + this.sellsComida1
            this.total = (this.sellsComida0 + this.sellsComida1) * 50

        }
    },
    mounted(){
        this.getCalendar()
    }
}
</script>